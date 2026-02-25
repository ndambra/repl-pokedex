import { State } from "src/state";

export async function commandHelp(state: State) {
  console.log("Welcome to the Pokedex!");
  console.log("Usage:\n");
  for (let command in state.commands) {
    let cliCommand = state.commands[command]
    console.log(`${cliCommand.name}: ${cliCommand.description}`);
  }
  console.log("\n");
};