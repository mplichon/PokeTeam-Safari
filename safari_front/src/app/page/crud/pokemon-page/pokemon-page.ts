import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { PokemonService } from '../../../service/pokemon-service';
import { PokemonDto } from '../../../dto/pokemon-dto';
import { CommonModule } from '@angular/common';
import { TypeElementDto } from '../../../dto/type-element-dto';
import { TypeElementService } from '../../../service/type-element-service';
import { typeNotMatchValidator } from '../../../validator/type-not-match-validator';
import { NavbarCrud } from '../../../component/navbar-crud/navbar-crud';

@Component({
  selector: 'app-pokemon-page',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NavbarCrud
  ],
  templateUrl: './pokemon-page.html',
  styleUrl: './pokemon-page.css',
})
export class PokemonPage implements OnInit {
  protected pokemon: PokemonDto = new PokemonDto(0, "", 0, 0, 0, "", "");
  protected pokemons$!: Observable<PokemonDto[]>;
  protected types$!: Observable<TypeElementDto[]>;
  protected pokemonForm!: FormGroup;
  protected nomCtrl!: FormControl;
  protected tauxCaptureCtrl!: FormControl;
  protected tauxFuiteCtrl!: FormControl;
  protected facteurApparitionCtrl!: FormControl;
  protected type1Ctrl!: FormControl;
  protected type2Ctrl!: FormControl;
  protected editingPokemon!: PokemonDto | null;

  constructor(private pokemonService: PokemonService, private typeElementService: TypeElementService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.pokemons$ = this.pokemonService.findAll();
    this.types$ = this.typeElementService.findAll();

    this.nomCtrl = new FormControl('', Validators.required);
    this.tauxCaptureCtrl = new FormControl('', [Validators.required, Validators.min(0), Validators.max(255)]);
    this.tauxFuiteCtrl = new FormControl('', [Validators.required, Validators.min(0), Validators.max(255)]);
    this.facteurApparitionCtrl = new FormControl('', [Validators.required, Validators.min(0), Validators.max(255)]);
    this.type1Ctrl = new FormControl(null, Validators.required);
    this.type2Ctrl = new FormControl(null);

    this.pokemonForm = this.formBuilder.group({
      nom: this.nomCtrl,
      tauxCapture: this.tauxCaptureCtrl,
      tauxFuite: this.tauxFuiteCtrl,
      facteurApparition: this.facteurApparitionCtrl,
      type1: this.type1Ctrl,
      type2: this.type2Ctrl
    }, {
      validators: typeNotMatchValidator('type1', 'type2')
    });
  }

  public ajouterModifierPokemon() {

    if (this.editingPokemon) {
      this.pokemonService.save(new PokemonDto(
        this.editingPokemon.id, 
        this.nomCtrl.value, 
        this.tauxCaptureCtrl.value, 
        this.tauxFuiteCtrl.value, 
        this.facteurApparitionCtrl.value, 
        this.type1Ctrl.value, 
        this.type2Ctrl.value
      ));
    }

    else {
      this.pokemonService.save(new PokemonDto(
        0, 
        this.nomCtrl.value, 
        this.tauxCaptureCtrl.value, 
        this.tauxFuiteCtrl.value, 
        this.facteurApparitionCtrl.value, 
        this.type1Ctrl.value, 
        this.type2Ctrl.value
      ));
    }

    this.editingPokemon = null;
    this.nomCtrl.reset();
    this.tauxCaptureCtrl.reset();
    this.tauxFuiteCtrl.reset();
    this.facteurApparitionCtrl.reset();
    this.type1Ctrl.reset();
    this.type2Ctrl.reset();
  }

  public editPokemon(pokemon: PokemonDto): void {
    // Clone du Pokemon pour l'édition
    this.editingPokemon = pokemon;
    this.nomCtrl.setValue(pokemon.nom);
    this.tauxCaptureCtrl.setValue(pokemon.tauxCapture);
    this.tauxFuiteCtrl.setValue(pokemon.tauxFuite);
    this.facteurApparitionCtrl.setValue(pokemon.facteurApparition);
    this.type1Ctrl.setValue(pokemon.type1);
    this.type2Ctrl.setValue(pokemon.type2);
  }

  public deletePokemon(pokemon: PokemonDto): void {
    this.pokemonService.deleteById(pokemon.id);
  }

  public trackPokemon(index: number, value: PokemonDto) {
    return value.id;
  }
}
