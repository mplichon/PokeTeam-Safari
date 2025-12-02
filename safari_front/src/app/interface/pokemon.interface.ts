export interface Pokemon {
  id: number;
  name: string;
  sprite: string; 
  types?: string[]; 
}

export interface PokemonDetail {
  id: number;
  name: string;
  sprite: string; 
  img: string;
  types?: string[]; 
}

export type ListePokemons = Pokemon[];