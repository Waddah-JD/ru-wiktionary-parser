# ru-wiktionary-parser

Russian-Language Wiktionary parser

## Documentation

```ts
import { parseAdjective, parseNoun, parseVerb, UnparsableWordError } from "ru-wiktionary-parser";
import type { Adjective, Noun, Verb } from "ru-wiktionary-parser";

function parseAdjective(adjective: string): Promise<Adjective>;

function parseNoun(noun: string): Promise<Noun>;

function parseVerb(verb: string): Promise<Verb>;
```

Note: `parseAdjective` could be used not only with actual adjectives but with adjective-like parts-of-speech for example with pronouns (example: `который`, `свой`..), adverbs (example: `такой` ..) and others..

Note: check out `tests` and `assets` directories for actual usage examples/results

### Types

Exported types look as such:

```ts
type Verb = {
  accented: string;
  conjugation: {
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
};

type Adjective = {
  accented: string;
  declension: {
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
};

type Noun = {
  accented: string;
  declension: {
    nominative: { singular: string | null; plural: string | null };
    genitive: { singular: string | null; plural: string | null };
    dative: { singular: string | null; plural: string | null };
    accusative: { singular: string | null; plural: string | null };
    instrumental: { singular: string | null; plural: string | null };
    prepositional: { singular: string | null; plural: string | null };
    partitive: string | null;
    locative: string | null;
  };
};
```

for more details check `*.d.ts` files, mainly `build/types.d.ts`
