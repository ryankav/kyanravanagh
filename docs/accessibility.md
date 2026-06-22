# Accessibility

Target: **WCAG 2.1 A/AA**, gated by `pnpm test` (Playwright + axe-core). Keep it green.

## What you must do

- **Every page:** one `<main id="main-content">`, one non-empty `<h1>`, `lang` on
  `<html>`, and the keyboard skip link must reach `#main-content`.
- **Interactive elements:** a visible `focus-visible:` ring.
- **New text colour:** must clear 4.5:1 against its background. Put it in `@theme` and
  verify (as `--color-accent` / `--color-ai` were).
- **Toggle/filter controls:** expose state (e.g. `aria-pressed`).
- **Decorative elements:** `aria-hidden`; meaningful images need real `alt`.
- Respect `prefers-reduced-motion` (`motion-reduce:` on animations).

## The suite (`tests/a11y.spec.ts`)

- Runs axe on home, about, archive, and **every** post (posts auto-discovered from the
  archive — new posts need no test edits). Fails on any A/AA violation.
- Asserts the structural basics above.
- Runs against `astro dev` (the Cloudflare adapter can't `astro preview`); dev toolbar
  off via `DISABLE_DEV_TOOLBAR` so the DOM matches prod.
- CI: `.github/workflows/accessibility.yml` on every push/PR.

Run locally: `pnpm test:a11y`. Adding a new top-level page? Add its route to
`STATIC_ROUTES` in the spec.
