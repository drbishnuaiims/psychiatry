#!/usr/bin/env node
/*
  Static website audit (read-only; never modifies any file).
    node scripts/audit.js            -> human-readable report, exit 1 if there are errors
  Warnings never change the exit status.
*/
"use strict";
const fs = require("fs");
const path = require("path");
const vm = require("vm");
const { ROOT, SECTIONS, walk } = require("./generate-index.js");

const issues = []; // { level, file, msg }
const add = (level, file, msg) => issues.push({ level, file, msg });
const rel = (f) => path.relative(ROOT, f).split(path.sep).join("/");

// Same file set the index generator uses, plus the top-level pages
const articles = [];
for (const s of SECTIONS) walk(path.join(ROOT, s), articles);
const pages = ["index.html", "profile.html"].map((f) => path.join(ROOT, f)).filter((f) => fs.existsSync(f));
const targets = [...articles, ...pages];
const articleSet = new Set(articles.map(rel));

const strip = (h) => h.replace(/<!--[\s\S]*?-->/g, " ").replace(/<(script|style|noscript|template)\b[\s\S]*?<\/\1>/gi, " ");
const textOf = (h) => h.replace(/<[^>]*>/g, " ").replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim();
const attr = (tag, name) => {
  const m = tag.match(new RegExp("\\b" + name + "\\s*=\\s*(?:\"([^\"]*)\"|'([^']*)'|([^\\s>]+))", "i"));
  return m ? (m[1] !== undefined ? m[1] : m[2] !== undefined ? m[2] : m[3]) : null;
};

