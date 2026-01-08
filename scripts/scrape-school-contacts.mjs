#!/usr/bin/env node
/**
 * School Contact Scraper
 *
 * Scrapes contact information (email, phone, website) from MINEDUC's Ficha Escolar
 * for each school in the database.
 *
 * NOTE: The MINEDUC MIME site (mime.mineduc.cl) is sometimes in maintenance mode.
 * If the scraper returns no results, check if the site is accessible manually.
 *
 * Usage:
 *   node scripts/scrape-school-contacts.mjs [--limit=N] [--start=RBD] [--output=file.json]
 *
 * Options:
 *   --limit=N     Only process N schools (useful for testing)
 *   --start=RBD   Start from a specific RBD
 *   --output=FILE Output file path (default: school-contacts.json)
 *
 * Example:
 *   node scripts/scrape-school-contacts.mjs --limit=5
 */

import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Parse command line arguments
const args = process.argv.slice(2);
const getArg = (name) => {
  const arg = args.find((a) => a.startsWith(`--${name}=`));
  return arg ? arg.split('=')[1] : null;
};

const LIMIT = getArg('limit') ? parseInt(getArg('limit')) : null;
const START_RBD = getArg('start') ? parseInt(getArg('start')) : null;
const OUTPUT_FILE = getArg('output') || 'school-contacts.json';

// MINEDUC Ficha URL
const FICHA_URL = (rbd) => `https://www.mime.mineduc.cl/mvc/mime/ficha?rbd=${rbd}`;

// Delay between requests to avoid overwhelming the server
const DELAY_MS = 1500;

// Load school RBDs from the data file
async function loadSchools() {
  const dataPath = path.join(__dirname, '../lib/schools/data.ts');
  const content = fs.readFileSync(dataPath, 'utf-8');

  // Extract RBDs from the data file (format: "rbd": 123)
  const rbdMatches = content.matchAll(/"rbd":\s*(\d+)/g);
  const rbds = [...rbdMatches].map((m) => parseInt(m[1]));

  console.log(`Found ${rbds.length} schools in database`);
  return rbds;
}

