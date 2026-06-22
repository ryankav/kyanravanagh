import type { Page } from "@playwright/test";

/**
 * Discover every blog post URL from the archive page so tests cover new posts
 * automatically without being edited.
 */
export async function discoverBlogPosts(page: Page): Promise<string[]> {
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
