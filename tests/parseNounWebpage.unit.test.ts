import { readFile } from "fs/promises";
import path from "path";

import { parseNounWebpage } from "../src/parseNoun.js";
import { NounDeclension } from "../src/types.js";

describe(parseNounWebpage.name, function () {
  test.each<string>(["год", "деньги", "земля", "тишина", "чай", "человек"])(
    'should parse "%s" properly',
    async function (noun) {
      const inputFilePath = path.join("assets", "tests", "input", `${noun}.html`);
      const html = await readFile(inputFilePath, "utf-8");

      const outputFilePath = path.join("assets", "tests", "output", `${noun}.json`);
      const expected: NounDeclension = JSON.parse(await readFile(outputFilePath, "utf-8"));

      const actual = await parseNounWebpage(html);

      expect(actual).toStrictEqual(expected);
    },
  );
});
