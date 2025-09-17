import { JSDOM } from "jsdom";

import { AdjectiveDeclension } from "./types.js";
import getWebpageHtmlContent from "./utils/wiktionary.js";

async function parseAdjective(verb: string): Promise<AdjectiveDeclension> {
  const html = await getWebpageHtmlContent(verb);

  return parseAdjectiveWebpage(html);
}

export default parseAdjective;

export async function parseAdjectiveWebpage(html: string): Promise<AdjectiveDeclension> {
  const result: AdjectiveDeclension = {
    nominative: { masculine: null, feminine: null, neuter: null, plural: null },
    genitive: { masculine: null, feminine: null, neuter: null, plural: null },
    dative: { masculine: null, feminine: null, neuter: null, plural: null },
    accusative: {
      masculine: { animate: null, inanimate: null },
      feminine: null,
      neuter: null,
      plural: { animate: null, inanimate: null },
    },
    instrumental: { masculine: null, feminine: [], neuter: null, plural: null },
    prepositional: { masculine: null, feminine: null, neuter: null, plural: null },
  };

  const document = new JSDOM(html).window.document;

  result.nominative.masculine = getFirstElementTextFromTableCell(".lang-ru.nom\\|m\\|s-form-of");
  result.nominative.neuter = getFirstElementTextFromTableCell(".lang-ru.nom\\|n\\|s-form-of");
  result.nominative.feminine = getFirstElementTextFromTableCell(".lang-ru.nom\\|f\\|s-form-of");
  result.nominative.plural = getFirstElementTextFromTableCell(".lang-ru.nom\\|p-form-of");

  result.genitive.masculine = getFirstElementTextFromTableCell(".lang-ru.gen\\|m\\/\\/n\\|s-form-of");
  result.genitive.neuter = result.genitive.masculine;
  result.genitive.feminine = getFirstElementTextFromTableCell(".lang-ru.gen\\|f\\|s-form-of");
  result.genitive.plural = getFirstElementTextFromTableCell(".lang-ru.gen\\|p-form-of");

  result.dative.masculine = getFirstElementTextFromTableCell(".lang-ru.dat\\|m\\/\\/n\\|s-form-of");
  result.dative.neuter = result.dative.masculine;
  result.dative.feminine = getFirstElementTextFromTableCell(".lang-ru.dat\\|f\\|s-form-of");
  result.dative.plural = getFirstElementTextFromTableCell(".lang-ru.dat\\|p-form-of");

  result.accusative.masculine.animate = getFirstElementTextFromTableCell(".lang-ru.an\\|acc\\|m\\|s-form-of");
  result.accusative.masculine.inanimate = getFirstElementTextFromTableCell(".lang-ru.in\\|acc\\|m\\|s-form-of");
  result.accusative.neuter = getFirstElementTextFromTableCell(".lang-ru.acc\\|n\\|s-form-of");
  result.accusative.feminine = getFirstElementTextFromTableCell(".lang-ru.acc\\|f\\|s-form-of");
  result.accusative.plural.animate = getFirstElementTextFromTableCell(".lang-ru.an\\|acc\\|p-form-of");
  result.accusative.plural.inanimate = getFirstElementTextFromTableCell(".lang-ru.in\\|acc\\|p-form-of");

  result.instrumental.masculine = getFirstElementTextFromTableCell(".lang-ru.ins\\|m\\/\\/n\\|s-form-of");
  result.instrumental.neuter = result.instrumental.masculine;
  result.instrumental.feminine = getInstrumentalFeminineValues();
  result.instrumental.plural = getFirstElementTextFromTableCell(".lang-ru.ins\\|p-form-of");

  result.prepositional.masculine = getFirstElementTextFromTableCell(".lang-ru.pre\\|m\\/\\/n\\|s-form-of");
  result.prepositional.neuter = result.prepositional.masculine;
  result.prepositional.feminine = getFirstElementTextFromTableCell(".lang-ru.pre\\|f\\|s-form-of");
  result.prepositional.plural = getFirstElementTextFromTableCell(".lang-ru.pre\\|p-form-of");

  return result;

  function getFirstElementTextFromTableCell(selector: string): string | null {
    return document?.querySelector(selector)?.childNodes?.item(0)?.textContent || null;
  }

  function getInstrumentalFeminineValues(): AdjectiveDeclension["instrumental"]["feminine"] {
    const cell = document?.querySelectorAll(".lang-ru.ins\\|f\\|s-form-of");
    return [cell.item(0)?.textContent, cell.item(1)?.textContent].filter(Boolean);
  }
}
