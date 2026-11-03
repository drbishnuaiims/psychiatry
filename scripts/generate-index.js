#!/usr/bin/env node
/*
  Automatic article indexer.
    node scripts/generate-index.js            -> writes data/generated-guidelines.js and sitemap.xml
    node scripts/generate-index.js --check    -> validates only, writes nothing (exit 1 on errors)

  Never modifies article HTML or data/guidelines.js.
*/
"use strict";
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const BASE_URL = "https://drbishnuaiims.github.io/psychiatry/";
const SECTIONS = ["books", "disorders", "cpg"];
const SECTION_LABELS = { books: "Books", disorders: "Disorders", cpg: "CPG" };
const OUT_JS = path.join(ROOT, "data", "generated-guidelines.js");
const OUT_SITEMAP = path.join(ROOT, "sitemap.xml");
const ACRONYMS = { cpg: "CPG", cpgs: "CPGs", ocd: "OCD", ocrd: "OCRD", adhd: "ADHD", ptsd: "PTSD", cbt: "CBT", ect: "ECT", tms: "TMS", clp: "CLP", ips: "IPS", bpad: "BPAD" };
// Obvious templates / demos / temporary files
const EXCLUDE_FILE = /(^|[-_.])(template|demo|draft)([-_.]|$)|^[._~]|~$|\.(tmp|bak|orig|swp)\.html$|\.html\.(tmp|bak)$|[-_ ]copy\.html$/i;
const EXCLUDE_DIR = /^(\.|node_modules$|_|tmp$|temp$|templates?$|demos?$)/i;

function decode(s) {
  return String(s)
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(+d))
    .replace(/&nbsp;/g, " ").replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
}
const clean = (s) => decode(String(s).replace(/<[^>]*>/g, " ")).replace(/\s+/g, " ").trim();

function pretty(s) {
  return s.replace(/\.[a-z0-9]+$/i, "").replace(/[-_]+/g, " ").trim().split(/\s+/)
    .map((w) => ACRONYMS[w.toLowerCase()] || w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
}

function walk(dir, out) {
  let entries;
  try { entries = fs.readdirSync(dir, { withFileTypes: true }); } catch (e) { return; }
  entries.sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0));
  for (const e of entries) {
    if (e.isSymbolicLink()) continue;
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (!EXCLUDE_DIR.test(e.name)) walk(full, out);
    } else if (/\.html$/i.test(e.name) && !EXCLUDE_FILE.test(e.name)) {
      out.push(full);
    }
  }
}

function metaContent(html, names) {
  const tags = html.match(/<meta\b[^>]*>/gi) || [];
  for (const t of tags) {
    const key = (t.match(/\b(?:name|property)\s*=\s*["']([^"']+)["']/i) || [])[1];
    if (!key || !names.includes(key.toLowerCase())) continue;
    const c = (t.match(/\bcontent\s*=\s*"([^"]*)"/i) || t.match(/\bcontent\s*=\s*'([^']*)'/i) || [])[1];
    if (c && c.trim()) return clean(c);
  }
  return "";
}

const splitList = (s) => s.split(/[,;|]/).map((x) => x.trim()).filter(Boolean);
const uniq = (arr) => {
  const seen = new Set();
  return arr.filter((x) => { const k = x.toLowerCase(); if (seen.has(k)) return false; seen.add(k); return true; });
};

function extract(file) {
  const rel = path.relative(ROOT, file).split(path.sep).join("/");
  const html = fs.readFileSync(file, "utf8");
  const segs = rel.split("/");
  const section = segs[0];
  const sub = segs.slice(1, -1);
  const stem = segs[segs.length - 1].replace(/\.html$/i, "");

  const titleTag = (html.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || [])[1];
  const h1 = (html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i) || [])[1];
  const h1Text = clean(h1 || "");
  const title = clean(titleTag || "") || h1Text;
  const shortSrc = title.split(/\s+[–—|]\s+/)[0] || title;
  const shortTitle = shortSrc.length > 60 ? shortSrc.slice(0, 57).trim() + "…" : shortSrc;

  const body = html.replace(/<(script|style|noscript|svg)\b[\s\S]*?<\/\1>/gi, " ");
  const text = clean(body);
  const words = text ? text.split(" ").length : 0;
  const minutes = Math.max(1, Math.round(words / 200));

  let description = metaContent(html, ["description", "og:description"]);
  if (!description) {
    const p = (body.match(/<p\b[^>]*>([\s\S]*?)<\/p>/i) || [])[1];
    const t = clean(p || "") || text;
    description = t.length > 200 ? t.slice(0, 197).replace(/\s+\S*$/, "") + "…" : t;
  }
  if (!description) description = title;

  const metaKeywords = splitList(metaContent(html, ["keywords"]));
  const authors = metaContent(html, ["author", "citation_author", "dc.creator", "article:author"]) || "Psychiatry CPG Notes";
  const dateStr = metaContent(html, ["citation_publication_date", "citation_date", "dc.date", "article:published_time", "date"]);
  const year = (dateStr.match(/(?:19|20)\d{2}/) || title.match(/\b(?:19|20)\d{2}\b/) || [""])[0];

  const pathLabels = sub.map(pretty);
  const category = [SECTION_LABELS[section] || pretty(section), ...pathLabels].join(" / ");
  const tags = uniq([...metaKeywords.slice(0, 4), ...pathLabels, SECTION_LABELS[section]]).slice(0, 4);
  const keywords = uniq([...metaKeywords, title, h1Text, ...pathLabels, pretty(stem)].filter(Boolean));

  return {
    title,
    shortTitle,
    authors,
    year,
    journal: category,
    category,
    description,
    tags,
    keywords,
    url: rel,
    readTime: `${minutes} min read`,
  };
}

