# Astro Starter Kit: Blog

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/cloudflare/templates/tree/main/astro-blog-starter-template)

![Astro Template Preview](https://github.com/withastro/astro/assets/2244813/ff10799f-a816-4703-b967-c78997e8323d)

<!-- dash-content-start -->

Create a blog with Astro and deploy it on Cloudflare Workers as a [static website](https://developers.cloudflare.com/workers/static-assets/).

Features:

- ✅ Minimal styling (make it your own!)
- ✅ 100/100 Lighthouse performance
- ✅ SEO-friendly with canonical URLs and OpenGraph data
- ✅ Sitemap support
- ✅ RSS Feed support
- ✅ Markdown & MDX support
- ✅ Built-in Observability logging

<!-- dash-content-end -->

## Getting Started

Outside of this repo, you can start a new project with this template using [C3](https://developers.cloudflare.com/pages/get-started/c3/) (the `create-cloudflare` CLI):

```bash
pnpm create cloudflare@latest -- --template=cloudflare/templates/astro-blog-starter-template
```

A live public deployment of this template is available at [https://astro-blog-starter-template.templates.workers.dev](https://astro-blog-starter-template.templates.workers.dev)

## 🚀 Project Structure

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

The `src/content/` directory contains "collections" of related Markdown and MDX documents. Use `getCollection()` to retrieve posts from `src/content/blog/`, and type-check your frontmatter using an optional schema. See [Astro's Content Collections docs](https://docs.astro.build/en/guides/content-collections/) to learn more.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                           | Action                                           |
| :-------------------------------- | :----------------------------------------------- |
| `pnpm install`                     | Installs dependencies                            |
| `pnpm dev`                     | Starts local dev server at `localhost:4321`      |
| `pnpm build`                   | Build your production site to `./dist/`          |
| `pnpm preview`                 | Preview your build locally, before deploying     |
| `pnpm astro ...`               | Run CLI commands like `astro add`, `astro check` |
| `pnpm astro -- --help`         | Get help using the Astro CLI                     |
| `pnpm build && pnpm deploy` | Deploy your production site to Cloudflare        |
| `pnpm wrangler tail`               | View real-time logs for all Workers              |
| `pnpm test`                        | Run the Playwright test suite                    |
| `pnpm test:a11y`                   | Run the accessibility (axe-core) checks          |
| `pnpm test:ui`                     | Open the Playwright UI runner                    |

## ♿ Accessibility

Accessibility is enforced automatically. [`tests/a11y.spec.ts`](tests/a11y.spec.ts) drives
the site with Playwright and:

- runs [axe-core](https://github.com/dequelabs/axe-core) against the home, about,
  archive, and every blog post page, failing on any WCAG 2.1 A/AA violation
  (blog posts are discovered from the archive, so new posts are covered with no
  test changes);
- asserts the structural basics — one `<main>` landmark, a single non-empty `<h1>`,
  a declared document language, a keyboard-reachable skip link, and that the archive
  tag filters expose their `aria-pressed` state.

Run them locally with `pnpm test:a11y`. The same suite runs in CI on every push and
pull request via [`.github/workflows/accessibility.yml`](.github/workflows/accessibility.yml).

The checks run against the Astro dev server because the Cloudflare adapter can't
`astro preview`; the dev toolbar is disabled there (`DISABLE_DEV_TOOLBAR`) so the test
DOM matches production.

## 👀 Want to learn more?

Check out [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).

## Credit

This theme is based off of the lovely [Bear Blog](https://github.com/HermanMartinus/bearblog/).
