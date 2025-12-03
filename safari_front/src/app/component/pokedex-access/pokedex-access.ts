import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { JwtService } from '../../service/jwt-service';
import { PokemonCaptureService } from '../../service/pokemon-capture-service';

@Component({
  selector: 'app-pokedex-access',
  imports: [],
  templateUrl: './pokedex-access.html',
  styleUrl: './pokedex-access.css',
})
export class PokedexAccess implements OnInit{
  @Input() isOpen: boolean = false; // etat parent
  @Input() showCombatViewParent: boolean = true; // etat parent
  @Output() toggleView = new EventEmitter<void>();

  constructor(private jwtService: JwtService, private pokemonCaptureService: PokemonCaptureService){}
  userId: number | null = null;
  nbPokemons = 0;

  onClickButton() {
    this.toggleView.emit(); // on prévient le parent qu'on veut switcher
  }

  formatId(id: number): string {
    return id.toString().padStart(3, '0');  
  }
  ngOnInit(): void {
    this.userId = this.jwtService.userId;

    if (this.userId == null) {
      console.error("Aucun userId dans le JWT");
      return;
    }

    this.pokemonCaptureService
      .pokemonCaptureParIdParJoueur(this.userId)
      .subscribe({
        next: (pokemons) => {
          this.nbPokemons = pokemons.length;  
        },
        error: err => console.error('Erreur API Pokémon capturés', err)
    });
  }
}

