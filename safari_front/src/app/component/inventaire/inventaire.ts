import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { JwtService } from '../../service/jwt-service';
import { JoueurService } from '../../service/joueur-service';

@Component({
  selector: 'app-inventaire',
  imports: [CommonModule],
  templateUrl: './inventaire.html',
  styleUrl: './inventaire.css',
})
export class Inventaire implements OnInit {

  selectedItem: any = null;
  userId: number | null = null;

  constructor(
    private jwtService: JwtService, 
    private joueurService: JoueurService
  ) {}

  items = [
    { id: "pokeball", name: "Pokéball", quantity: 0, img: "assets/pokeitem.png", desc: "Permet de capturer un Pokémon" },
    { id: "appat",    name: "Appât",    quantity: 0, img: "assets/appatitem.png", desc: "Permet d’amadouer un Pokémon" },
    { id: "boue",     name: "Boue",     quantity: 0, img: "assets/boueitem.png", desc: "Permet d’aveugler un Pokémon" }
  ];

  ngOnInit(): void {

    this.userId = this.jwtService.userId;
    console.log("User ID =", this.userId);

    if (!this.userId) {
      console.error("Aucun userId dans le JWT");
      return;
    }

    this.joueurService.findById(this.userId).subscribe({
      next: (joueur) => {
        console.log("Joueur reçu :", joueur);

        // Mise à jour des quantités dans items
        this.items.find(i => i.id === "pokeball")!.quantity = joueur.nbPokeball;
        this.items.find(i => i.id === "appat")!.quantity    = joueur.nbFriandise; 
        this.items.find(i => i.id === "boue")!.quantity     = joueur.nbBoue;

      },
      error: (err) => console.error("Erreur JoueurService :", err)
    });
  }

  selectItem(item: any) {
    console.log("Item sélectionné :", item);
    this.selectedItem = item;
  }

  unselectItem(item: any) {
      this.selectedItem = null;
  }
}