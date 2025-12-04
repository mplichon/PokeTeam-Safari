import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Input, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Carte } from "../../component/carte/carte";
import { Combat } from "../../component/combat/combat";
import { InfoBar } from '../../component/info-bar/info-bar';
import { Inventaire } from '../../component/inventaire/inventaire';
import { PokedexAccess } from '../../component/pokedex-access/pokedex-access';
import { PokemonsCaptures } from "../../component/pokemons-captures/pokemons-captures";


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

  @ViewChild(Inventaire) inventaireComponent!: Inventaire;
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

  reloadInventaire() {
    this.inventaireComponent.reloadInventaire();
  }
}
