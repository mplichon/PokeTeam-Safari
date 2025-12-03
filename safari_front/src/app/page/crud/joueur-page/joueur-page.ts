import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { JoueurDto } from '../../../dto/joueur-dto';
import { JoueurService } from '../../../service/joueur-service';
import { requiredIfValidator } from '../../../validator/required-if-validator';
import { JoueurPasswordDto } from '../../../dto/joueur-password-dto';
import { NavbarCrud } from '../../../component/navbar-crud/navbar-crud';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-joueur-page',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NavbarCrud
  ],
  templateUrl: './joueur-page.html',
  styleUrl: './joueur-page.css',
})
export class JoueurPage {
  protected joueur: JoueurDto = new JoueurDto(0, "", "", 0, 0, 0);
  protected joueurs$!: Observable<JoueurDto[]>;
  protected joueurForm!: FormGroup;
  protected usernameCtrl!: FormControl;
  protected passwordCtrl!: FormControl;
  protected surnomCtrl!: FormControl;
  protected nbPokeballCtrl!: FormControl;
  protected nbFriandiseCtrl!: FormControl;
  protected nbBoueCtrl!: FormControl;
  protected editingJoueur!: JoueurDto | null;

  constructor(private joueurService: JoueurService, private formBuilder: FormBuilder, private title: Title) { }

  ngOnInit(): void {
    this.title.setTitle("Gestion des joueurs | PokéFari");
    this.joueurs$ = this.joueurService.findAll();

    this.usernameCtrl = new FormControl('', Validators.required);
    this.passwordCtrl = new FormControl('', [ requiredIfValidator(!this.editingJoueur), Validators.minLength(6) ]);
    this.surnomCtrl = new FormControl('', Validators.required);
    this.nbPokeballCtrl = new FormControl('', [ Validators.required, Validators.min(0), Validators.max(999) ]);
    this.nbFriandiseCtrl = new FormControl('', [ Validators.required, Validators.min(0), Validators.max(999) ]);
    this.nbBoueCtrl = new FormControl('', [ Validators.required, Validators.min(0), Validators.max(999) ]);

    this.joueurForm = this.formBuilder.group({
      username: this.usernameCtrl,
      password: this.passwordCtrl,
      surnom: this.surnomCtrl,
      nbPokeball: this.nbPokeballCtrl,
      nbFriandise: this.nbFriandiseCtrl,
      nbBoue: this.nbBoueCtrl
    });
  }

  public ajouterModifierJoueur() {

    if (this.editingJoueur) {
      this.joueurService.updateAsAdmin(new JoueurDto(
        this.editingJoueur.id, 
        this.usernameCtrl.value, 
        this.surnomCtrl.value,
        this.nbPokeballCtrl.value,
        this.nbFriandiseCtrl.value,
        this.nbBoueCtrl.value
      ));
    }

    else {
      this.joueurService.createAsAdmin(new JoueurPasswordDto(
        0, 
        this.usernameCtrl.value, 
        this.passwordCtrl.value,
        this.surnomCtrl.value,
        this.nbPokeballCtrl.value,
        this.nbFriandiseCtrl.value,
        this.nbBoueCtrl.value
      ));
    }

    this.editingJoueur = null;
    this.usernameCtrl.reset();
    this.passwordCtrl.reset();
    this.surnomCtrl.reset();
    this.nbPokeballCtrl.reset();
    this.nbFriandiseCtrl.reset();
    this.nbBoueCtrl.reset();

    this.passwordCtrl.setValidators([requiredIfValidator(!this.editingJoueur), Validators.minLength(6)])
    this.passwordCtrl.updateValueAndValidity();
  }

  public editJoueur(joueur: JoueurDto): void {
    // Clone du Joueur pour l'édition
    this.editingJoueur = joueur;
    this.usernameCtrl.setValue(joueur.username);
    this.surnomCtrl.setValue(joueur.surnom);
    this.nbPokeballCtrl.setValue(joueur.nbPokeball);
    this.nbFriandiseCtrl.setValue(joueur.nbFriandise);
    this.nbBoueCtrl.setValue(joueur.nbBoue);

    this.passwordCtrl.setValidators([requiredIfValidator(!this.editingJoueur), Validators.minLength(6)])
    this.passwordCtrl.updateValueAndValidity();
  }

  public deleteJoueur(joueur: JoueurDto): void {
    this.joueurService.deleteById(joueur.id);
    
    this.passwordCtrl.setValidators([requiredIfValidator(!this.editingJoueur), Validators.minLength(6)])
    this.passwordCtrl.updateValueAndValidity();
  }

  public trackJoueur(index: number, value: JoueurDto) {
    return value.id;
  }
}
