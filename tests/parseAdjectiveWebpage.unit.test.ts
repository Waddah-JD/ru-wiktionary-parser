import { readFile } from "fs/promises";
import path from "path";

import { parseAdjectiveWebpage } from "../src/parseAdjective.js";

describe(parseAdjectiveWebpage.name, function () {
  test.each<string>(["новый", "ранний"])('should parse adjective: "%s" properly', async function (adjective) {
    const inputFilePath = path.join("assets", "tests", "input", `${adjective}.html`);
    const html = await readFile(inputFilePath, "utf-8");

    const outputFilePath = path.join("assets", "tests", "output", `${adjective}.json`);
    const expected = JSON.parse(await readFile(outputFilePath, "utf-8"));

    const actual = await parseAdjectiveWebpage(html);

    expect(actual).toStrictEqual(expected);
  });
});
