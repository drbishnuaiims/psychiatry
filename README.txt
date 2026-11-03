git status
git commit -m "Add automated indexing, website audit and GitHub Pages deployment"

git push origin main 


# Psychiatry Knowledge Platform

A curated clinical knowledge platform covering psychiatry, clinical practice guidelines, disorders, pharmacology and reference books.

**Live website:** https://drbishnuaiims.github.io/psychiatry/

**GitHub repository:** https://github.com/drbishnuaiims/psychiatry

---

## 1. Quick Start

You only need to remember three commands:

| Command | Purpose |
|---|---|
| `./manage.sh help` | View all available commands |
| `./manage.sh status` | Check project and Git status |
| `./manage.sh publish "Your message"` | Publish website changes |

### Publishing a new article

1. Create your HTML article.
2. Save it in the appropriate folder.
3. Open Terminal and navigate to the project directory.
4. Run:

```bash
./manage.sh publish "Added new psychiatry article"
```

5. Review the proposed changes.
6. Type `yes` when asked to confirm.

The toolkit automatically rebuilds the index, validates the generated files, audits the website, scans for common secrets, commits and pushes your changes.

**Important:** Publishing through this command pushes changes to GitHub. GitHub Actions deployment requires GitHub Pages to be configured to use Actions.

---

## 2. Project Structure

```text
psychiatry/
│
├── index.html
├── profile.html
├── sitemap.xml
├── robots.txt
│
├── books/
│   └── Reference book articles
│
├── disorders/
│   └── Psychiatric disorder articles
│
├── cpg/
│   └── Clinical practice guidelines
│
├── data/
│   ├── guidelines.js
│   └── generated-guidelines.js
│
├── assets/
│   ├── app.js
│   └── style.css
│
├── scripts/
│   ├── generate-index.js
│   └── audit.js
│
├── .github/
│   └── workflows/
│       └── deploy.yml
│
├── manage.sh
├── package.json
└── README.md
```

---

## 3. Available Commands

Run all commands from the project root directory.

| Command | Description |
|---|---|
| `./manage.sh help` | Display command reference |
| `./manage.sh status` | Display Git status and article counts |
| `./manage.sh count` | Count HTML articles |
| `./manage.sh index` | Rebuild article index and sitemap |
| `./manage.sh validate` | Verify generated index and sitemap |
| `./manage.sh audit` | Audit website quality |
| `./manage.sh publish "message"` | Complete publishing workflow |

### Individual npm commands

```bash
npm run build
npm run validate
npm run audit
```

---

## 4. Adding New Articles

Place new HTML files in one of these directories:

| Directory | Content |
|---|---|
| `books/` | Textbook chapters, reference material and pharmacology |
| `disorders/` | Psychiatric disorders and their management |
| `cpg/` | Clinical practice guidelines and treatment protocols |

### Automatic indexing

The index generator automatically scans eligible HTML articles and extracts available information, including:

- Page title
- Main heading
- Meta description
- Keywords
- Author
- Publication date
- Category
- Estimated reading time

The generated information is used to populate the website's article listings.

You do not need to manually register every new article.

### Important naming rules

- Use descriptive filenames.
- Prefer lowercase filenames.
- Separate words using hyphens.
- Avoid special characters in article paths.
- Avoid filenames containing reserved terms such as `template`, `demo` or `draft`.
- Avoid temporary or backup directories.

Example:

```text
cpg/
├── schizophrenia-guidelines.html
├── bipolar-disorder-guidelines.html
└── ocd-management-guidelines.html
```

---

## 5. Manual Metadata

File: `data/guidelines.js`

This file contains manually maintained article metadata.

**Important:** Never overwrite or delete this file during automatic index generation.

Manual records take precedence over automatically generated records.

Use it when an article requires customised metadata or a manually curated listing.

---

## 6. Generated Files

The following files are automatically generated:

| File | Purpose |
|---|---|
| `data/generated-guidelines.js` | Automatically generated article records |
| `sitemap.xml` | Search-engine sitemap |

Do not manually edit these files.

Whenever articles are added, edited, renamed or deleted, rebuild the index:

```bash
./manage.sh index
```

Then validate:

```bash
./manage.sh validate
```

---

## 7. Website Quality Audit

Run:

```bash
./manage.sh audit
```

The audit checks:

- Missing page titles
- Missing meta descriptions
- Missing H1 headings
- Broken internal links
- Missing images
- Incorrect filename case
- Empty links and image references
- Duplicate canonical URLs
- Missing manual metadata

### Understanding audit results

**Errors:** Problems that should be corrected before publishing.

**Warnings:** Improvements recommended for content quality, SEO and metadata.

A successful audit can still report warnings. Review them periodically.

---

## 8. Publishing Workflow

The recommended publishing command is:

```bash
./manage.sh publish "Describe your changes"
```

The command performs the following steps:

1. Checks the current Git branch.
2. Checks synchronisation with GitHub.
3. Rebuilds the article index.
4. Validates generated files.
5. Runs the website audit.
6. Scans changes for common secret patterns.
7. Stages intended changes.
8. Displays the proposed changes.
9. Requests confirmation.
10. Commits and pushes to `main`.

Never approve publishing without reviewing the proposed changes.

If publishing is rejected because your local branch is behind GitHub, synchronise safely before retrying. Do not force-push or reset the branch.

---

## 9. GitHub Actions Deployment

The deployment workflow is located at:

```text
.github/workflows/deploy.yml
```

Once GitHub Pages is configured for GitHub Actions, the workflow automatically:

1. Runs when changes are pushed to `main`.
2. Installs the required Node.js environment.
3. Rebuilds the article index and sitemap.
4. Validates generated files.
5. Prepares the static website.
6. Uploads the deployment artifact.
7. Deploys the website to GitHub Pages.

The workflow is restricted to the `main` branch.

**GitHub configuration required:**

Repository → Settings → Pages → Build and deployment → Source → GitHub Actions.

Also restrict the `github-pages` environment to deployments from `main`.

---

## 10. Important Safety Rules

1. Never overwrite `data/guidelines.js`.
2. Never manually edit generated index files.
3. Never force-push to `main`.
4. Never commit passwords, API keys or credentials.
5. Always review staged changes before committing.
6. Run validation after modifying the generator.
7. Keep article filenames and internal links case-sensitive.
8. Do not delete existing article folders without checking their references.
9. Keep private and development-only files out of the deployment.
10. Maintain a backup before making major structural changes.

---

## 11. Current Platform Statistics

| Metric | Current count |
|---|---:|
| Book articles | 12 |
| Disorder articles | 4 |
| CPG articles | 16 |
| **Total indexed articles** | **32** |

These counts are dynamic and will change as new articles are added.

---

## 12. Troubleshooting

### Command permission denied

Run:

```bash
chmod +x manage.sh
```

### Generated files are outdated

Run:

```bash
./manage.sh index
./manage.sh validate
```

### Check current project status

```bash
./manage.sh status
```

### Check GitHub synchronisation

```bash
git fetch origin
git status -sb
```

### Check website quality

```bash
./manage.sh audit
```

---

## The One Command to Remember

Whenever you add or update an article, use:

```bash
./manage.sh publish "Describe what you changed"
```

**Focus on creating high-quality clinical knowledge. Let the publishing toolkit handle indexing, validation, quality checks and Git operations.**