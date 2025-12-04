import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { map, Observable } from 'rxjs';
import { PokemonDetail } from '../../interface/pokemon.interface';
import { JwtService } from '../../service/jwt-service';
import { JoueurService } from '../../service/joueur-service';


type CombatStatus = 'fuite' | 'capture' | 'continue' | 'abandon';

@Component({
  selector: 'app-combat',
  imports: [CommonModule, RouterModule],
  templateUrl: './combat.html',
  styleUrl: './combat.css',
})
export class Combat implements OnInit {
  @Output() reloadMap = new EventEmitter<void>();
  @Output() openPoke = new EventEmitter<void>();

  imgPokeMargLeft = 50;
  imgPokeMargRight = 50;
  imgPokeMargTop = 0;
  imgPokeMargBottom = 0;

  messageContent = '';

  imgPokeballMargBottom = -170;
  pokeballAngle = 0;

  allButtonsDisabled = false;
  pokemonHidden = 'false';
  pokeballHidden = 'true';
  username = ''; 
  surnom = ''; 
  userid = 0; 
  pokemon: PokemonDetail = {
    id: 0,
    name: '',
    sprite: '',
    img: '',
    type1: '',
    type2: ''
  };

  combatStatus: CombatStatus = 'continue'; // statut par défaut
  idRencontre!: number;

  private apiUrl = '/rencontre'
  private baseUrl = 'https://pokebuildapi.fr/api/v1/pokemon';

  constructor(private http: HttpClient,private jwtService: JwtService, private router: Router,    private joueurService: JoueurService) {}
  
pseudo: string | null = null;

  ngOnInit(): void {
    this.initRencontre();
    //this._id = Math.floor(Math.random() * 151) + 1;

  }

  getPokemon(id: number): Observable<PokemonDetail> {
    return this.http.get<any>(`${this.baseUrl}/${id}`).pipe(
      map(p => {
        const types = p.apiTypes?.map((t: { name: string }) => t.name) ?? [];
        return {
          id: p.id,
          name: p.name,
          sprite: p.sprite,
          img: p.image,
          type1: types[0] ?? '',
          type2: types[1] ?? null
        };
      })
    );
  }
  
  // Appel API selon l'action choisie

  initRencontre() {
  this.userid = this.jwtService.userId ?? 0;
  this.username = this.jwtService.username ?? 'SashaSansCompte';

  const id = this.jwtService.userId;

    if (id != null) {
      this.joueurService.getPseudoById(id).subscribe({
        next: (pseudo) => {
          this.pseudo = pseudo;
        },
        error: (err) => console.error("Erreur pseudo :", err)
      });
    }

  this.http.get<{idRencontre: number, idPokemon: number, nom: string}>(`${this.apiUrl}/initialiser/${this.userid}`)
    .subscribe(res => {
      this.idRencontre = res.idRencontre;
      this.getPokemon(res.idPokemon).subscribe({
      next: (p) => {
        this.pokemon = p;
        this.messageContent = 'Un ' + this.pokemon.name + ' sauvage est apparu !';
      },
      error: (err) => console.error('Erreur API Pokémon', err)
    });
    });
  }

  pokeball() {
    this.allButtonsDisabled = true;
      this.pokeballHidden = 'false';
      this.pokemonHidden = 'true';
      this.messageContent = this.pseudo + ' lance une Pokéball !';
    setTimeout(() => {
    this.pokeballRolling();
    }, 500);
    setTimeout(() => {
    this.pokeballRolling();
    }, 1700);
    setTimeout(() => {
    this.pokeballRolling();
    }, 2900);
    setTimeout(() => {
    this.pokeballRolling();
    }, 4100);
    setTimeout(() => {
    this.http.get<{statut: string}>(`${this.apiUrl}/pokeball/${this.idRencontre}`)
      .subscribe(res => {
        if (res.statut === 'fuite') {
          this.pokeballHidden = 'true';
          this.pokemonHidden = 'false';
          this.pokemonSlidingOut();
          this.messageContent = this.pokemon.name + ' a fui le combat !';
          setTimeout(() => {
            this.handleStatus(res.statut as CombatStatus);
          }, 1000);
        } else { 
          this.handleStatus(res.statut as CombatStatus);
        }
        this.pokeballHidden = 'true';
        this.pokemonHidden = 'false';
        this.allButtonsDisabled = false;
      });
      if (this.combatStatus === 'continue') {
        this.messageContent = this.pokemon.name + ' s\'est libéré !';
      }
      if (this.combatStatus === 'capture') {
        this.messageContent = 'Félicitations ! ' + this.pokemon.name + ' a été capturé !';
      }
    }, 5900);

  }


