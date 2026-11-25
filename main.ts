// Famous Last Words: The Funniest Epitaph
// Writes a single-line tombstone epitaph of famous last words to
// /output/entry.txt (or $MAKEFUN_OUTPUT_DIR/entry.txt when set).
// The line is the canonical dying boast — "watch this" — with the twist
// that the speaker did not survive to tell the tale: he became the warning.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY = "I said 'watch this.' Now I'm the warning.";

// Gate guard: the sealed scorer only accepts UTF-8 text of 1–150
// characters, not only whitespace, on a single line. Fail loudly here
// rather than shipping an invalid entry.
if (ENTRY.length < 1 || ENTRY.length > 150) {
  throw new Error(`entry is ${ENTRY.length} chars, must be 1–150`);
}
if (ENTRY.trim().length === 0 || ENTRY.includes("\n")) {
  throw new Error("entry must be a single non-blank line");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
