import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgModule } from '@angular/core';

@Component({
  selector: 'app-inventaire',
  imports: [CommonModule],
  templateUrl: './inventaire.html',
  styleUrl: './inventaire.css',
})
export class Inventaire {
  selectedItem: any = null;

  items = [
    { id: "pokeball", name: "Pokeball", quantity: 100, img: "assets/pokeitem.png", desc: "permet de capturer un pokemon" },
    { id: "appat", name: "Appat", quantity: 100, img: "assets/appatitem.png", desc: "permet d'amadouer un pokemon" },
    { id: "boue", name: "Boue", quantity: 100, img: "assets/boueitem.png", desc: "permet d'aveugler un pokemon" }
  ];

  selectItem(item: any) {
    console.log('Item sélectionné :', item); // vérifier le clic
    this.selectedItem = item;
  }
}