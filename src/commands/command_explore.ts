import { State } from "src/state";

export async function commandExplore(state: State, ...args: string[]) {
  const location = args[0];
  console.log(`Exploring ${location}...`);
  const data = await state.pokeAPI.fetchLocation(location);
  console.log("Found Pokemon:");
  const pokemonEncounters = data.pokemon_encounters;
  for (let pokemon of pokemonEncounters) {
    console.log(` - ${pokemon.pokemon.name}`);
  }
}