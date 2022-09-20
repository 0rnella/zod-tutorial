// CODE

import { it } from "vitest";
import { z } from "zod";
import { Equal, Expect } from "./helpers/type-utils";

const StarWarsPerson = z.object({
  name: z.string(),
});

const genericFetch = <PassedSchema extends z.ZodSchema>(
  url: string,
  schema: PassedSchema
): z.infer<typeof schema> => {
  //                 ^ 🕵️‍♂️
  return fetch(url)
    .then((res) => res.json())
    .then((result) => schema.parse(result));
};

// TESTS

it("Should fetch from the Star Wars API", async () => {
  const result = await genericFetch(
    "https://swapi.dev/api/people/1",
    StarWarsPerson
  );

  type cases = [
    // Result should equal { name: string }, not any
    Expect<Equal<typeof result, { name: string }>>
  ];
});
