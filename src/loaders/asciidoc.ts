import fs from "node:fs/promises";
import path from "node:path";
import fg from "fast-glob";
import matter from "gray-matter";
import Asciidoctor from "asciidoctor";
import type { Loader } from "astro/loaders";

interface Options {
	base: string;
	pattern?: string;
}

export function asciidoc({ base, pattern = "**/*.adoc" }: Options): Loader {
	const root = path.resolve(base);
	const adoc = Asciidoctor();

	async function loadEntry(absPath: string, ctx: Parameters<Loader["load"]>[0]) {
		const raw = await fs.readFile(absPath, "utf-8");
		const { data, content } = matter(raw);
		const html = adoc.convert(content, { safe: "safe" }) as string;
		const id = path.basename(absPath, ".adoc");
		const parsed = await ctx.parseData({ id, data });
		ctx.store.set({
			id,
			data: parsed,
			body: content,
			rendered: { html },
			digest: ctx.generateDigest(raw),
			filePath: path
				.relative(process.cwd(), absPath)
				.replace(/\\/g, "/"),
		});
	}

	return {
		name: "asciidoc",
		load: async (ctx) => {
			const files = await fg(pattern, { cwd: root, absolute: true });
			ctx.store.clear();
			for (const file of files) {
				await loadEntry(file, ctx);
			}

			ctx.watcher?.on("change", async (file) => {
				if (file.endsWith(".adoc") && file.startsWith(root)) {
					await loadEntry(file, ctx);
				}
			});
			ctx.watcher?.on("add", async (file) => {
				if (file.endsWith(".adoc") && file.startsWith(root)) {
					await loadEntry(file, ctx);
				}
			});
			ctx.watcher?.on("unlink", (file) => {
				if (file.endsWith(".adoc") && file.startsWith(root)) {
					const id = path.basename(file, ".adoc");
					ctx.store.delete(id);
				}
			});
		},
	};
}
