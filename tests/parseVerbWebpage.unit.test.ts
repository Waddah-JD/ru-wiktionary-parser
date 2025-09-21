import { readFile } from "fs/promises";
import path from "path";

import { parseVerbWebpage } from "../src/parseVerb.js";

describe(parseVerbWebpage.name, function () {
  test.each<string>(["быть", "использовать", "мочь", "пить", "представить", "уходить"])(
    'should parse "%s" properly',
    async function (verb) {
      const inputFilePath = path.join("assets", "tests", "input", `${verb}.html`);
      const html = await readFile(inputFilePath, "utf-8");

      const outputFilePath = path.join("assets", "tests", "output", `${verb}.json`);
      const expected = JSON.parse(await readFile(outputFilePath, "utf-8"));

      const actual = await parseVerbWebpage(html);

      expect(actual).toStrictEqual(expected);
    },
  );
});
