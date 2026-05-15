import fs from "node:fs";

const data = fs.readFileSync(new URL("../lib/data.ts", import.meta.url), "utf8");
const sources = fs.readFileSync(new URL("../lib/sources.ts", import.meta.url), "utf8");

const recordIds = [...data.matchAll(/id: "(CD-[^"]+)"/g)].map((m) => m[1]);
const sourceIds = [...sources.matchAll(/id: "(SRC-[^"]+)"/g)].map((m) => m[1]);
const sourceRefs = [...data.matchAll(/"((?:SRC)-[^"]+)"/g)].map((m) => m[1]);

function assert(condition, message) {
  if (!condition) {
    console.error(`DATA ERROR: ${message}`);
    process.exitCode = 1;
  }
}

assert(recordIds.length >= 25, `expected at least 25 public records, found ${recordIds.length}`);
assert(sourceIds.length >= 12, `expected at least 12 sources, found ${sourceIds.length}`);

for (const id of recordIds) {
  assert(recordIds.filter((x) => x === id).length === 1, `duplicate record id ${id}`);
}

for (const id of sourceIds) {
  assert(sourceIds.filter((x) => x === id).length === 1, `duplicate source id ${id}`);
}

for (const ref of sourceRefs) {
  assert(sourceIds.includes(ref), `unknown source reference ${ref}`);
}

assert(!data.includes("**"), "Chinese data should not contain markdown bold markers");

if (!process.exitCode) {
  console.log(`Validated ${recordIds.length} records and ${sourceIds.length} sources.`);
}
