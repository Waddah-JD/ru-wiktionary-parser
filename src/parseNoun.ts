import { JSDOM } from "jsdom";

import { NounDeclension } from "./types.js";
import getWebpageHtmlContent from "./utils/wiktionary.js";

async function parseNoun(noun: string): Promise<NounDeclension> {
  const html = await getWebpageHtmlContent(noun);

  return parseNounWebpage(html);
}

export default parseNoun;

export async function parseNounWebpage(html: string): Promise<NounDeclension> {
  const result: NounDeclension = {
    nominative: { singular: null, plural: null },
    genitive: { singular: null, plural: null },
    dative: { singular: null, plural: null },
    accusative: { singular: null, plural: null },
    instrumental: { singular: null, plural: null },
    prepositional: { singular: null, plural: null },
    locative: null,
    partitive: null,
  };

  const document = new JSDOM(html).window.document;

  result.nominative.singular = getFirstElementTextFromTableCell(".lang-ru.nom\\|s-form-of");
  result.nominative.plural = getFirstElementTextFromTableCell(".lang-ru.nom\\|p-form-of");
  result.genitive.singular = getFirstElementTextFromTableCell(".lang-ru.gen\\|s-form-of");
  result.genitive.plural = getFirstElementTextFromTableCell(".lang-ru.gen\\|p-form-of");
  result.dative.singular = getFirstElementTextFromTableCell(".lang-ru.dat\\|s-form-of");
  result.dative.plural = getFirstElementTextFromTableCell(".lang-ru.dat\\|p-form-of");
  result.accusative.singular = getFirstElementTextFromTableCell(".lang-ru.acc\\|s-form-of");
  result.accusative.plural = getFirstElementTextFromTableCell(".lang-ru.acc\\|p-form-of");
  result.instrumental.singular = getFirstElementTextFromTableCell(".lang-ru.ins\\|s-form-of");
  result.instrumental.plural = getFirstElementTextFromTableCell(".lang-ru.ins\\|p-form-of");
  result.prepositional.singular = getFirstElementTextFromTableCell(".lang-ru.pre\\|s-form-of");
  result.prepositional.plural = getFirstElementTextFromTableCell(".lang-ru.pre\\|p-form-of");
  result.partitive = getFirstElementTextFromTableCell(".lang-ru.par\\|s-form-of");
  result.locative = document?.querySelector(".lang-ru.loc\\|s-form-of")?.textContent?.trim() || null;

  /// for nous that can be only in plural form (example: деньги)
  const nominative = getFirstElementTextFromTableCell(".lang-ru.nom-form-of");
  if (nominative) result.nominative.plural = nominative;
  const genitive = getFirstElementTextFromTableCell(".lang-ru.gen-form-of");
  if (genitive) result.genitive.plural = genitive;
  const dative = getFirstElementTextFromTableCell(".lang-ru.dat-form-of");
  if (dative) result.dative.plural = dative;
  const accusative = getFirstElementTextFromTableCell(".lang-ru.acc-form-of");
  if (accusative) result.accusative.plural = accusative;
  const instrumental = getFirstElementTextFromTableCell(".lang-ru.ins-form-of");
  if (instrumental) result.instrumental.plural = instrumental;
  const prepositional = getFirstElementTextFromTableCell(".lang-ru.pre-form-of");
  if (prepositional) result.prepositional.plural = prepositional;
  const partitive = getFirstElementTextFromTableCell(".lang-ru.par-form-of");
  if (partitive) result.partitive = partitive;
  const locative = getFirstElementTextFromTableCell(".lang-ru.loc-form-of");
  if (locative) result.locative = locative;

  return result;

  function getFirstElementTextFromTableCell(selector: string): string | null {
    return document?.querySelector(selector)?.childNodes?.item(0)?.textContent || null;
  }
}
