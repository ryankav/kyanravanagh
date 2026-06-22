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

## ✦ Flagging AI content

Posts flag any **whole passage the author did not originally write** (AI-generated
text kept as-is) with an AsciiDoc block role:

```asciidoc
[.ai]
A whole paragraph the author did not originally write. It renders with a coloured
rule and a "Written by generative AI" label, and stays flagged even if later revised.
```

`[.ai]` on its own line above a block flags the whole block; it is styled in
`src/styles/global.css` (search for `AI-annotation marker`). There is no inline
marker — editing or refining the author's own writing is review, not generation, and
is never flagged.

Every post automatically carries a small disclaimer under its hero image linking to
the **Usage of generative AI** section of the About page (`/about/#ai-usage`), where the
site-wide policy and a legend of the marker live — no per-post frontmatter is needed.
[`tests/ai-annotations.spec.ts`](tests/ai-annotations.spec.ts) enforces that every post
links to the policy and that the marker renders from its AsciiDoc role.

## 👀 Want to learn more?

Check out [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).

## Credit

This theme is based off of the lovely [Bear Blog](https://github.com/HermanMartinus/bearblog/).
