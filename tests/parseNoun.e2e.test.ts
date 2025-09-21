import { readFile } from "fs/promises";
import path from "path";

import { UnparsableWordError } from "../src/errors.js";
import parseNoun from "../src/parseNoun.js";

describe(parseNoun.name, function () {
  test.each<string>(["год", "деньги", "земля", "тишина", "чай", "человек"])(
    'should parse "%s" properly',
    async function (noun) {
      const outputFilePath = path.join("assets", "tests", "output", `${noun}.json`);
      const expected = JSON.parse(await readFile(outputFilePath, "utf-8"));

      const actual = await parseNoun(noun);

      expect(actual).toStrictEqual(expected);
    },
  );

  it("should throw an error if couldn't parse word", async function () {
    await expect(parseNoun("ощибка")).rejects.toThrow(UnparsableWordError);
  });
});
