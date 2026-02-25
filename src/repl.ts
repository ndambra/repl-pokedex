import { State } from "./state.js";

export function cleanInput(input: string): string[] {
  const rtnArr = [];
  const inputArr = input.split(" ");
  for (let word of inputArr) {
    word = word.trim().toLocaleLowerCase();
    if (word !== "" && word !== " ") rtnArr.push(word);
  }
  return rtnArr;
}

export function startREPL(state: State) {
const rl = state.readlineInterface;

  rl.prompt();

  rl.on("line", async (line) => {
    const input = cleanInput(line);
    if(input.length > 0) {
      const inputCommand = input.shift()!;
      const command = state.commands[inputCommand];
      if (command) {
        try {
          await command.callback(state, ...input);
        } catch (error) {
          if (error instanceof Error) {
            console.log(error.message);
          }
        }
      } else {
        console.log("Unknown command");
      }
    }
    rl.prompt();
  });
}