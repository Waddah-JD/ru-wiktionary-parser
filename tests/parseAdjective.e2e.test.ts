import { readFile } from "fs/promises";
import path from "path";

import parseAdjective from "../src/parseAdjective.js";
import { ConjugatedVerb } from "../src/types.js";

describe(parseAdjective.name, function () {
  test.each<string>(["новый", "ранний"])('should parse adjective: "%s" properly', async function (adjective) {
    const outputFilePath = path.join("assets", "output", `${adjective}.json`);
    const expected: ConjugatedVerb = JSON.parse(await readFile(outputFilePath, "utf-8"));

    const actual = await parseAdjective(adjective);

    expect(actual).toStrictEqual(expected);
  });
});
