import { test, expect } from "@playwright/test";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import Asciidoctor from "asciidoctor";
import { discoverBlogPosts } from "./helpers";

// These tests pin the AI-disclosure contract: anything that visibly flags a
// passage as AI-generated must also tell the reader what that flag means.

test.describe("AI annotations", () => {
	test("the AI-policy anchor that post disclaimers link to exists on the About page", async ({
		page,
	}) => {
		await page.goto("/about/");
		// Every post's disclaimer links to /about/#ai-usage — that target must exist.
		// The policy prose itself is the author's content and isn't asserted here.
		await expect(page.locator("#ai-usage")).toHaveCount(1);
	});

	test("every post carries the AI-policy disclaimer linking to the policy", async ({
		page,
	}) => {
		const posts = await discoverBlogPosts(page);
		expect(posts.length, "expected at least one post").toBeGreaterThan(0);

		for (const post of posts) {
			await page.goto(post);
			const link = page.locator('a[href="/about/#ai-usage"]');
			await expect(link, `${post} is missing the AI-policy disclaimer`).toHaveCount(1);
			await expect(link).toBeVisible();
		}
	});

	// Content-rendering contract is exercised against a fixture, not real posts,
	// so it doesn't depend on what the author happens to have written. The block's
	// styling/contrast is covered separately by the axe sweep of /about/, whose
	// policy legend contains a real `.ai` block.
	test("the [.ai] role renders a flaggable .ai block (fixture)", () => {
		const adoc = Asciidoctor();
		const fixture = readFileSync(
			fileURLToPath(new URL("./fixtures/ai-block.adoc", import.meta.url)),
			"utf-8",
		);

		// Mirror the site loader's conversion (src/loaders/asciidoc.ts).
		const html = adoc.convert(fixture, { safe: "safe" }) as string;

		// The CSS targets `div.ai`; the role must produce that class.
		expect(html).toContain('class="paragraph ai"');
		// Marking is block-only — no inline span marker exists.
		expect(html).not.toContain('<span class="ai"');
	});
});