  appat() {
    this.allButtonsDisabled = true;
    this.pokemonShakingV();
    this.messageContent = this.pokemon.name + ' mange !';
    setTimeout(() => {
    this.http.get<{statut: string}>(`${this.apiUrl}/appat/${this.idRencontre}`)
      .subscribe(res => {
        if (res.statut === 'fuite') {
          this.pokemonSlidingOut();
          this.messageContent = this.pokemon.name + ' a fui le combat !';
          setTimeout(() => {
            this.handleStatus(res.statut as CombatStatus);
          }, 1000);
        } else { 
          this.handleStatus(res.statut as CombatStatus);
        }
        this.allButtonsDisabled = false;
      });
    }, 1000);
  }

  boue() {
    this.allButtonsDisabled = true;
    this.pokemonShakingH();
    this.messageContent = this.pokemon.name + " s'énerve !";
    setTimeout(() => {
    this.http.get<{statut: string}>(`${this.apiUrl}/boue/${this.idRencontre}`)
      .subscribe(res => {
        if (res.statut === 'fuite') {
          this.pokemonSlidingOut();
          this.messageContent = this.pokemon.name + ' a fui le combat !';
          setTimeout(() => {
            this.handleStatus(res.statut as CombatStatus);
          }, 1000);
        } else { 
          this.handleStatus(res.statut as CombatStatus);
        }
        this.allButtonsDisabled = false;
      });
    }, 1000);

  }

  fuite() {
    this.allButtonsDisabled = true;
    this.http.get<{statut: string}>(`${this.apiUrl}/fuir/${this.idRencontre}`)
      .subscribe(res => this.combatStatus = res.statut as any);
  }

  private handleStatus(statut: CombatStatus) {
    this.combatStatus = statut;
  }

  pokemonShakingH() {
    let margLeftTemp = this.imgPokeMargLeft;
    let margRightTemp = this.imgPokeMargRight;
    let mod = 0;
    let switchVar = true;
    let counter = 0;
    let intervalle = setInterval(() => {
        counter++;
        if (counter >= 200) {
          clearInterval(intervalle);
        }
        if (switchVar === true) {
          mod += 1;
          if (mod >= 25) {
            switchVar = false;
          }
        } else {
          mod -= 1;
          if (mod <=-25) {
            switchVar = true;
          }
        }
        this.imgPokeMargLeft = margLeftTemp - mod;
        this.imgPokeMargRight = margRightTemp + mod;
      }, 5);
      this.imgPokeMargLeft = margLeftTemp;
      this.imgPokeMargRight = margRightTemp;
  }

  pokemonShakingV() {
    let margTopTemp = this.imgPokeMargTop;
    let margBottomTemp = this.imgPokeMargBottom;
    let mod = 0;
    let switchVar = true;
    let counter = 0;
    let intervalle = setInterval(() => {
        counter++;
        if (counter >= 100) {
          clearInterval(intervalle);
        }
        if (switchVar === true) {
          mod += 1;
          if (mod >= 25) {
            switchVar = false;
          }
        } else {
          mod -= 1;
          if (mod <=0) {
            switchVar = true;
          }
        }
        this.imgPokeMargTop = margTopTemp - mod;
        this.imgPokeMargBottom = margBottomTemp + mod;
      }, 10);
      this.imgPokeMargTop = margTopTemp;
      this.imgPokeMargBottom = margBottomTemp;
  }
  pokemonSlidingOut() {
    let margLeftTemp = this.imgPokeMargLeft;
    let margRightTemp = this.imgPokeMargRight;
    let mod = 0;
    let counter = 0;
    let intervalle = setInterval(() => {
        counter++;
        if (counter >= 200) {
          clearInterval(intervalle);
        }
        mod += 1;
        this.imgPokeMargLeft = margLeftTemp + mod;
        this.imgPokeMargRight = margRightTemp - mod;
      }, 5);
  }


  pokeballRolling() {
    let angleTemp = this.pokeballAngle;
    let mod = 0;
    let switchVar = true;
    let counter = 0;
    let intervalle = setInterval(() => {
        counter++;
        if (counter >= 100) {
          clearInterval(intervalle);
        }
        if (switchVar === true) {
          mod += 1;
          if (mod >= 25) {
            switchVar = false;
          }
        } else {
          mod -= 1;
          if (mod <=-25) {
            switchVar = true;
          }
        }
        this.pokeballAngle = angleTemp + mod;
      }, 10);
    this.pokeballAngle = angleTemp; 
  }

  goBackToMap() {
    this.reloadMap.emit();
  }
  
  goToPoke(){

this.openPoke.emit();

  }


}
