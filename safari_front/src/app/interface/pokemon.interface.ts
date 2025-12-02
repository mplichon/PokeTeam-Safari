export interface Pokemon {
  id: number;
  name: string;
  sprite: string; 
  types: string[]; 
}

//pokemon avec l'image nette en +
export interface PokemonDetail {
  id: number;
  name: string;
  sprite: string; 
  img: string;
  type1: string;
  type2: string | null; 
}

export type ListePokemons = Pokemon[];