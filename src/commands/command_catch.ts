import { State } from "src/state";

export async function commandCatch(state: State, ...args: string[]) {
  if (args && args.length > 0) {
    const pokemon = args[0];
    console.log(`Throwing a Pokeball at ${pokemon}...`)
    const data = await state.pokeAPI.fetchPokemon(pokemon);

    const baseExperience = data.base_experience;
    const threshold = catchChance(baseExperience);
    const randomValue = Math.random();

    if (randomValue < threshold) {
      console.log(`${pokemon} was caught!`);
      console.log("You may now inspect it with the inspect command.");
      state.pokedex[pokemon] = data;
    } else {
      console.log(`${pokemon} esacped!`);
    }

  }
}

function catchChance(baseExp: number): number {
  const chance = 55 / baseExp;
  if (chance > 0.98) return 0.98;
  else if (chance < 0.01) return 0.01
  else return chance;
}