import { JSDOM } from "jsdom";

import { ConjugatedVerb } from "./types.js";
import { getRussianFutureTenseFromImperfectiveForm } from "./utils/ru.js";
import getWebpageHtmlContent from "./utils/wiktionary.js";

async function parseVerb(verb: string): Promise<ConjugatedVerb> {
  const html = await getWebpageHtmlContent(verb);

  return parseVerbWebpage(html);
}

export default parseVerb;

export async function parseVerbWebpage(html: string): Promise<ConjugatedVerb> {
  const result: ConjugatedVerb = {
    past: { masculine: null, feminine: null, neuter: null, plural: null },
    present: {
      singular1st: null,
      singular2nd: null,
      singular3rd: null,
      plural1st: null,
      plural2nd: null,
      plural3rd: null,
    },
    future: {
      singular1st: null,
      singular2nd: null,
      singular3rd: null,
      plural1st: null,
      plural2nd: null,
      plural3rd: null,
    },
    imperative: { singular: null, plural: null },
    participle: { past: null, present: null },
    adverbialParticiple: { past: null, present: null },
    passiveParticiple: { past: null, present: null },
  };

  let hasPresentConjugation = false;
  let hasFutureConjugation = false;

  const document = new JSDOM(html).window.document;

  const table = document.querySelector(".morfotable.ru");
  if (!table) return result;

  const tableHeaderColumn2 = table.querySelector("tr th:nth-of-type(2)")?.textContent;
  if (!tableHeaderColumn2) return result;
  if (tableHeaderColumn2 === "наст.") hasPresentConjugation = true;
  else if (tableHeaderColumn2 === "будущ.") hasFutureConjugation = true;
  else if (tableHeaderColumn2 === "наст./будущ.") {
    hasPresentConjugation = true;
    hasFutureConjugation = true;
  } else {
    // TODO
  }

  const presentOrFuture: ConjugatedVerb["present"] = {
    singular1st: null,
    singular2nd: null,
    singular3rd: null,
    plural1st: null,
    plural2nd: null,
    plural3rd: null,
  };

  const rows = Array.from(table.querySelectorAll("tr"));
  for (const row of rows) {
    const col0 = row.querySelector("th:nth-of-type(1)");
    if (col0?.textContent === "Я") {
      presentOrFuture.singular1st = row.querySelector("td:nth-of-type(1)")?.textContent || null;
    }
    if (col0?.textContent === "Ты") {
      presentOrFuture.singular2nd = row.querySelector("td:nth-of-type(1)")?.textContent || null;
      result.imperative.singular = row.querySelector("td:nth-of-type(3)")?.textContent || null;
    }
    if (col0?.textContent === "ОнОнаОно") {
      presentOrFuture.singular3rd = row.querySelector("td:nth-of-type(1)")?.textContent || null;

      const pastCol = row.querySelector("td:nth-of-type(2)");
      const pastColChildNodes = pastCol?.childNodes;

      result.past.masculine = pastColChildNodes?.item(0)?.textContent || null;
      result.past.feminine = pastColChildNodes?.item(2)?.textContent || null;
      result.past.neuter = pastColChildNodes?.item(4)?.textContent || null;
    }
    if (col0?.textContent === "Мы") {
      presentOrFuture.plural1st = row.querySelector("td:nth-of-type(1)")?.textContent || null;
    }
    if (col0?.textContent === "Вы") {
      presentOrFuture.plural2nd = row.querySelector("td:nth-of-type(1)")?.textContent || null;
      result.imperative.plural = row.querySelector("td:nth-of-type(3)")?.textContent || null;

      result.past.plural = row.querySelector("td:nth-of-type(2)")?.textContent || null;
    }
    if (col0?.textContent === "Они") {
      presentOrFuture.plural3rd = row.querySelector("td:nth-of-type(1)")?.textContent || null;
    }
    if (col0?.textContent === "Пр. действ. наст.") {
      result.participle.present = row.querySelector("td:nth-of-type(1)")?.textContent || null;
    }
    if (col0?.textContent === "Пр. действ. прош.") {
      result.participle.past = row.querySelector("td:nth-of-type(1)")?.textContent || null;
    }
    if (col0?.textContent === "Деепр. наст.") {
      const value = row.querySelector("td:nth-of-type(1)")?.textContent || null;
      if (value === "—") result.adverbialParticiple.present = null;
      else result.adverbialParticiple.present = value;
    }
    if (col0?.textContent === "Деепр. прош.") {
      result.adverbialParticiple.past =
        row
          .querySelector("td:nth-of-type(1)")
          ?.textContent?.split(",")
          ?.map((it) => it.trim()) || null;
    }
    if (col0?.textContent === "Пр. страд. наст.") {
      result.passiveParticiple.present = row.querySelector("td:nth-of-type(1)")?.textContent || null;
    }
    if (col0?.textContent === "Пр. страд. прош.") {
      result.passiveParticiple.past = row.querySelector("td:nth-of-type(1)")?.textContent || null;
    }
    if (col0?.textContent === "Будущее") {
      const futureCell = row.querySelector("td:nth-of-type(1)")?.textContent?.trim() || null;
      const SEPARATOR = "буду/будешь… ";
      if (futureCell?.startsWith(SEPARATOR)) {
        const infinitive = futureCell.split(SEPARATOR)?.[1];
        if (infinitive) result.future = getRussianFutureTenseFromImperfectiveForm(infinitive);
      }
    }
  }

  if (hasPresentConjugation) result.present = presentOrFuture;
  if (hasFutureConjugation) result.future = presentOrFuture;

  return result;
}
