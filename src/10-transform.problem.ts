// CODE

import { expect, it } from "vitest";
import { z } from "zod";

const SplitString = z.string().transform((str) => str.split(" "));

const RawStarWarsPerson = z.object({
  name: z.string(),
});

const StarWarsPerson = RawStarWarsPerson.transform((person) => ({
  ...person,
  nameAsArray: SplitString.parse(person.name),
}));

const StarWarsPeopleResults = z.object({
  results: z.array(StarWarsPerson),
});

export const fetchStarWarsPeople = async () => {
  const data = await fetch("https://swapi.dev/api/people/").then((res) =>
    res.json()
  );

  const parsedData = StarWarsPeopleResults.parse(data);

  return parsedData.results;
};

// TESTS

it("Should resolve the name and nameAsArray", async () => {
  expect((await fetchStarWarsPeople())[0]).toEqual({
    name: "Luke Skywalker",
    nameAsArray: ["Luke", "Skywalker"],
  });
});
