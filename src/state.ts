import { createInterface, type Interface } from "readline";
import { getCommands } from "./commands/command.js";
import { ProxyAgent, setGlobalDispatcher } from 'undici';
import { PokeAPI, Pokemon } from "./pokeapi.js";

export type State = {
  readlineInterface: Interface;
  commands: Record<string, CLICommand>;
  pokeAPI: PokeAPI;
  nextLocationsURL: string | null;
  prevLocationsURL: string | null;
  pokedex: Record<string, Pokemon>;
}

export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State, ...args: string[]) => Promise<void>;
}

export function initState(cacheInterval: number): State {
  //setGlobalDispatcher(new ProxyAgent(/*Add proxy here if needed */));
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "Pokedex > "
  });
  const commands = getCommands();
  const pokeAPI = new PokeAPI(cacheInterval);

  return {
    readlineInterface: rl,
    commands,
    pokeAPI,
    nextLocationsURL: "",
    prevLocationsURL: "",
    pokedex: {}
  }
}