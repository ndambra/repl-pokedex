import { Cache } from "./pokecache.js";

export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";
  private cache: Cache;

  constructor(cacheInterval: number) {
     this.cache = new Cache(cacheInterval);
  }

   closeCache() {
    this.cache.stopReapLoop();
  }

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    let fullUrl =`${PokeAPI.baseURL}/location-area`;
    if (pageURL) fullUrl = pageURL;

    const isCached = this.cache.get<ShallowLocations>(fullUrl);
    if (isCached) {
      return isCached;
    }

    try {
      const resp = await fetch(fullUrl);
      if (!resp.ok) {
        throw new Error(`Response status: ${resp.status}`);
      }

      const data: ShallowLocations = await resp.json();
      this.cache.add(fullUrl, data);
      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Fetch Error: ${error.message}`);
      } else {
        throw new Error("Unknown error");
      }
    }
  }

  async fetchLocation(locationName: string): Promise<Location> {
    const fullUrl =`${PokeAPI.baseURL}/location-area/${locationName}`;
    
    const cached = this.cache.get<Location>(fullUrl);
    if (cached) return cached;

    try {
      const resp = await fetch(fullUrl);
      if (!resp.ok) {
        throw new Error(`Response status: ${resp.status}`);
      }

      const result: Location = await resp.json();
      this.cache.add(fullUrl, result);
      return result;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Fetch Error: ${error.message}`);
      } else {
        throw new Error("Unknown error");
      }
    }
  }

  async fetchPokemon(pokemonName: string): Promise<Pokemon> {
    const fullUrl =`${PokeAPI.baseURL}/pokemon/${pokemonName}`;

    const cached = this.cache.get<Pokemon>(fullUrl);
    if (cached) return cached;

    try {
      const resp = await fetch(fullUrl);
      if (!resp.ok) {
        throw new Error(`Response status: ${resp.status}`);
      }

      const result: Pokemon = await resp.json();
      this.cache.add(fullUrl, result);
      return result;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Fetch Error: ${error.message}`);
      } else {
        throw new Error("Unknown error");
      }
    }
  }
}

export type ShallowLocations = {
  count: number;
  next: string;
  previous: string | null;
  results: {
    name: string;
    url: string;
  }[];

};

export type Location = {
  encounter_method_rates: {
    encounter_method: {
      name: string;
      url: string;
    };
    version_details: {
      rate: number;
      version: {
        name: string;
        url: string;
      };
    }[];
  }[];
  game_index: number;
  id: number;
  location: {
    name: string;
    url: string;
  };
  name: string;
  names: {
    language: {
      name: string;
      url: string;
    };
    name: string;
  }[];
  pokemon_encounters: {
    pokemon: {
      name: string;
      url: string;
    };
    version_details: {
      encounter_details: {
        chance: number;
        condition_values: any[];
        max_level: number;
        method: {
          name: string;
          url: string;
        };
        min_level: number;
      }[];
      max_chance: number;
      version: {
        name: string;
        url: string;
      };
    }[];
  }[];
};

export type Pokemon = {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  is_default: boolean;
  order: number;
  weight: number;
  abilities: {
    is_hidden: boolean;
    slot: number;
    ability: {
      name: string;
      url: string;
    }
  }[];
  forms: {
    name: string;
    url: string;
  }[];
  game_indices: {
    game_index: number;
    version: {
      name: string;
      url: string;
    }
  }[];
  held_items: {
    item: {
      name: string;
      url: string;
    };
    version_details: {
      rarity: number;
      version: {
        name: string;
        url: string;
      }
    }[];
  }[];
  location_area_encounters: string;
  moves: {
    move: {
      name: string;
      url: string;
    };
    version_group_details: {
      level_learned_at: number;
      version_group: {
        name: string;
        url: string;
      };
      move_learn_method: {
        name: string;
        url: string;
      };
      order: number;
    }[];
  }[];
  species: {
    name: string;
    url: string;
  };
  sprites: {
    back_default: string | null;
    back_female: string | null;
    back_shiny: string | null;
    back_shiny_female: string | null;
    front_default: string | null;
    front_female: string | null;
    front_shiny: string | null;
    front_shiny_female: string | null;
    other: {
      dream_world: {
        front_default: string | null;
        front_female: string | null;
      };
      home: {
        front_default: string | null;
        front_female: string | null;
        front_shiny: string | null;
        front_shiny_female: string | null;
      };
      "official-artwork": {
        front_default: string | null;
        front_shiny: string | null;
      };
      showdown: SpriteVersionsFemale;
    };
    versions: {
      "generation-i": {
        "red-blue": {
          back_default: string | null;
          back_gray: string | null;
          front_default: string | null;
          front_gray: string | null;
        };
        yellow: {
          back_default: string | null;
          back_gray: string | null;
          front_default: string | null;
          front_gray: string | null;
        };
      };
      "generation-ii": {
        crystal: SpriteVersions;
        gold: SpriteVersions;
        silver: SpriteVersions;
      };
      "generation-iii": {
        emerald: {
          front_default: string | null;
          front_shiny: string | null;
        };
        "firered-leafgreen": SpriteVersions;
        "ruby-sapphire": SpriteVersions;
      };
      "generation-iv": {
        "diamond-pearl": SpriteVersionsFemale;
        "heartgold-soulsilver": SpriteVersionsFemale;
        platinum: SpriteVersionsFemale;
      };
      "generation-v": {
        "black-white": SpriteVersionsFemale & {
          animated: SpriteVersionsFemale;
        };
      };
      "generation-vi": {
        "omegaruby-alphasapphire": {
          front_default: string | null;
          front_female: string | null;
          front_shiny: string | null;
          front_shiny_female: string | null;
        };
        "x-y": {
          front_default: string | null;
          front_female: string | null;
          front_shiny: string | null;
          front_shiny_female: string | null;
        };
      };
      "generation-vii": {
        icons: {
          front_default: string | null;
          front_female: string | null;
        };
        "ultra-sun-ultra-moon": {
          front_default: string | null;
          front_female: string | null;
          front_shiny: string | null;
          front_shiny_female: string | null;
        };
      };
      "generation-viii": {
        icons: {
          front_default: string | null;
          front_female: string | null;
        };
      };
    };
  };
  cries: {
    latest: string;
    legacy: string;
  };
  stats: PokemonStat[];
  types: PokemonType[];
  past_types: {
    generation: {
      name: string;
      url: string;
    };
    types: PokemonType[];
  }[];
  past_abilities: {
    generation: {
      name: string;
      url: string;
    },
    abilities: {
      ability: string | null;
      is_hidden: boolean;
      slot: number;
    }
  }[];
  past_stats: {
    generation: {
      name: string;
      url: string;
    },
    stats: {
      base_stat: number;
      effort: number;
      stat: {
        name: string;
        url: string;
      }
    }[]
  }[];
}

type SpriteVersions = {
  back_default: string | null;
  back_shiny: string | null;
  front_default: string | null;
  front_shiny: string | null;
}

type SpriteVersionsFemale = SpriteVersions & {
  back_female: string | null;
  back_shiny_female: string | null;
  front_female: string | null;
  front_shiny_female: string | null;
}

export type PokemonType = {
  slot: number;
    type: {
      name: string;
      url: string;
    }
}

export type PokemonStat = {
    base_stat: number;
    effort: number;
    stat: {
      name: string;
      url: string;
    };
  }