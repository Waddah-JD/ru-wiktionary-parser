export type VerbConjugation = {
  past: {
    masculine: string | null;
    feminine: string | null;
    neuter: string | null;
    plural: string | null;
  };
  present: {
    singular1st: string | null;
    singular2nd: string | null;
    singular3rd: string | null;
    plural1st: string | null;
    plural2nd: string | null;
    plural3rd: string | null;
  };
  future: {
    singular1st: string | null;
    singular2nd: string | null;
    singular3rd: string | null;
    plural1st: string | null;
    plural2nd: string | null;
    plural3rd: string | null;
  };
  imperative: {
    singular: string | null;
    plural: string | null;
  };
  participles: {
    active: { past: string | null; present: string | null };
    passive: { past: string | null; present: string | null };
    adverbial: { past: string[] | null; present: string | null };
  };
};

export type AdjectiveDeclension = {
  nominative: { masculine: string | null; feminine: string | null; neuter: string | null; plural: string | null };
  genitive: { masculine: string | null; feminine: string | null; neuter: string | null; plural: string | null };
  dative: { masculine: string | null; feminine: string | null; neuter: string | null; plural: string | null };
  accusative: {
    masculine: { animate: string | null; inanimate: string | null };
    feminine: string | null;
    neuter: string | null;
    plural: { animate: string | null; inanimate: string | null };
  };
  instrumental: { masculine: string | null; feminine: string[]; neuter: string | null; plural: string | null };
  prepositional: { masculine: string | null; feminine: string | null; neuter: string | null; plural: string | null };
};
