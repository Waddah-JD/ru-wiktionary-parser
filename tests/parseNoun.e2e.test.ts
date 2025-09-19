import { readFile } from "fs/promises";
import path from "path";

import parseNoun from "../src/parseNoun.js";
import { NounDeclension } from "../src/types.js";

describe(parseNoun.name, function () {
  test.each<string>(["год", "деньги", "земля", "тишина", "чай", "человек"])(
    'should parse "%s" properly',
    async function (noun) {
      const outputFilePath = path.join("assets", "tests", "output", `${noun}.json`);
      const expected: NounDeclension = JSON.parse(await readFile(outputFilePath, "utf-8"));

      const actual = await parseNoun(noun);

      expect(actual).toStrictEqual(expected);
    },
  );
});
