import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Carte } from "../../component/carte/carte";
import { InfoBar } from '../../component/info-bar/info-bar';
import { PokedexAccess } from '../../component/pokedex-access/pokedex-access';
import { Inventaire } from '../../component/inventaire/inventaire';
import { PokemonsCaptures } from "../../component/pokemons-captures/pokemons-captures";

@Component({
  selector: 'app-game-page',
  imports: [Carte, InfoBar, PokedexAccess, Inventaire, PokemonsCaptures, CommonModule],
  templateUrl: './game-page.html',
  styleUrl: './game-page.css',
})
export class GamePage {

    showPokemonView = false;

  toggleView() {
    this.showPokemonView = !this.showPokemonView;
  }

}
