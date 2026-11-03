#!/usr/bin/env bash
# Website maintenance and safe publishing. Run ./manage.sh help for usage.
set -uo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd -P)"
cd "$ROOT" || exit 1

if [ -t 1 ]; then B=$'\033[1m'; R=$'\033[31m'; G=$'\033[32m'; Y=$'\033[33m'; N=$'\033[0m'; else B=""; R=""; G=""; Y=""; N=""; fi
info() { echo "${B}$*${N}"; }
ok()   { echo "${G}✔ $*${N}"; }
warn() { echo "${Y}! $*${N}"; }
die()  { echo "${R}✖ $*${N}" >&2; exit 1; }

need_node() { command -v node >/dev/null 2>&1 && command -v npm >/dev/null 2>&1 || die "Node.js and npm are required."; }

cmd_help() {
  cat <<'EOF'
Usage: ./manage.sh <command> [args]

  index              Rebuild data/generated-guidelines.js and sitemap.xml from every article
  validate           Check the index and sitemap are valid and up to date (non-zero on failure)
  audit              Read-only quality audit of articles and pages (non-zero on errors)
  count              Number of HTML articles in books/, disorders/, cpg/
  status             Branch, sync state, uncommitted changes, last commit, counts
  publish "message"  Index, validate, audit, scan for secrets, then commit and push to main
                     (asks for confirmation; never force-pushes)
  help               Show this help

Examples:
  ./manage.sh index
  ./manage.sh audit
  ./manage.sh publish "Add lithium monitoring card"
EOF
}

cmd_count() { need_node; info "Article counts"; node scripts/generate-index.js --count; }

cmd_index() {
  need_node
  info "Rebuilding article index and sitemap..."
  npm run --silent build || die "Index generation failed."
  ok "Index and sitemap regenerated"
  cmd_count
}

cmd_validate() {
  need_node
  info "Validating index..."
  npm run --silent validate || die "Validation failed. Run ./manage.sh index, then validate again."
  ok "Validation passed"
}

cmd_audit() { need_node; node scripts/audit.js; }

cmd_status() {
  git rev-parse --is-inside-work-tree >/dev/null 2>&1 || die "Not a git repository."
  local branch; branch="$(git rev-parse --abbrev-ref HEAD)"
  info "Branch: $branch"
  if git fetch --quiet origin 2>/dev/null; then
    if git rev-parse --verify --quiet "origin/$branch" >/dev/null; then
      read -r ahead behind < <(git rev-list --left-right --count "HEAD...origin/$branch")
      if   [ "$ahead" -eq 0 ] && [ "$behind" -eq 0 ]; then ok "In sync with origin/$branch"
      elif [ "$behind" -eq 0 ]; then warn "Ahead of origin/$branch by $ahead commit(s) (not pushed)"
      elif [ "$ahead" -eq 0 ]; then warn "Behind origin/$branch by $behind commit(s) (pull needed)"
      else warn "Diverged: $ahead ahead, $behind behind origin/$branch"; fi
    else warn "No origin/$branch to compare with"; fi
  else warn "Could not reach origin; sync status unknown"; fi
  echo
  info "Uncommitted changes:"
  if [ -n "$(git status --porcelain)" ]; then git status --short; else echo "  none"; fi
  echo
  info "Last commit:"
  git log -1 --format='  %h  %s  (%cr)'
  echo
  cmd_count
}

# ---- publish ----------------------------------------------------------------

# Paths never staged automatically
EXCLUDES=(
  ':(exclude,glob)**/.env' ':(exclude,glob)**/.env.*' ':(exclude,glob)**/*.pem' ':(exclude,glob)**/*.key'
  ':(exclude,glob)**/*.p12' ':(exclude,glob)**/*.pfx' ':(exclude,glob)**/id_rsa*' ':(exclude,glob)**/id_ed25519*'
  ':(exclude,glob)**/*credentials*' ':(exclude,glob)**/secret' ':(exclude,glob)**/secret.*' ':(exclude,glob)**/secrets'
  ':(exclude,glob)**/secrets.*' ':(exclude,glob)**/*.secret' ':(exclude,glob)**/*-secret.*' ':(exclude,glob)**/*_secret.*'
  ':(exclude,glob)**/node_modules/**'
  ':(exclude,glob)**/.DS_Store' ':(exclude,glob)**/*.log' ':(exclude,glob)**/*.tmp' ':(exclude,glob)**/*.bak'
  ':(exclude,glob)**/*.swp' ':(exclude,glob)**/*~'
)
SENSITIVE_NAME='(^|/)(\.env(\..*)?|id_rsa.*|id_ed25519.*|.*\.(pem|key|p12|pfx)|.*credentials.*|secrets?(\..*)?|.*\.secret|.*[-_]secret\..*)$'
SECRET_CONTENT='(-----BEGIN [A-Z ]*PRIVATE KEY-----|AKIA[0-9A-Z]{16}|gh[pousr]_[A-Za-z0-9]{30,}|github_pat_[A-Za-z0-9_]{30,}|xox[baprs]-[A-Za-z0-9-]{10,}|AIza[0-9A-Za-z_-]{35}|sk-[A-Za-z0-9]{32,}|(api[_-]?key|secret|passwd|password|token)["'"'"' ]*[:=]["'"'"' ]*[A-Za-z0-9/+_-]{16,})'

scan_secrets_in_diff() { # $1 = diff args (e.g. --cached)
  git diff "$@" -U0 --no-color | grep -E '^\+' | grep -Ev '^\+\+\+ ' | grep -Eiq "$SECRET_CONTENT"
}

