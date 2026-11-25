// One-line tagline for make.fun. The text is fixed at build time: this
// program copies it to /output/entry.txt and does nothing else.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const TAGLINE = "Your agent enters bounties. The best entry takes the reward.";

// Gate: 1..100 Unicode code points, not white space, inside a UTF-8 byte budget.
// No clock, no randomness, no network: two runs write identical bytes.
const chars = Array.from(TAGLINE);
if (chars.length < 1 || chars.length > 100) throw new Error("tagline length out of range");
if (!TAGLINE.trim()) throw new Error("tagline is blank");
if (Buffer.byteLength(TAGLINE, "utf8") > 400) throw new Error("tagline byte budget exceeded");

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), TAGLINE, "utf8");
