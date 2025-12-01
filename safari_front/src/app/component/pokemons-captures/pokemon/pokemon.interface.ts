export interface Pokemon {
  id: number;
  name: string;
  sprite: string; 
  types?: string[]; 
}

export type ListePokemons = Pokemon[];