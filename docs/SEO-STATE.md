# SimplePAES SEO Implementation

> Current state of SEO implementation as of January 2026

## Overview

SimplePAES has a mature SEO implementation built on Next.js 15+ App Router patterns. The architecture uses centralized schemas, reusable components, and dynamic metadata generation.

---

## Architecture

```
lib/seo/schemas.ts          # Centralized JSON-LD schemas
lib/constants.ts            # SITE_URL, SITE_NAME, BRAND_COLOR
components/seo/JsonLd.tsx   # Reusable JSON-LD renderer (XSS-safe)
app/sitemap.ts              # Dynamic sitemap generation
app/robots.ts               # Crawler access rules
app/layout.tsx              # Root metadata + global schemas
```

---

## Root Metadata (`app/layout.tsx`)

The root layout configures base metadata inherited by all pages:

| Property | Value |
|----------|-------|
| Title Template | `%s \| SimplePAES` |
| Default Title | `SimplePAES - Matemáticas Enseñanza Media y PAES Chile` |
| Locale | `es_CL` |
| Theme Color | `#007AFF` |
| Twitter Handle | `@simplepaes` |

**Keywords** (32 targeted terms):
- Grade levels: 7° Básico through 4° Medio
- Exam terms: PAES, M1, M2, prueba de matemáticas
- Chile-specific: Chile, enseñanza media chilena, currículum nacional

**Robot Directives**:
- `index: true`, `follow: true`
- GoogleBot: unlimited snippet, large image preview

**Global JSON-LD Schemas** (injected on all pages):
1. `organizationSchema` - EducationalOrganization
2. `websiteSchema` - WebSite
3. `faqSchema` - FAQPage with 6 Q&As

---

## JSON-LD Schemas (`lib/seo/schemas.ts`)

### Static Schemas

| Schema | Type | Purpose |
|--------|------|---------|
| `organizationSchema` | EducationalOrganization | Company info, logo, contact |
| `websiteSchema` | WebSite | Site structure, language |
| `courseSchema` | Course | Premium subscription as educational offering |
| `faqSchema` | FAQPage | 6 common questions about SimplePAES |
| `howToSchema` | HowTo | 4-step guide to using the platform |
| `contactPageSchema` | ContactPage | Contact organization reference |
| `pricingProductSchema` | Product | Premium subscription ($8,000 CLP) |

### Generator Functions

```typescript
// For legal/static pages
createWebPageSchema({ name, description, url, breadcrumbItems })

// For any page needing breadcrumbs
createBreadcrumbSchema(items: Array<{ name, url }>)
```

---

## Page-Level SEO

### Public Pages with Full SEO

| Page | Metadata | JSON-LD Schemas |
|------|----------|-----------------|
| `/` (home) | Root metadata | Organization, Website, FAQ |
| `/pricing` | Custom title/description, canonical, OG, Twitter | Product, Course, Breadcrumb |
| `/contacto` | Custom title/description, canonical, OG, Twitter | ContactPage, Breadcrumb |
| `/como-funciona` | Custom metadata | HowTo (via layout) |
| `/blog` | Blog-focused metadata | Blog schema |
| `/blog/[slug]` | Dynamic per-post metadata | Article, Breadcrumb |
| `/legal/terminos` | Terms-focused, robots indexed | WebPage with Breadcrumb |
| `/legal/privacidad` | Privacy-focused, robots indexed | WebPage with Breadcrumb |
| `/legal/cookies` | Cookies-focused, robots indexed | WebPage with Breadcrumb |
| `/legal/reembolsos` | Refunds-focused, robots indexed | WebPage with Breadcrumb |

### Protected Pages (No SEO)

These pages are behind authentication and blocked in robots.txt:
- `/dashboard/*`
- `/admin/*`
- `/practice/*`
- `/lessons/*`
- `/profile/*`

---

## Sitemap (`app/sitemap.ts`)

Dynamic generation with priorities:

| URL Pattern | Priority | Change Frequency |
|-------------|----------|------------------|
| `/` | 1.0 | weekly |
| `/pricing` | 0.9 | monthly |
| `/como-funciona` | 0.9 | monthly |
| `/blog` | 0.8 | daily |
| `/blog/[slug]` | 0.7 | monthly |
| `/contacto` | 0.7 | monthly |
| `/legal/*` | 0.3 | yearly |

