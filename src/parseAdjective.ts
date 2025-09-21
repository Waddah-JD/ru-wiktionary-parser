import { JSDOM } from "jsdom";

import { UnparsableWordError } from "./errors.js";
import { Adjective } from "./types.js";
import { getAccentedWord, getWebpageHtmlContent } from "./utils/wiktionary.js";

async function parseAdjective(adjective: string): Promise<Adjective> {
  try {
    const html = await getWebpageHtmlContent(adjective);
    return parseAdjectiveWebpage(html);
  } catch {
    throw new UnparsableWordError(adjective);
  }
}

export default parseAdjective;

export async function parseAdjectiveWebpage(html: string): Promise<Adjective> {
  const document = new JSDOM(html).window.document;

  const result: Adjective = {
    accented: getAccentedWord(document),
    declension: {
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
    },
  };

  result.declension.nominative.masculine = getFirstElementTextFromTableCell(".lang-ru.nom\\|m\\|s-form-of");
  result.declension.nominative.neuter = getFirstElementTextFromTableCell(".lang-ru.nom\\|n\\|s-form-of");
  result.declension.nominative.feminine = getFirstElementTextFromTableCell(".lang-ru.nom\\|f\\|s-form-of");
  result.declension.nominative.plural = getFirstElementTextFromTableCell(".lang-ru.nom\\|p-form-of");

  result.declension.genitive.masculine = getFirstElementTextFromTableCell(".lang-ru.gen\\|m\\/\\/n\\|s-form-of");
  result.declension.genitive.neuter = result.declension.genitive.masculine;
  result.declension.genitive.feminine = getFirstElementTextFromTableCell(".lang-ru.gen\\|f\\|s-form-of");
  result.declension.genitive.plural = getFirstElementTextFromTableCell(".lang-ru.gen\\|p-form-of");

  result.declension.dative.masculine = getFirstElementTextFromTableCell(".lang-ru.dat\\|m\\/\\/n\\|s-form-of");
  result.declension.dative.neuter = result.declension.dative.masculine;
  result.declension.dative.feminine = getFirstElementTextFromTableCell(".lang-ru.dat\\|f\\|s-form-of");
  result.declension.dative.plural = getFirstElementTextFromTableCell(".lang-ru.dat\\|p-form-of");

  result.declension.accusative.masculine.animate = getFirstElementTextFromTableCell(
    ".lang-ru.an\\|acc\\|m\\|s-form-of",
  );
  result.declension.accusative.masculine.inanimate = getFirstElementTextFromTableCell(
    ".lang-ru.in\\|acc\\|m\\|s-form-of",
  );
  result.declension.accusative.neuter = getFirstElementTextFromTableCell(".lang-ru.acc\\|n\\|s-form-of");
  result.declension.accusative.feminine = getFirstElementTextFromTableCell(".lang-ru.acc\\|f\\|s-form-of");
  result.declension.accusative.plural.animate = getFirstElementTextFromTableCell(".lang-ru.an\\|acc\\|p-form-of");
  result.declension.accusative.plural.inanimate = getFirstElementTextFromTableCell(".lang-ru.in\\|acc\\|p-form-of");

  result.declension.instrumental.masculine = getFirstElementTextFromTableCell(".lang-ru.ins\\|m\\/\\/n\\|s-form-of");
  result.declension.instrumental.neuter = result.declension.instrumental.masculine;
  result.declension.instrumental.feminine = getInstrumentalFeminineValues();
  result.declension.instrumental.plural = getFirstElementTextFromTableCell(".lang-ru.ins\\|p-form-of");

  result.declension.prepositional.masculine = getFirstElementTextFromTableCell(".lang-ru.pre\\|m\\/\\/n\\|s-form-of");
  result.declension.prepositional.neuter = result.declension.prepositional.masculine;
  result.declension.prepositional.feminine = getFirstElementTextFromTableCell(".lang-ru.pre\\|f\\|s-form-of");
  result.declension.prepositional.plural = getFirstElementTextFromTableCell(".lang-ru.pre\\|p-form-of");

  return result;

  function getFirstElementTextFromTableCell(selector: string): string | null {
    return document?.querySelector(selector)?.childNodes?.item(0)?.textContent || null;
  }

  function getInstrumentalFeminineValues(): Adjective["declension"]["instrumental"]["feminine"] {
    const cell = document?.querySelectorAll(".lang-ru.ins\\|f\\|s-form-of");
    return [cell.item(0)?.textContent, cell.item(1)?.textContent].filter(Boolean);
  }
}
