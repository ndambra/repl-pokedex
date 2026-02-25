import { State } from "src/state";

export async function commandPokedex(state: State) {
  console.log("Your Pokedex:");
  const size = Object.keys(state.pokedex).length;
  if (size === 0) {
    console.log("You haven't caught any Pokemon yet!")
  } else {
    Object.keys(state.pokedex).forEach((key) => {
      console.log(`  - ${state.pokedex[key].name}`);
    })
  }
}