const SKIP = /^(#|mailto:|tel:|sms:|javascript:|data:|blob:|about:|[a-z][a-z0-9+.-]*:|\/\/)/i;

function resolveLocal(fromFile, ref) {
  let p = ref.split("#")[0].split("?")[0];
  try { p = decodeURIComponent(p); } catch (e) { /* keep raw */ }
  const abs = p.startsWith("/") ? path.join(ROOT, p) : path.resolve(path.dirname(fromFile), p);
  if (path.relative(ROOT, abs).startsWith("..")) return null;
  return abs;
}
// GitHub Pages is case-sensitive; macOS usually is not, so verify the exact spelling of each path segment
function existsExact(abs) {
  if (!fs.existsSync(abs)) return false;
  const parts = path.relative(ROOT, abs).split(path.sep).filter(Boolean);
  let dir = ROOT;
  for (const part of parts) {
    let names;
    try { names = fs.readdirSync(dir); } catch (e) { return false; }
    if (!names.includes(part.normalize("NFC")) && !names.includes(part) && !names.some((n) => n.normalize("NFC") === part.normalize("NFC"))) return false;
    dir = path.join(dir, part);
  }
  return true;
}
function exists(abs) {
  if (!existsExact(abs)) return false;
  if (fs.statSync(abs).isDirectory()) return fs.existsSync(path.join(abs, "index.html"));
  return true;
}

const canonicals = new Map();
const noMeta = new Set();

for (const file of targets) {
  const f = rel(file);
  const raw = fs.readFileSync(file, "utf8");
  const html = strip(raw);

  const title = (html.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || [])[1];
  if (!title || !textOf(title)) add("error", f, "Missing or empty <title>");
  if (!/<h1\b/i.test(html)) add("warning", f, "No <h1> heading");

  const metas = html.match(/<meta\b[^>]*>/gi) || [];
  const meta = (n) => {
    for (const t of metas) if ((attr(t, "name") || attr(t, "property") || "").toLowerCase() === n) return (attr(t, "content") || "").trim();
    return null;
  };
  if (!meta("description")) add("warning", f, "Missing meta description");
  if (articleSet.has(f)) {
    if (!meta("keywords") && !meta("author")) noMeta.add(f);
    const body = (html.match(/<body[^>]*>([\s\S]*)<\/body>/i) || [null, html])[1];
    if (textOf(body).length < 100) add("error", f, "Article has little or no visible content");
  }

  const canon = (html.match(/<link\b[^>]*rel\s*=\s*["']?canonical["']?[^>]*>/i) || [])[0];
  if (canon) {
    const c = (attr(canon, "href") || "").trim();
    if (!c) add("error", f, "Empty canonical URL");
    else if (canonicals.has(c)) add("error", f, `Duplicate canonical URL (also used by ${canonicals.get(c)}): ${c}`);
    else canonicals.set(c, f);
  }

  const check = (tagName, attrName, kind) => {
    const re = new RegExp("<" + tagName + "\\b[^>]*>", "gi");
    for (const tag of html.match(re) || []) {
      if (tagName === "link" && !/rel\s*=\s*["']?(stylesheet|icon|shortcut icon|apple-touch-icon|manifest)/i.test(tag)) continue;
      const v = attr(tag, attrName);
      if (v === null) continue;
      if (!v.trim()) { add("error", f, `Empty ${attrName} on <${tagName}>`); continue; }
      const ref = v.trim();
      if (SKIP.test(ref) || /\{\{|\$\{|<%/.test(ref)) continue;
      const abs = resolveLocal(file, ref);
      if (!abs) { add("warning", f, `${kind} points outside the site: ${ref}`); continue; }
      if (ref.startsWith("/")) add("warning", f, `Root-absolute ${kind} will break under /psychiatry/: ${ref}`);
      if (!exists(abs)) add("error", f, `Broken ${kind}: ${ref}`);
    }
  };
  check("a", "href", "internal link");
  check("link", "href", "stylesheet/icon reference");
  check("img", "src", "image reference");
  check("source", "src", "media reference");
  for (const tag of html.match(/<img\b[^>]*>/gi) || []) {
    if (attr(tag, "alt") === null) add("warning", f, `<img> without alt attribute: ${(attr(tag, "src") || "").slice(0, 60)}`);
  }
  // strip() removes <script> blocks, so script src is checked on the comment-free raw source
  const noComments = raw.replace(/<!--[\s\S]*?-->/g, " ");
  for (const tag of noComments.match(/<script\b[^>]*\bsrc\b[^>]*>/gi) || []) {
    const v = attr(tag, "src");
    if (v === null) continue;
    if (!v.trim()) { add("error", f, "Empty src on <script>"); continue; }
    const ref = v.trim();
    if (SKIP.test(ref)) continue;
    const abs = resolveLocal(file, ref);
    if (abs && !exists(abs)) add("error", f, `Broken script reference: ${ref}`);
  }
}

// Registry checks: manual and generated records must point at existing, unique files
function loadRegistry(file, expr) {
  try {
    const ctx = { window: {} };
    vm.createContext(ctx);
    return vm.runInContext(fs.readFileSync(path.join(ROOT, file), "utf8") + ";" + expr, ctx, { timeout: 2000 }) || [];
  } catch (e) {
    add("error", file, "Could not load registry: " + e.message);
    return [];
  }
}
const norm = (u) => String(u || "").trim().replace(/^(\.\/|\/)+/, "").split(/[?#]/)[0].toLowerCase();
for (const [file, expr] of [["data/guidelines.js", "GUIDELINES"], ["data/generated-guidelines.js", "window.GENERATED_GUIDELINES"]]) {
  const seen = new Set();
  for (const g of loadRegistry(file, expr)) {
    const u = norm(g.url);
    if (!u) { add("error", file, `Record without url: ${g.title || "(untitled)"}`); continue; }
    if (seen.has(u)) add("error", file, `Duplicate article URL: ${g.url}`);
    seen.add(u);
    if (!existsExact(path.join(ROOT, g.url))) add("error", file, `Invalid article reference (file missing): ${g.url}`);
    if (!g.title) add("error", file, `Missing title for ${g.url}`);
    else if (file === "data/guidelines.js" && !g.description) add("warning", file, `Missing description for ${g.url}`);
  }
  if (file === "data/guidelines.js") {
    for (const a of articleSet) if (!seen.has(a.toLowerCase())) {
      add("warning", a, "No manual record in data/guidelines.js (auto-generated card is used)");
      if (noMeta.has(a)) add("warning", a, "No keywords/author metadata and no manual record (card uses folder-based fallbacks)");
    }
  }
}

const errors = issues.filter((i) => i.level === "error");
const warnings = issues.filter((i) => i.level === "warning");
const byFile = new Map();
for (const i of issues) {
  if (!byFile.has(i.file)) byFile.set(i.file, []);
  byFile.get(i.file).push(i);
}

console.log("Website audit");
console.log("=============");
console.log(`Files checked : ${targets.length} (${articles.length} articles + ${pages.length} pages)`);
console.log(`Errors        : ${errors.length}`);
console.log(`Warnings      : ${warnings.length}`);
if (byFile.size) {
  console.log("\nFiles requiring attention:");
  for (const [file, list] of [...byFile].sort((a, b) => (a[0] < b[0] ? -1 : 1))) {
    console.log(`\n  ${file}`);
    for (const i of list) console.log(`    ${i.level === "error" ? "ERROR  " : "warning"}  ${i.msg}`);
  }
}
console.log(errors.length ? "\nAudit FAILED: fix the errors above." : "\nAudit passed (no errors).");
process.exit(errors.length ? 1 : 0);
