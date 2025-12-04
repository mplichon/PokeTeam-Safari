import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Carte } from "../../component/carte/carte";
import { InfoBar } from '../../component/info-bar/info-bar';
import { PokedexAccess } from '../../component/pokedex-access/pokedex-access';
import { Inventaire } from '../../component/inventaire/inventaire';
import { PokemonsCaptures } from "../../component/pokemons-captures/pokemons-captures";
import { Combat } from "../../component/combat/combat";
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-game-page',
  imports: [Carte, InfoBar, PokedexAccess, Inventaire, PokemonsCaptures, CommonModule, Combat],
  templateUrl: './game-page.html',
  styleUrl: './game-page.css',
})
export class GamePage implements OnInit {

    showPokemonView = false;
    showCombatView = false;
    reloadCount = false;
  
  constructor(private title: Title) {}

  ngOnInit(): void {
    this.title.setTitle("Jeu | PokéFari");
  }

  toggleView() {
    this.showPokemonView = !this.showPokemonView;
  }

  reboutCompMap() {
    this.showCombatView = false;
    this.reloadCounterFromCombat();
    setTimeout(() => {}, 20);
  }
    
  ShowCombatView() {
    this.showCombatView =  !this.showCombatView;
  }

  onChild2ButtonClicked() {
    this.showCombatView = true;
  }

  reloadCounterFromCombat() {
    this.reloadCount = !this.reloadCount;
    setTimeout(() => this.reloadCount = !this.reloadCount, 15)
  }

  ShowPokeCapt() {

this.reboutCompMap();
this.showPokemonView = true;

  }
}
