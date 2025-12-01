import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { PokemonService } from '../../../service/pokemon-service';
import { PokemonDto } from '../../../dto/pokemon-dto';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-pokemon-page',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterLink
  ],
  templateUrl: './pokemon-page.html',
  styleUrl: './pokemon-page.css',
})
export class PokemonPage implements OnInit {
  protected pokemon: PokemonDto = new PokemonDto(0, "", 0, 0, 0, "", "");
  protected pokemons$!: Observable<PokemonDto[]>;
  protected pokemonForm!: FormGroup;
  protected nomCtrl!: FormControl;
  protected tauxCaptureCtrl!: FormControl;
  protected editingPokemon!: PokemonDto | null;

  constructor(private pokemonService: PokemonService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.pokemons$ = this.pokemonService.findAll();

    this.nomCtrl = new FormControl('', Validators.required);
    this.tauxCaptureCtrl = new FormControl('', Validators.required);

    this.pokemonForm = this.formBuilder.group({
      nom: this.nomCtrl,
      tauxCapture: this.tauxCaptureCtrl
    });
  }

  public ajouterModifierPokemon() {

    if (this.editingPokemon) {
      this.pokemonService.save(new PokemonDto(this.editingPokemon.id, this.nomCtrl.value, this.tauxCaptureCtrl.value, 0, 0, "", ""));
    }

    else {
      this.pokemonService.save(new PokemonDto(0, this.nomCtrl.value, this.tauxCaptureCtrl.value, 0, 0, "", ""));
    }

    this.editingPokemon = null;
    this.nomCtrl.reset();
    this.tauxCaptureCtrl.reset();
  }

  public editPokemon(pokemon: PokemonDto): void {
    // Clone du TODO pour l'édition
    this.editingPokemon = pokemon;
    this.nomCtrl.setValue(pokemon.nom);
    this.tauxCaptureCtrl.setValue(pokemon.tauxCapture);
  }

  public deletePokemon(pokemon: PokemonDto): void {
    this.pokemonService.deleteById(pokemon.id);
  }

  public trackPokemon(index: number, value: PokemonDto) {
    return value.id;
  }
}
