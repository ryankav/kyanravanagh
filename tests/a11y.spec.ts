import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

// WCAG 2.0/2.1 levels A and AA — the standard most organisations target.
const WCAG_TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"];

// Static routes that should always exist.
const STATIC_ROUTES = ["/", "/about/", "/blog/"];

/**
 * Discover every blog post URL from the archive page so new posts are covered
 * automatically without editing this file.
 */
async function discoverBlogPosts(page: Page): Promise<string[]> {
	await page.goto("/blog/");
	const hrefs = await page
		.locator('a[href^="/blog/"]')
		.evaluateAll((links) =>
			links
				.map((a) => new URL((a as HTMLAnchorElement).href).pathname)
				.filter((path) => path !== "/blog/"),
		);
	return [...new Set(hrefs)];
}

async function analyze(page: Page, url: string) {
	await page.goto(url);
	await page.waitForLoadState("networkidle");
	return new AxeBuilder({ page }).withTags(WCAG_TAGS).analyze();
}

test.describe("automated accessibility audit (axe-core)", () => {
	for (const route of STATIC_ROUTES) {
		test(`${route} has no WCAG A/AA violations`, async ({ page }) => {
			const results = await analyze(page, route);
			expect(results.violations, formatViolations(results.violations)).toEqual([]);
		});
	}

	test("blog posts have no WCAG A/AA violations", async ({ page }) => {
		const posts = await discoverBlogPosts(page);
		expect(posts.length, "expected at least one blog post to audit").toBeGreaterThan(0);
		for (const post of posts) {
			const results = await analyze(page, post);
			expect(results.violations, `${post}\n${formatViolations(results.violations)}`).toEqual(
				[],
			);
		}
	});
});

test.describe("structural accessibility checks", () => {
	const ALL_ROUTES = STATIC_ROUTES;

	for (const route of ALL_ROUTES) {
		test(`${route} exposes the expected landmarks and headings`, async ({ page }) => {
			await page.goto(route);

			// Exactly one main landmark.
			await expect(page.locator("main")).toHaveCount(1);

			// A single, non-empty top-level heading.
			const h1 = page.locator("h1");
			await expect(h1).toHaveCount(1);
			await expect(h1).not.toBeEmpty();

			// Document language is declared.
			await expect(page.locator("html")).toHaveAttribute("lang", /.+/);
		});
	}

	test("a keyboard-reachable skip link targets the main content", async ({ page }) => {
		await page.goto("/");
		const skip = page.locator('a[href="#main-content"]');
		await expect(skip).toHaveCount(1);
		await expect(page.locator("#main-content")).toHaveCount(1);

		// The skip link is the first thing reachable by Tab and becomes visible
		// when focused.
		await page.keyboard.press("Tab");
		await expect(skip).toBeFocused();
		await expect(skip).toBeVisible();
	});

	test("the archive tag filter communicates its pressed state", async ({ page }) => {
		await page.goto("/blog/");
		const pills = page.locator(".tag-pill");
		const count = await pills.count();
		expect(count).toBeGreaterThan(0);

		// Every pill must report a pressed state to assistive tech.
		for (let i = 0; i < count; i++) {
			await expect(pills.nth(i)).toHaveAttribute("aria-pressed", /true|false/);
		}

		// Clicking a pill moves the pressed state to it.
		const second = pills.nth(1);
		await second.click();
		await expect(second).toHaveAttribute("aria-pressed", "true");
	});
});

function formatViolations(
	violations: Awaited<ReturnType<AxeBuilder["analyze"]>>["violations"],
): string {
	if (violations.length === 0) return "no violations";
	return violations
		.map((v) => {
			const nodes = v.nodes.map((n) => `      - ${n.target.join(" ")}`).join("\n");
			return `  [${v.impact}] ${v.id}: ${v.help}\n    ${v.helpUrl}\n${nodes}`;
		})
		.join("\n\n");
}
