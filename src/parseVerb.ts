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
    participles: {
      active: { past: null, present: null },
      passive: { past: null, present: null },
      adverbial: { past: null, present: null },
    },
  };

  const document = new JSDOM(html).window.document;

  const table = document.querySelector("table.inflection.inflection-ru.inflection-verb.inflection-table");
  if (!table) return result;

  const infinitive = getFirstElementTextFromTableCell(".Cyrl.form-of.lang-ru.inf-form-of");
  let futureConjugations: ConjugatedVerb["future"] | null = null;
  if (infinitive) {
    futureConjugations = getRussianFutureTenseFromImperfectiveForm(infinitive);
  }

  result.participles.active.present = getFirstElementTextFromTableCell(".pres\\|act\\|part-form-of");
  result.participles.active.past = getFirstElementTextFromTableCell(".past\\|act\\|part-form-of");

  result.participles.passive.present = getFirstElementTextFromTableCell(".pres\\|pass\\|part-form-of");
  result.participles.passive.past = getFirstElementTextFromTableCell(".past\\|pass\\|part-form-of");

  result.participles.adverbial.present = getFirstElementTextFromTableCell(".pres\\|adv\\|part-form-of");
  result.participles.adverbial.past = getPastTenseAdverbialParticiples();

  result.present.singular1st = getFirstElementTextFromTableCell(".\\31\\|s\\|pres\\|ind-form-of");
  result.present.singular2nd = getFirstElementTextFromTableCell(".\\32\\|s\\|pres\\|ind-form-of");
  result.present.singular3rd = getFirstElementTextFromTableCell(".\\33\\|s\\|pres\\|ind-form-of");
  result.present.plural1st = getFirstElementTextFromTableCell(".\\31\\|p\\|pres\\|ind-form-of");
  result.present.plural2nd = getFirstElementTextFromTableCell(".\\32\\|p\\|pres\\|ind-form-of");
  result.present.plural3rd = getFirstElementTextFromTableCell(".\\33\\|p\\|pres\\|ind-form-of");

  // if future tense is not in the table then it's imperfective, so we use the fallback
  result.future.singular1st =
    getFirstElementTextFromTableCell(".\\31\\|s\\|fut\\|ind-form-of") || futureConjugations?.singular1st || null;
  result.future.singular2nd =
    getFirstElementTextFromTableCell(".\\32\\|s\\|fut\\|ind-form-of") || futureConjugations?.singular2nd || null;
  result.future.singular3rd =
    getFirstElementTextFromTableCell(".\\33\\|s\\|fut\\|ind-form-of") || futureConjugations?.singular3rd || null;
  result.future.plural1st =
    getFirstElementTextFromTableCell(".\\31\\|p\\|fut\\|ind-form-of") || futureConjugations?.plural1st || null;
  result.future.plural2nd =
    getFirstElementTextFromTableCell(".\\32\\|p\\|fut\\|ind-form-of") || futureConjugations?.plural2nd || null;
  result.future.plural3rd =
    getFirstElementTextFromTableCell(".\\33\\|p\\|fut\\|ind-form-of") || futureConjugations?.plural3rd || null;

  result.imperative.singular = getFirstElementTextFromTableCell(".\\32\\|s\\|imp-form-of");
  result.imperative.plural = getFirstElementTextFromTableCell(".\\32\\|p\\|imp-form-of");

  result.past.masculine = getFirstElementTextFromTableCell(".m\\|s\\|past\\|ind-form-of");
  result.past.feminine = getFirstElementTextFromTableCell(".f\\|s\\|past\\|ind-form-of");
  result.past.neuter = getFirstElementTextFromTableCell(".n\\|s\\|past\\|ind-form-of");
  result.past.plural = getFirstElementTextFromTableCell(".p\\|past\\|ind-form-of");

  return result;

  function getFirstElementTextFromTableCell(selector: string): string | null {
    return table?.querySelector(selector)?.childNodes?.item(0)?.textContent || null;
  }

  function getPastTenseAdverbialParticiples(): string[] {
    return Array.from(table?.querySelectorAll(".past\\|adv\\|part-form-of") || []).map((it) => it.textContent);
  }
}
