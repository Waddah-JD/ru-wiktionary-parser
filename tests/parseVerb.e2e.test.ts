import { readFile } from "fs/promises";
import path from "path";

import parseVerb from "../src/parseVerb.js";
import { ConjugatedVerb } from "../src/types.js";

describe(parseVerb.name, function () {
  test.each<string>(["использовать", "пить", "представить", "уходить"])(
    'should parse "%s" properly',
    async function (verb) {
      const outputFilePath = path.join("assets", "output", `${verb}.json`);
      const expected: ConjugatedVerb = JSON.parse(await readFile(outputFilePath, "utf-8"));

      const actual = await parseVerb(verb);

      expect(actual).toStrictEqual(expected);
    },
  );
});
