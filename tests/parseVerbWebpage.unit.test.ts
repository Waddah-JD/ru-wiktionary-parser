import { readFile } from "fs/promises";
import path from "path";

import { parseVerbWebpage } from "../src/parseVerb.js";
import { ConjugatedVerb } from "../src/types.js";

describe(parseVerbWebpage.name, function () {
  test.each<string>(["использовать", "пить", "представить", "уходить"])(
    'should parse "%s" properly',
    async function (verb) {
      const inputFilePath = path.join("assets", "input", `${verb}.html`);
      const html = await readFile(inputFilePath, "utf-8");

      const outputFilePath = path.join("assets", "output", `${verb}.json`);
      const expected: ConjugatedVerb = JSON.parse(await readFile(outputFilePath, "utf-8"));

      const actual = await parseVerbWebpage(html);

      expect(actual).toStrictEqual(expected);
    },
  );
});
