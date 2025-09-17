# ru-wiktionary-parser

Russian-Language Wiktionary parser

## Documentation

```ts
import { parseAdjective, parseVerb, AdjectiveDeclension, VerbConjugation } from "ru-wiktionary-parser";

function parseAdjective(adjective: string): Promise<AdjectiveDeclension>;

function parseVerb(verb: string): Promise<VerbConjugation>;
```

Note: `parseAdjective` could be used not only with actual adjectives but with adjective-like parts-of-speech for example with pronouns (example: `который`, `свой`..), adverbs (example: `такой` ..) and others..

Note: check out `tests` and `assets` directories for actual usage examples/results
