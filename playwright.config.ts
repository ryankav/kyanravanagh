import { defineConfig, devices } from "@playwright/test";

const PORT = 4399;
const HOST = `http://localhost:${PORT}`;

// The Cloudflare adapter doesn't support `astro preview`, so we run the
// accessibility checks against the dev server. It renders the same HTML the
// pages produce in production, which is what the audit cares about.
export default defineConfig({
	testDir: "./tests",
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 1 : 0,
	reporter: process.env.CI
		? [["github"], ["list"], ["html", { open: "never" }]]
		: "list",
	use: {
		baseURL: HOST,
		trace: "on-first-retry",
	},
	projects: [
		{
			name: "chromium",
			use: { ...devices["Desktop Chrome"] },
		},
	],
	webServer: {
		command: `pnpm dev --port ${PORT}`,
		url: HOST,
		reuseExistingServer: !process.env.CI,
		timeout: 120_000,
		env: { DISABLE_DEV_TOOLBAR: "1" },
	},
});
