import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { asciidoc } from "./loaders/asciidoc";

const blog = defineCollection({
	loader: asciidoc({ base: "./src/content/blog" }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		heroImage: z.string().optional(),
		tag: z.string().default("Essays"),
		featured: z.boolean().default(false),
		readingTime: z.number().int().positive().optional(),
		pull: z.string().optional(),
	}),
});

export const collections = { blog };