// Scrape a single school's contact info
async function scrapeSchool(page, rbd, debug = false) {
  try {
    // Navigate to the ficha page
    await page.goto(FICHA_URL(rbd), { waitUntil: 'networkidle', timeout: 30000 });

    // Wait for dynamic content to load
    await page.waitForTimeout(3000);

    // Debug: save screenshot and page content for first few schools
    if (debug) {
      await page.screenshot({ path: `debug-rbd-${rbd}.png`, fullPage: true });
      const content = await page.content();
      fs.writeFileSync(`debug-rbd-${rbd}.html`, content);
      console.log(`\n  [Debug] Saved screenshot and HTML for RBD ${rbd}`);
    }

    // Extract contact information
    const contactInfo = await page.evaluate(() => {
      const result = {
        email: null,
        phone: null,
        website: null,
        director: null,
        address: null,
      };

      const bodyText = document.body.innerText || '';
      const bodyHtml = document.body.innerHTML || '';

      // Extract email (look for common patterns)
      const emailPatterns = [
        /[\w.-]+@[\w.-]+\.cl/gi, // .cl emails first (Chilean)
        /[\w.-]+@[\w.-]+\.\w{2,}/gi, // Any email
      ];

      for (const pattern of emailPatterns) {
        const matches = bodyHtml.match(pattern);
        if (matches && matches.length > 0) {
          // Filter out MINEDUC emails
          const filtered = matches.filter(
            (e) => !e.includes('mineduc') && !e.includes('mime')
          );
          if (filtered.length > 0) {
            result.email = filtered[0].toLowerCase();
            break;
          }
        }
      }

      // Extract phone (Chilean formats)
      const phonePatterns = [
        /(?:\+56\s?)?9\s?\d{4}\s?\d{4}/g, // Mobile: +56 9 1234 5678
        /(?:\+56\s?)?\d{2}\s?\d{3}\s?\d{4}/g, // Landline: +56 XX XXX XXXX
        /\(\d{2}\)\s?\d{7}/g, // (XX) 1234567
      ];

      for (const pattern of phonePatterns) {
        const matches = bodyText.match(pattern);
        if (matches && matches.length > 0) {
          result.phone = matches[0].replace(/\s/g, '');
          break;
        }
      }

      // Extract website (external links)
      const links = document.querySelectorAll('a[href]');
      for (const link of links) {
        const href = link.getAttribute('href') || '';
        if (
          href &&
          !href.includes('mineduc') &&
          !href.includes('mime.') &&
          !href.includes('javascript') &&
          !href.includes('mailto') &&
          !href.includes('tel:') &&
          (href.startsWith('http://') ||
            href.startsWith('https://') ||
            href.startsWith('www.'))
        ) {
          result.website = href.startsWith('www.') ? 'https://' + href : href;
          break;
        }
      }

      // Try to find director name
      const directorMatch = bodyText.match(
        /(?:director|directora)[:\s]+([A-ZÁÉÍÓÚÑ][a-záéíóúñ]+(?:\s+[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+)+)/i
      );
      if (directorMatch) {
        result.director = directorMatch[1].trim();
      }

      // Try to find address
      const addressMatch = bodyText.match(
        /(?:direcci[oó]n|domicilio)[:\s]+([^,\n]+(?:,\s*[^,\n]+)?)/i
      );
      if (addressMatch) {
        result.address = addressMatch[1].trim();
      }

      return result;
    });

    return contactInfo;
  } catch (error) {
    console.error(`  Error scraping RBD ${rbd}: ${error.message}`);
    return { error: error.message };
  }
}

// Main function
async function main() {
  console.log('School Contact Scraper (Playwright)');
  console.log('====================================\n');

  // Load existing results if any
  const outputPath = path.join(__dirname, '..', OUTPUT_FILE);
  let results = {};
  if (fs.existsSync(outputPath)) {
    try {
      results = JSON.parse(fs.readFileSync(outputPath, 'utf-8'));
      console.log(`Loaded ${Object.keys(results).length} existing results`);
    } catch {
      console.log('Could not load existing results, starting fresh');
    }
  }

  // Load schools
  const rbds = await loadSchools();

  // Filter by start RBD if specified
  let toProcess = rbds;
  if (START_RBD) {
    const startIndex = rbds.indexOf(START_RBD);
    if (startIndex !== -1) {
      toProcess = rbds.slice(startIndex);
      console.log(`Starting from RBD ${START_RBD}`);
    }
  }

  // Apply limit if specified
  if (LIMIT) {
    toProcess = toProcess.slice(0, LIMIT);
    console.log(`Limited to ${LIMIT} schools`);
  }

  // Skip already processed
  const alreadyProcessed = toProcess.filter((rbd) => results[rbd]);
  toProcess = toProcess.filter((rbd) => !results[rbd]);

  console.log(`Skipping ${alreadyProcessed.length} already processed`);
  console.log(`Processing ${toProcess.length} schools...\n`);

  if (toProcess.length === 0) {
    console.log('All schools already processed!');
    return;
  }

  // Launch browser
  const browser = await chromium.launch({
    headless: true,
  });

  const context = await browser.newContext({
    userAgent:
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  });

  const page = await context.newPage();

  let processed = 0;
  let found = 0;

  try {
    for (const rbd of toProcess) {
      processed++;
      process.stdout.write(
        `\r[${processed}/${toProcess.length}] Scraping RBD ${rbd}...`
      );

      const info = await scrapeSchool(page, rbd, processed === 1);

      const hasInfo = info.email || info.phone || info.website;
      if (hasInfo) {
        found++;
        console.log(
          `\n  Found: ${info.email || '-'} | ${info.phone || '-'} | ${info.website ? '(has website)' : '-'}`
        );
        if (info.director) console.log(`  Director: ${info.director}`);
      }

      // Store result
      results[rbd] = {
        email: info.email,
        phone: info.phone,
        website: info.website,
        director: info.director,
        address: info.address,
        scrapedAt: new Date().toISOString(),
      };

      // Save periodically
      if (processed % 10 === 0) {
        fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));
      }

      // Delay between requests
      await page.waitForTimeout(DELAY_MS);
    }
  } finally {
    await browser.close();
  }

  // Final save
  fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));

  // Summary
  const withEmail = Object.values(results).filter((r) => r.email).length;
  const withPhone = Object.values(results).filter((r) => r.phone).length;
  const withWebsite = Object.values(results).filter((r) => r.website).length;

  console.log('\n\n====================================');
  console.log(`Done! Processed ${processed} schools`);
  console.log(`Found contact info for ${found} schools in this run`);
  console.log(`\nTotal results: ${Object.keys(results).length}`);
  console.log(`  With email: ${withEmail}`);
  console.log(`  With phone: ${withPhone}`);
  console.log(`  With website: ${withWebsite}`);
  console.log(`\nResults saved to ${outputPath}`);
}

// Run
main().catch(console.error);