cmd_publish() {
  local msg="${1:-}"
  [ -n "$msg" ] || die 'A commit message is required: ./manage.sh publish "My commit message"'
  need_node

  [ "$(git rev-parse --show-toplevel 2>/dev/null)" = "$ROOT" ] || die "manage.sh must live at the git repository root."
  local branch; branch="$(git rev-parse --abbrev-ref HEAD)"
  [ "$branch" = "main" ] || die "Current branch is '$branch'. Publishing is only allowed from main."

  info "Fetching origin..."
  git fetch --quiet origin main || die "Could not fetch origin/main. Check your network or credentials."
  local ahead behind
  read -r ahead behind < <(git rev-list --left-right --count HEAD...origin/main)
  if [ "$behind" -gt 0 ]; then
    cat >&2 <<EOF
${R}✖ Local main is behind origin/main by $behind commit(s).${N}
Nothing was changed. To synchronise safely:
  1. git status                      (make sure you understand your local changes)
  2. git stash push -u -m "wip"      (only if you have uncommitted work)
  3. git pull --rebase origin main   (resolve any conflicts yourself)
  4. git stash pop                   (if you stashed)
  5. ./manage.sh publish "message"
EOF
    exit 1
  fi
  ok "main is not behind origin/main (ahead by $ahead)"

  if git diff --cached --name-only | grep -Eq "$SENSITIVE_NAME"; then
    die "A sensitive-looking file is already staged. Unstage it (git restore --staged <file>) and retry."
  fi

  info "Rebuilding index..."
  npm run --silent build || die "Index generation failed. Nothing was committed."
  info "Validating index..."
  npm run --silent validate || die "Index validation failed. Nothing was committed."
  info "Running audit..."
  local audit_out audit_rc
  audit_out="$(node scripts/audit.js)"; audit_rc=$?
  printf '%s\n' "$audit_out" | sed -n '3,5p'
  if [ "$audit_rc" -ne 0 ]; then
    printf '%s\n' "$audit_out" | awk '/^  [^ ]/{f=$1} /ERROR/{print "  " f ": " substr($0, index($0,$2))}' | head -40
    die "Audit reported errors. Run ./manage.sh audit, fix them, and retry."
  fi
  ok "Audit has no errors"

  info "Scanning for secrets..."
  local f flagged=0
  while IFS= read -r -d '' f; do
    if printf '%s\n' "$f" | grep -Eq "$SENSITIVE_NAME"; then
      [ "$flagged" -eq 0 ] && warn "Sensitive-looking files found; they will NOT be staged:"
      flagged=1; echo "  $f"; continue
    fi
    if git ls-files --error-unmatch -- "$f" >/dev/null 2>&1; then continue; fi
    if [ -f "$f" ] && [ "$(wc -c < "$f")" -lt 2000000 ] && grep -Eiq "$SECRET_CONTENT" -- "$f" 2>/dev/null; then
      die "Possible secret found in untracked file: $f"
    fi
  done < <(git ls-files -z -m -o --exclude-standard; git diff -z --cached --name-only)
  if git log origin/main..HEAD -p -U0 --no-color --format= | grep -E '^\+' | grep -Ev '^\+\+\+ ' | grep -Eiq "$SECRET_CONTENT"; then
    die "Possible secret found in a local commit that is not yet pushed. Rewrite that commit yourself before publishing."
  fi
  if scan_secrets_in_diff origin/main; then
    die "Possible secret/credential found in tracked changes. Review 'git diff origin/main', remove it, and retry."
  fi
  ok "No secrets detected"

  info "Staging website changes (additions, modifications, deletions, renames)..."
  git add -A -- . "${EXCLUDES[@]}" || die "git add failed."
  if scan_secrets_in_diff --cached origin/main; then
    git restore --staged . 2>/dev/null || git reset -q
    die "Possible secret found in staged changes. Everything was unstaged; nothing committed."
  fi

  if git diff --cached --quiet; then
    if [ "$ahead" -gt 0 ]; then
      warn "No new changes to commit, but $ahead local commit(s) are not pushed."
    else
      ok "Nothing to publish; working tree matches origin/main."
      exit 0
    fi
  else
    echo; info "Staged changes:"; git status --short | grep -E '^[MADRC]' || true
    echo; info "Diff summary:"; git diff --cached --stat -M
  fi

  echo
  printf '%s' "Commit and push to origin/main? Type 'yes' to continue: "
  local reply=""; read -r reply || true
  if [ "$reply" != "yes" ]; then
    warn "Cancelled. Changes remain staged; nothing was committed or pushed."
    echo "  Undo staging with: git restore --staged ."
    exit 1
  fi

  if ! git diff --cached --quiet; then
    git commit -m "$msg" || die "Commit failed."
  fi
  local hash; hash="$(git rev-parse --short HEAD)"
  info "Pushing to origin main..."
  if git push origin main; then
    ok "Pushed commit $hash to origin/main"
    echo "GitHub Pages will now rebuild/deploy. Check the Actions tab for the result."
  else
    cat >&2 <<EOF
${R}✖ Push failed.${N} Your commit ($hash) is safe locally.
If GitHub has newer commits, synchronise safely (no force push):
  git fetch origin
  git pull --rebase origin main     (resolve conflicts yourself if prompted)
  ./manage.sh publish "message"     (or: git push origin main)
EOF
    exit 1
  fi
}

case "${1:-help}" in
  index)    cmd_index ;;
  validate) cmd_validate ;;
  audit)    cmd_audit ;;
  count)    cmd_count ;;
  status)   cmd_status ;;
  publish)  shift; cmd_publish "${1:-}" ;;
  help|-h|--help) cmd_help ;;
  *) echo "Unknown command: $1" >&2; echo; cmd_help; exit 2 ;;
esac
