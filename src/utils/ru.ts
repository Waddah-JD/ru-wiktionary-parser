import { VerbConjugation } from "../types.js";

export function getRussianFutureTenseFromImperfectiveForm(infinitive: string): VerbConjugation["future"] {
  return {
    singular1st: `бу́ду ${infinitive}`,
    singular2nd: `бу́дешь ${infinitive}`,
    singular3rd: `бу́дет ${infinitive}`,
    plural1st: `бу́дем ${infinitive}`,
    plural2nd: `бу́дете ${infinitive}`,
    plural3rd: `бу́дут ${infinitive}`,
  };
}
