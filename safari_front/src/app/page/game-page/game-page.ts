import { Component } from '@angular/core';
import { Carte } from "../../component/carte/carte";
import { InfoBar } from '../../component/info-bar/info-bar';
import { PokedexAccess } from '../../component/pokedex-access/pokedex-access';
import { Inventaire } from '../../component/inventaire/inventaire';

@Component({
  selector: 'app-game-page',
  imports: [Carte,InfoBar,PokedexAccess,Inventaire],
  templateUrl: './game-page.html',
  styleUrl: './game-page.css',
})
export class GamePage {

}
