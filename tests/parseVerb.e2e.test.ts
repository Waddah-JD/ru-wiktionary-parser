import { readFile } from "fs/promises";
import path from "path";

import parseVerb from "../src/parseVerb.js";

describe(parseVerb.name, function () {
  test.each<string>(["быть", "использовать", "мочь", "пить", "представить", "уходить"])(
    'should parse "%s" properly',
    async function (verb) {
      const outputFilePath = path.join("assets", "tests", "output", `${verb}.json`);
      const expected = JSON.parse(await readFile(outputFilePath, "utf-8"));

      const actual = await parseVerb(verb);

      expect(actual).toStrictEqual(expected);
    },
  );
});
