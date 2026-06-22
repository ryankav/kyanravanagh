# AGENTS.md

System of record for this repo. Authoritative; if reality drifts, update this file
in the same change. Imported into every session via `CLAUDE.md`, so keep it lean.

Personal blog. **Astro 6 · Tailwind v4 · AsciiDoc content · Cloudflare Workers.**
Node ≥ 22, pnpm.

## Commands

- `pnpm dev` — local server
- `pnpm build` — prod build
- `pnpm test` — Playwright a11y + AI-annotation suite (**must pass before PR**)
- `pnpm test:a11y` — a11y only
- `pnpm check` — build + tsc + wrangler dry-run
- `pnpm deploy` — build + deploy

## Layout

```
src/{components,layouts,pages}   UI (BlogPost.astro = post template)
src/loaders/asciidoc.ts          .adoc → content collection
src/content.config.ts            frontmatter schema
src/content/blog/YYYY/MM/*.adoc  the essays
src/styles/global.css            @theme tokens + the few hand-written rules
tests/                           Playwright specs
```

## Conventions (enforced defaults; deviate only with a reason)

- **Tailwind utilities in markup**, including variants (`focus-visible:`,
  `motion-reduce:`, `sr-only`). Hand-written CSS only for `@theme` tokens and
  rendered-AsciiDoc/slot content (`.article-body …`, `.ai …`) that has no element to
  hang a class on. If a rule could be a utility on an element you control, make it one.
- **Sentence-case headings** ("Usage of generative AI", not Title Case). Only the
  small mono eyebrow labels are `uppercase`, intentionally.
- **Accessibility (WCAG 2.1 AA) is gated by `pnpm test`.** Requirements + how the
  suite works → [`docs/accessibility.md`](docs/accessibility.md).
- **Unique post filenames.** The loader derives a post's id/URL from the filename
  basename only — duplicate basenames in different folders silently clobber each other.

## Working with prose

Two non-interchangeable modes — read the guide before touching prose:

- Editing the author's own writing → [`docs/editing-my-writing.md`](docs/editing-my-writing.md)
- Generating new prose → [`docs/generating-content.md`](docs/generating-content.md)

Default: propose, don't rewrite; preserve the author's voice. Editing or refining the
author's own writing is **never** marked — the work stays theirs.

## Marking AI content (origin-based, block-only)

Marking tracks **origin, not who edited last**. Flag only a whole block the author
**did not originally write** (text AI generated and kept rather than rewritten in the
author's words). It **stays flagged even if later revised**, by the author or by AI.
Editing/refining author-originated text is not marked.

`[.ai]` above a block → `<div class="… ai">` (labelled "Written by generative AI").
Styled in `global.css` (`AI-annotation marker`, colour `--color-ai`). There is no
inline marker. Disclosure is otherwise automatic: every post links to the **Usage of
generative AI** policy (`src/pages/about.astro`, `id="ai-usage"`, linked from
`BlogPost.astro`). Don't add extra banners. Renaming the anchor means updating the
link and tests.
