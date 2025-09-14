export type ConjugatedVerb = {
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
  participle: {
    past: string | null; // причастие прошедшего времени
    present: string | null; // причастие настоящего времени
  };
  passiveParticiple: {
    past: string | null; // страдательное причастие прошедшего времени
    present: string | null; // страдательное причастие настоящего времени
  };
  adverbialParticiple: {
    past: string[] | null; // деепричастие прошедшего времени
    present: string | null; // деепричастие настоящего времени
  };
};
