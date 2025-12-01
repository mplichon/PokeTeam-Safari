import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { PokemonService } from '../../../service/pokemon-service';
import { PokemonDto } from '../../../dto/pokemon-dto';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pokemon-page',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './pokemon-page.html',
  styleUrl: './pokemon-page.css',
})
export class PokemonPage implements OnInit {
  protected pokemon: PokemonDto = new PokemonDto(0, "", "", 0);
  protected pokemons$!: Observable<PokemonDto[]>;
  protected pokemonForm!: FormGroup;
  protected nomCtrl!: FormControl;
  protected paysCtrl!: FormControl;
  protected editingPokemon!: PokemonDto | null;

  constructor(private pokemonService: PokemonService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.pokemons$ = this.pokemonService.findAll();

    this.nomCtrl = new FormControl('', Validators.required);
    this.paysCtrl = new FormControl('', Validators.required);

    this.pokemonForm = this.formBuilder.group({
      nom: this.nomCtrl,
      pays: this.paysCtrl
    });
  }

  public ajouterModifierPokemon() {

    if (this.editingPokemon) {
      this.pokemonService.save(new PokemonDto(this.editingPokemon.id, this.nomCtrl.value, this.paysCtrl.value));
    }

    else {
      this.pokemonService.save(new PokemonDto(0, this.nomCtrl.value, this.paysCtrl.value));
    }

    this.editingPokemon = null;
    this.nomCtrl.reset();
    this.paysCtrl.reset();
  }

  public editPokemon(pokemon: PokemonDto): void {
    // Clone du TODO pour l'édition
    this.editingPokemon = pokemon;
    this.nomCtrl.setValue(pokemon.nom);
    this.paysCtrl.setValue(pokemon.pays);
  }

  public deletePokemon(pokemon: PokemonDto): void {
    this.pokemonService.deleteById(pokemon.id);
  }

  public trackPokemon(index: number, value: PokemonDto) {
    return value.id;
  }
}
