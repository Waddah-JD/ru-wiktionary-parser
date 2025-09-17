import { readFile } from "fs/promises";
import path from "path";

import parseAdjective from "../src/parseAdjective.js";
import { VerbConjugation } from "../src/types.js";

describe(parseAdjective.name, function () {
  test.each<string>(["новый", "ранний"])('should parse adjective: "%s" properly', async function (adjective) {
    const outputFilePath = path.join("assets", "output", `${adjective}.json`);
    const expected: VerbConjugation = JSON.parse(await readFile(outputFilePath, "utf-8"));

    const actual = await parseAdjective(adjective);

    expect(actual).toStrictEqual(expected);
  });
});
