import { State } from "src/state";

export async function commandMap(state: State) {
  let data;
  if (state.nextLocationsURL) {
    data = await state.pokeAPI.fetchLocations(state.nextLocationsURL);
  } else {
    data = await state.pokeAPI.fetchLocations();
  }
  state.prevLocationsURL = data.previous;
  state.nextLocationsURL = data.next;
  for (let loc of data.results) {
    console.log(loc.name);
  }
}

export async function commandMapBack(state: State) {
  if (!state.prevLocationsURL) {
    console.log("you're on the first page");
  } else {
    const data = await state.pokeAPI.fetchLocations(state.prevLocationsURL);
    state.prevLocationsURL = data.previous;
    state.nextLocationsURL = data.next;
    for (let loc of data.results) {
      console.log(loc.name);
    }
  }
}