Blog posts are dynamically added with their publication dates as `lastModified`.

---

## Robots.txt (`app/robots.ts`)

### Allowed (Public Content)
```
/
/como-funciona
/pricing
/contacto
/legal/*
/blog/*
/llms.txt
```

### Disallowed (Protected Content)
```
/api/*
/admin/*
/dashboard/*
/profile/*
/practice/*
/learn/*
/live-practice/*
/payment/*
/progress/*
/lessons/*
/mini-lessons/*
/curriculum/*
/forgot-password/*
/reset-password/*
```

### AI Crawler Rules

Explicit rules for AI crawlers (GPTBot, ChatGPT-User, anthropic-ai, Claude-Web, PerplexityBot, Bytespider) - allowing public content, blocking protected routes.

---

## OpenGraph Images

### Static OG Image (`app/opengraph-image.tsx`)
- **Runtime**: Edge
- **Size**: 1200x630
- **Content**: SimplePAES branding with stats (+600 exercises, M1 y M2, Feedback AI)

### Dynamic Blog OG Images (`app/blog/[slug]/opengraph-image.tsx`)
- **Runtime**: Node.js
- **Size**: 1200x630
- **Content**: Post title, description, author, date
- **Fallback**: Generic blog image if post not found

---

## JsonLd Component (`components/seo/JsonLd.tsx`)

Reusable component for rendering structured data:

```tsx
<JsonLd data={schemaObject} />
```

**Security**: Sanitizes JSON to prevent XSS by escaping `<`, `>`, and `&` characters.

---

## Blog SEO

Each blog post (`/blog/[slug]`) generates:

1. **Dynamic Metadata**
   - Title: `{post.title} - SimplePAES Blog`
   - Description from post frontmatter
   - Canonical URL
   - OpenGraph with article type, publish date, authors, tags
   - Twitter card with image

2. **JSON-LD Schemas**
   - Article schema (headline, author, publisher, dates)
   - Breadcrumb schema (Inicio > Blog > Post Title)

3. **Dynamic OG Image**
   - Generated at request time with post details

---

## Constants (`lib/constants.ts`)

```typescript
export const SITE_URL = "https://simplepaes.cl";
export const SITE_NAME = "SimplePAES";
export const BRAND_COLOR = "#007AFF";
```

---

## Web App Manifest (`public/manifest.json`)

```json
{
  "name": "SimplePAES - Matemáticas Enseñanza Media + PAES",
  "short_name": "SimplePAES",
  "display": "standalone",
  "theme_color": "#007AFF",
  "categories": ["education", "productivity"]
}
```

---

## Verification

- **Google Search Console**: Verification meta tag in root layout
- **Sitemap submission**: Available at `/sitemap.xml`

---

## Patterns Used

1. **Server/Client Component Split**: Pages export metadata from server components, interactive UI in client components
2. **Centralized Schemas**: All JSON-LD definitions in `lib/seo/schemas.ts`
3. **Reusable JsonLd Component**: XSS-safe rendering of structured data
4. **Dynamic Metadata**: Blog posts generate unique metadata per page
5. **Priority-Based Sitemap**: Higher priority for conversion pages (pricing, how-it-works)

---

## Future Improvements

Potential areas for enhancement:

1. **Lesson/Course Detail Schemas**: Add CourseInstance schemas for individual lessons
2. **Review/Rating Schema**: Add AggregateRating if user reviews are collected
3. **Video Schema**: If video content is added to lessons
4. **Local Business Schema**: If physical presence is established
5. **Breadcrumbs on More Pages**: Currently only on blog and legal pages

---

## Testing & Validation

**Tools to validate implementation:**

1. [Google Rich Results Test](https://search.google.com/test/rich-results) - Validate JSON-LD
2. [Schema.org Validator](https://validator.schema.org/) - Check schema markup
3. [Google Search Console](https://search.google.com/search-console) - Monitor indexing
4. Browser DevTools - Inspect `<meta>` tags and `<script type="application/ld+json">`

**Manual Checks:**
- View page source for meta tags
- Check Network tab for sitemap.xml and robots.txt
- Test social sharing with Facebook/Twitter/LinkedIn debuggers
