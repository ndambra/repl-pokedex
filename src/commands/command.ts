import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
import { commandMap, commandMapBack } from "./command_map.js";
import { commandExplore } from "./command_explore.js";
import { CLICommand } from "../state.js";
import { commandCatch } from "./command_catch.js";
import { commandInspect } from "./command_inspect.js";
import { commandPokedex } from "./command_pokedex.js";

export function getCommands(): Record<string, CLICommand> {
  return {
    exit: {
      name: "exit",
      description: "Exit the Pokedex",
      callback: commandExit,
    },
    help: {
      name: "help",
      description: "Displays a help message",
      callback: commandHelp
    },
    map: {
      name: "map",
      description: "Displays the next 20 location areas",
      callback: commandMap
    },
    mapb: {
      name: "mapb",
      description: "Displays the previous 20 location areas",
      callback: commandMapBack
    },
    explore: {
      name: "explore [location_name]",
      description: "Displays list of available Pokemon for [location_name]",
      callback: commandExplore
    },
    catch: {
      name: "catch [pokemon]",
      description: "Throw a Pokeball at [pokemon] and try to catch it!",
      callback: commandCatch
    },
    inspect: {
      name: "inspect [pokemon]",
      description: "Displays details about any [pokemon] you've caught.",
      callback: commandInspect
    },
    pokedex: {
      name: "pokedex",
      description: "Display a list of all pokemon you've caught.",
      callback: commandPokedex
    }
  }
}