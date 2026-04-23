#!/usr/bin/env node
// Fetches EPA regulatory updates from the Federal Register API and writes
// the top N exam-relevant items to news.json. Runs daily via GitHub Actions.
//
// Source: https://www.federalregister.gov/developers/api/v1
// Why Federal Register: stable JSON API, authoritative source for every rule
// that could affect an EPA 608 exam-taker, no scraping, no auth needed.
//
// Fail-safe: if the API returns no matches (or errors), this script exits 0
// WITHOUT modifying news.json. That way a bad run never wipes the card.

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const OUTPUT = resolve(ROOT, "news.json");

// Narrow query: EPA only, refrigerant-related, most recent first.
const API_URL =
  "https://www.federalregister.gov/api/v1/articles.json" +
  "?conditions%5Bagencies%5D%5B%5D=environmental-protection-agency" +
  "&conditions%5Bterm%5D=refrigerant" +
  "&per_page=25" +
  "&order=newest" +
  "&fields%5B%5D=title" +
  "&fields%5B%5D=publication_date" +
  "&fields%5B%5D=abstract" +
  "&fields%5B%5D=html_url" +
  "&fields%5B%5D=document_number" +
  "&fields%5B%5D=type";

// Keywords that mean "yes, this is exam-relevant." An article has to hit at
// least one. Tight list — we want regulatory/technical news, not site cleanups.
const RELEVANCE_PATTERNS = [
  /section\s*608/i,
  /\baim act\b/i,
  /hfc\s*phas/i,
  /phasedown/i,
  /\bsnap\b/i,
  /significant\s*new\s*alternatives/i,
  /stratospheric\s*ozone/i,
  /ozone[-\s]*depleting/i,
  /hfo-/i,
  /leak\s*repair/i,
  /refrigerant\s*management/i,
  /r-?22\b/i,
  /r-?410a\b/i,
  /r-?454b\b/i,
  /r-?32\b/i,
  /r-?1234yf\b/i,
  /\bhfc\b/i,
  /\bhcfc\b/i,
  /\bcfc\b/i,
  /venting/i
];

// Keywords that make something look like noise — site cleanup settlements,
// unrelated CERCLA actions, etc. Skip anything that matches.
const EXCLUDE_PATTERNS = [
  /settlement\s*agreement/i,
  /\bcercla\b/i,
  /response\s*costs/i,
  /superfund/i
];

function isRelevant(article) {
  const hay = `${article.title || ""}\n${article.abstract || ""}`;
  if (EXCLUDE_PATTERNS.some((re) => re.test(hay))) return false;
  return RELEVANCE_PATTERNS.some((re) => re.test(hay));
}

function cleanAbstract(s) {
  if (!s) return "";
  // Federal Register abstracts sometimes have odd whitespace & long sentences;
  // trim to a reasonable display length without lopping a sentence mid-word.
  const trimmed = s.replace(/\s+/g, " ").trim();
  if (trimmed.length <= 280) return trimmed;
  const cutoff = trimmed.slice(0, 280);
  const lastSpace = cutoff.lastIndexOf(" ");
  return cutoff.slice(0, lastSpace > 200 ? lastSpace : 280) + "…";
}

async function main() {
  let data;
  try {
    const res = await fetch(API_URL, {
      headers: { "User-Agent": "protean-608-news-fetcher (github.com/dmarkamado-gif/protean-608)" }
    });
    if (!res.ok) {
      console.error(`Federal Register API returned ${res.status}`);
      process.exit(0); // fail-safe: leave existing file alone
    }
    data = await res.json();
  } catch (err) {
    console.error(`Network/parse error: ${err.message}`);
    process.exit(0);
  }

  const results = Array.isArray(data?.results) ? data.results : [];
  const relevant = results.filter(isRelevant).slice(0, 5);

  if (relevant.length === 0) {
    console.log("No exam-relevant items in the latest 25 results. Leaving news.json unchanged.");
    process.exit(0);
  }

  const out = {
    lastUpdated: new Date().toISOString(),
    source: "Federal Register (U.S. EPA)",
    sourceUrl: "https://www.federalregister.gov/",
    items: relevant.map((a) => ({
      date: a.publication_date,
      title: a.title,
      abstract: cleanAbstract(a.abstract),
      url: a.html_url,
      docNumber: a.document_number,
      type: a.type
    }))
  };

  // Avoid rewriting the file if nothing material changed — keeps git history clean.
  if (existsSync(OUTPUT)) {
    try {
      const prev = JSON.parse(readFileSync(OUTPUT, "utf8"));
      const prevKey = JSON.stringify(prev.items || []);
      const nextKey = JSON.stringify(out.items);
      if (prevKey === nextKey) {
        console.log("No new items. news.json is already up to date.");
        process.exit(0);
      }
    } catch { /* fall through and rewrite */ }
  }

  writeFileSync(OUTPUT, JSON.stringify(out, null, 2) + "\n", "utf8");
  console.log(`Wrote ${relevant.length} item(s) to news.json (most recent: ${relevant[0].publication_date}).`);
}

main();
