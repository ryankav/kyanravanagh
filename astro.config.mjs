// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  site: "https://kyanravanagh.com",
  integrations: [sitemap()],
  // The accessibility suite runs against the dev server (the Cloudflare adapter
  // can't `astro preview`). The dev toolbar injects its own DOM/headings that
  // never ship to production, so it's switched off when the tests drive dev.
  devToolbar: { enabled: !process.env.DISABLE_DEV_TOOLBAR },
  vite: {
    plugins: [tailwindcss()],
  },
  adapter: cloudflare({
    platformProxy: {
      enabled: true,
    },
  }),
});