function validate(records) {
  const errors = [];
  const seen = new Set();
  const counts = Object.fromEntries(SECTIONS.map((s) => [s, 0]));
  for (const r of records) {
    const key = r.url.toLowerCase();
    if (seen.has(key)) errors.push(`Duplicate URL: ${r.url}`);
    seen.add(key);
    if (!r.title) errors.push(`Missing title: ${r.url}`);
    if (!/^(books|disorders|cpg)\/[^?#"'<>\\]+\.html$/i.test(r.url) || r.url.includes("..")) errors.push(`Invalid path: ${r.url}`);
    if (!fs.existsSync(path.join(ROOT, r.url))) errors.push(`File does not exist: ${r.url}`);
    counts[r.url.split("/")[0]] = (counts[r.url.split("/")[0]] || 0) + 1;
  }
  return { errors, counts };
}

const renderJs = (records) =>
  "/* AUTO-GENERATED by scripts/generate-index.js. Do not edit by hand.\n" +
  "   Manual records in data/guidelines.js take precedence (see assets/app.js). */\n" +
  "window.GENERATED_GUIDELINES = " + JSON.stringify(records, (k, v) => (typeof v === "string" ? v.replace(/</g, "&lt;").replace(/>/g, "&gt;") : v), 2) + ";\n";

const xmlEscape = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");

function renderSitemap(records) {
  const urls = [`  <url>\n    <loc>${xmlEscape(BASE_URL)}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>1.0</priority>\n  </url>`];
  const seen = new Set([BASE_URL]);
  for (const r of records) {
    const loc = BASE_URL + r.url.split("/").map(encodeURIComponent).join("/");
    if (seen.has(loc)) continue;
    seen.add(loc);
    urls.push(`  <url><loc>${xmlEscape(loc)}</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>`);
  }
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>\n`;
}

function main() {
  const checkOnly = process.argv.includes("--check");
  const files = [];
  for (const s of SECTIONS) walk(path.join(ROOT, s), files);
  const records = files.map(extract).sort((a, b) => (a.url < b.url ? -1 : a.url > b.url ? 1 : 0));
  const { errors, counts } = validate(records);

  if (process.argv.includes("--count")) {
    for (const s of SECTIONS) console.log(`${s}/ ${counts[s]}`);
    console.log(`total ${records.length}`);
    return;
  }

  console.log("Articles found:");
  for (const s of SECTIONS) console.log(`  ${s}/: ${counts[s]}`);
  console.log(`Total indexed: ${records.length}`);

  if (errors.length) {
    console.error(`\n${errors.length} problem(s):`);
    errors.forEach((e) => console.error("  - " + e));
    process.exit(1);
  }

  if (checkOnly) {
    const read = (f) => (fs.existsSync(f) ? fs.readFileSync(f, "utf8") : null);
    const stale = [];
    if (read(OUT_JS) !== renderJs(records)) stale.push("data/generated-guidelines.js");
    if (read(OUT_SITEMAP) !== renderSitemap(records)) stale.push("sitemap.xml");
    if (stale.length) {
      console.error(`\nOut of date (run "npm run build:index"): ${stale.join(", ")}`);
      process.exit(1);
    }
    console.log("Validation passed; generated files are up to date.");
  } else {
    fs.writeFileSync(OUT_JS, renderJs(records));
    fs.writeFileSync(OUT_SITEMAP, renderSitemap(records));
    console.log("Wrote data/generated-guidelines.js and sitemap.xml");
  }
}

module.exports = { ROOT, SECTIONS, walk, validate };
if (require.main === module) main();
