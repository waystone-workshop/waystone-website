import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
test("website output is independent of Phoenix and bundles its design assets", async () => {
  const page=await readFile(new URL("../dist/index.html",import.meta.url),"utf8");
  assert.match(page,/id="registration-placeholder"/);
  assert.match(page,/design-system\/styles\/tokens.css/);
  assert.doesNotMatch(page,/<Layouts|<\.icon|~p|@installer_ready/);
  assert.match(await readFile(new URL("../dist/design-system/styles/tokens.css",import.meta.url),"utf8"),/--ww-accent:/);
});
