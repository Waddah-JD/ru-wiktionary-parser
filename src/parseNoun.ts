import { JSDOM } from "jsdom";

import { Noun } from "./types.js";
import { getAccentedWord, getWebpageHtmlContent } from "./utils/wiktionary.js";

async function parseNoun(noun: string): Promise<Noun> {
  const html = await getWebpageHtmlContent(noun);

  return parseNounWebpage(html);
}

export default parseNoun;

export async function parseNounWebpage(html: string): Promise<Noun> {
  const document = new JSDOM(html).window.document;

  const result: Noun = {
    accented: getAccentedWord(document),
    declension: {
      nominative: { singular: null, plural: null },
      genitive: { singular: null, plural: null },
      dative: { singular: null, plural: null },
      accusative: { singular: null, plural: null },
      instrumental: { singular: null, plural: null },
      prepositional: { singular: null, plural: null },
      locative: null,
      partitive: null,
    },
  };

  result.declension.nominative.singular = getFirstElementTextFromTableCell(".lang-ru.nom\\|s-form-of");
  result.declension.nominative.plural = getFirstElementTextFromTableCell(".lang-ru.nom\\|p-form-of");
  result.declension.genitive.singular = getFirstElementTextFromTableCell(".lang-ru.gen\\|s-form-of");
  result.declension.genitive.plural = getFirstElementTextFromTableCell(".lang-ru.gen\\|p-form-of");
  result.declension.dative.singular = getFirstElementTextFromTableCell(".lang-ru.dat\\|s-form-of");
  result.declension.dative.plural = getFirstElementTextFromTableCell(".lang-ru.dat\\|p-form-of");
  result.declension.accusative.singular = getFirstElementTextFromTableCell(".lang-ru.acc\\|s-form-of");
  result.declension.accusative.plural = getFirstElementTextFromTableCell(".lang-ru.acc\\|p-form-of");
  result.declension.instrumental.singular = getFirstElementTextFromTableCell(".lang-ru.ins\\|s-form-of");
  result.declension.instrumental.plural = getFirstElementTextFromTableCell(".lang-ru.ins\\|p-form-of");
  result.declension.prepositional.singular = getFirstElementTextFromTableCell(".lang-ru.pre\\|s-form-of");
  result.declension.prepositional.plural = getFirstElementTextFromTableCell(".lang-ru.pre\\|p-form-of");
  result.declension.partitive = getFirstElementTextFromTableCell(".lang-ru.par\\|s-form-of");
  result.declension.locative = document?.querySelector(".lang-ru.loc\\|s-form-of")?.textContent?.trim() || null;

  /// for nous that can be only in plural form (example: деньги)
  const nominative = getFirstElementTextFromTableCell(".lang-ru.nom-form-of");
  if (nominative) result.declension.nominative.plural = nominative;
  const genitive = getFirstElementTextFromTableCell(".lang-ru.gen-form-of");
  if (genitive) result.declension.genitive.plural = genitive;
  const dative = getFirstElementTextFromTableCell(".lang-ru.dat-form-of");
  if (dative) result.declension.dative.plural = dative;
  const accusative = getFirstElementTextFromTableCell(".lang-ru.acc-form-of");
  if (accusative) result.declension.accusative.plural = accusative;
  const instrumental = getFirstElementTextFromTableCell(".lang-ru.ins-form-of");
  if (instrumental) result.declension.instrumental.plural = instrumental;
  const prepositional = getFirstElementTextFromTableCell(".lang-ru.pre-form-of");
  if (prepositional) result.declension.prepositional.plural = prepositional;
  const partitive = getFirstElementTextFromTableCell(".lang-ru.par-form-of");
  if (partitive) result.declension.partitive = partitive;
  const locative = getFirstElementTextFromTableCell(".lang-ru.loc-form-of");
  if (locative) result.declension.locative = locative;

  return result;

  function getFirstElementTextFromTableCell(selector: string): string | null {
    return document?.querySelector(selector)?.childNodes?.item(0)?.textContent || null;
  }
}
