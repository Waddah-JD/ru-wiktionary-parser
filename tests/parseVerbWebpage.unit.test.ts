import { readFile } from "fs/promises";
import path from "path";

import { parseVerbWebpage } from "../src/parseVerb.js";
import { ConjugatedVerb } from "../src/types.js";

describe(parseVerbWebpage.name, function () {
  test(`Parse 'использовать'`, async function () {
    const filePath = path.join("assets", "использовать.html");
    const html = await readFile(filePath, "utf-8");

    const expected: ConjugatedVerb = {
      past: {
        masculine: "испо́льзовал",
        feminine: "испо́льзовала",
        neuter: "испо́льзовало",
        plural: "испо́льзовали",
      },
      present: {
        singular1st: "испо́льзую",
        singular2nd: "испо́льзуешь",
        singular3rd: "испо́льзует",
        plural1st: "испо́льзуем",
        plural2nd: "испо́льзуете",
        plural3rd: "испо́льзуют",
      },
      future: {
        singular1st: "испо́льзую",
        singular2nd: "испо́льзуешь",
        singular3rd: "испо́льзует",
        plural1st: "испо́льзуем",
        plural2nd: "испо́льзуете",
        plural3rd: "испо́льзуют",
      },
      imperative: { singular: "испо́льзуй", plural: "испо́льзуйте" },
      participle: { past: "испо́льзовавший", present: "испо́льзующий" },
      adverbialParticiple: { past: ["испо́льзовав", "испо́льзовавши"], present: "испо́льзуя" },
      passiveParticiple: { past: "испо́льзованный", present: "испо́льзуемый" },
    };

    const actual = await parseVerbWebpage(html);

    expect(actual).toStrictEqual(expected);
  });

  test(`Parse 'пить'`, async function () {
    const filePath = path.join("assets", "пить.html");
    const html = await readFile(filePath, "utf-8");

    const expected: ConjugatedVerb = {
      past: {
        masculine: "пи́л",
        feminine: "пила́",
        neuter: "пи́ло",
        plural: "пи́ли",
      },
      present: {
        singular1st: "пью́",
        singular2nd: "пьёшь",
        singular3rd: "пьёт",
        plural1st: "пьём",
        plural2nd: "пьёте",
        plural3rd: "пью́т",
      },
      future: {
        singular1st: "бу́ду пи́ть",
        singular2nd: "бу́дешь пи́ть",
        singular3rd: "бу́дет пи́ть",
        plural1st: "бу́дем пи́ть",
        plural2nd: "бу́дете пи́ть",
        plural3rd: "бу́дут пи́ть",
      },
      imperative: { singular: "пе́й", plural: "пе́йте" },
      participle: { past: "пи́вший", present: "пью́щий" },
      adverbialParticiple: { past: ["пи́в", "пи́вши"], present: null },
      passiveParticiple: { past: "пи́тый", present: null },
    };

    const actual = await parseVerbWebpage(html);

    expect(actual).toStrictEqual(expected);
  });

  test(`Parse 'представить'`, async function () {
    const filePath = path.join("assets", "представить.html");
    const html = await readFile(filePath, "utf-8");

    const expected: ConjugatedVerb = {
      past: {
        masculine: "предста́вил",
        feminine: "предста́вила",
        neuter: "предста́вило",
        plural: "предста́вили",
      },
      present: {
        singular1st: null,
        singular2nd: null,
        singular3rd: null,
        plural1st: null,
        plural2nd: null,
        plural3rd: null,
      },
      future: {
        singular1st: "предста́влю",
        singular2nd: "предста́вишь",
        singular3rd: "предста́вит",
        plural1st: "предста́вим",
        plural2nd: "предста́вите",
        plural3rd: "предста́вят",
      },
      imperative: { singular: "предста́вь", plural: "предста́вьте" },
      participle: { past: "предста́вивший", present: null },
      adverbialParticiple: { past: ["предста́вив", "предста́вивши"], present: null },
      passiveParticiple: { past: "предста́вленный", present: null },
    };

    const actual = await parseVerbWebpage(html);

    expect(actual).toStrictEqual(expected);
  });

  test(`Parse 'уходить'`, async function () {
    const filePath = path.join("assets", "уходить.html");
    const html = await readFile(filePath, "utf-8");

    const expected: ConjugatedVerb = {
      past: {
        masculine: "уходи́л",
        feminine: "уходи́ла",
        neuter: "уходи́ло",
        plural: "уходи́ли",
      },
      present: {
        singular1st: "ухожу́",
        singular2nd: "ухо́дишь",
        singular3rd: "ухо́дит",
        plural1st: "ухо́дим",
        plural2nd: "ухо́дите",
        plural3rd: "ухо́дят",
      },
      future: {
        singular1st: "бу́ду уходи́ть",
        singular2nd: "бу́дешь уходи́ть",
        singular3rd: "бу́дет уходи́ть",
        plural1st: "бу́дем уходи́ть",
        plural2nd: "бу́дете уходи́ть",
        plural3rd: "бу́дут уходи́ть",
      },
      imperative: {
        singular: "уходи́",
        plural: "уходи́те",
      },
      participle: {
        past: "уходи́вший",
        present: "уходя́щий",
      },
      adverbialParticiple: {
        past: ["уходи́в", "уходи́вши"],
        present: "уходя́",
      },
      passiveParticiple: { past: null, present: null },
    };
    const actual = await parseVerbWebpage(html);

    expect(actual).toStrictEqual(expected);
  });
});
