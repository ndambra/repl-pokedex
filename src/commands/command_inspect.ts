import { Pokemon, PokemonStat, PokemonType } from './../pokeapi';
import { State } from "src/state";

export async function commandInspect(state: State, ...args: string[]) {
  if (args.length === 0) {
    console.log("Command 'inspect' needs a Pokemon name as an argument\nType help to learn how to use the commands.");
  } else {
    const pokemonName =  args[0]
    if (!state.pokedex[pokemonName]) {
      console.log("you have not caught that pokemon");
    } else {
      printPokemon(state.pokedex[pokemonName]); 
    }
  }
}

function printPokemon(pokemon: Pokemon) {
  console.log(`Name: ${pokemon.name}`);
  console.log(`Height: ${pokemon.height}`);
  console.log(`Weight: ${pokemon.weight}`);
  console.log(`Stats:`);
  printStats(pokemon.stats);
  console.log(`Types:`);
  printTypes(pokemon.types);
}

function printStats(stats: PokemonStat[]) {
  for(let stat of stats) {
    console.log(`  -${stat.stat.name}: ${stat.base_stat}`);

  }
}

function printTypes(types: PokemonType[]) {
  for(let type of types) {
    console.log(`  -${type.type.name}`);
  }
}