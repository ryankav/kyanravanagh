# Generating prose

For whole passages **the author did not originally write** — text you generate and
the author keeps (a summary, intro, or paragraph) rather than reworking into their own
words. For edits to the author's own writing, see
[`editing-my-writing.md`](editing-my-writing.md).

## Mark by origin, block-only

Flag a generated block with the AsciiDoc role — `[.ai]` on its own line above it:

```asciidoc
[.ai]
A whole paragraph the author did not originally write.
```

→ `<div class="… ai">`, labelled "Written by generative AI".

- **Origin, not last touch.** A block is marked because the author didn't write it.
  It **stays marked even if later revised**, by the author or by AI.
- **No inline marking.** Don't flag phrases or clauses. Rephrasing a sentence the
  author wrote is editing, not generation — see
  [`editing-my-writing.md`](editing-my-writing.md). (There is no `span.ai`.)
- **No extra disclaimers.** Every post already links to the AI policy automatically.

## Defaults (until "Author's specifics" overrides them)

- Keep generated text concise and plain; sentence-case headings; British spelling.
- Don't generate factual claims about the author's life, opinions, or work — flag
  those as placeholders.

## Author's specifics

> _Add overrides/extensions here: what may/may not be generated, target length, voice
> notes for generated text._

_(none yet)_
