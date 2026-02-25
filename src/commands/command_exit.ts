import { State } from "src/state";

export async function commandExit(state: State) {
  console.log("Closing the Pokedex... Goodbye!");
  state.readlineInterface.close();
  process.exit(0);
};