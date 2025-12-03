import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { JwtService } from '../../service/jwt-service';
import { PokemonCaptureService } from '../../service/pokemon-capture-service';
import { JoueurService } from '../../service/joueur-service';

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

  constructor(private jwtService: JwtService, 
    private pokemonCaptureService: PokemonCaptureService,
    private joueurService: JoueurService
  ){}
  pseudo: string | null = null;
  nbPokemons = 0;

  onClickButton() {
    this.toggleView.emit(); // on prévient le parent qu'on veut switcher
  }

  formatId(id: number): string {
    return id.toString().padStart(3, '0');  
  }
  ngOnInit(): void {
    const id = this.jwtService.userId;
  
      if (id != null) {
        this.pokemonCaptureService
          .pokemonCaptureParIdParJoueur(id)
          .subscribe({
            next: (pokemons) => {
              this.nbPokemons = pokemons.length;  
            },
            error: err => console.error('Erreur API Pokémon capturés', err)
        });

        this.joueurService.getPseudoById(id).subscribe({
          next: (pseudo) => {
            this.pseudo = pseudo;

          },
          error: (err) => console.error("Erreur pseudo :", err)
        });
      }

    
  }
}

