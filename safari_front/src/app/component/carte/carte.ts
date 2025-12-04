import { Component, Output, EventEmitter, AfterViewInit, ElementRef, ViewChild  } from '@angular/core';
import { BoutonComponent } from "./bouton/bouton";
import { CommonModule } from '@angular/common';
import { JwtService } from '../../service/jwt-service';
import { JoueurService } from '../../service/joueur-service';
import { JoueurDto } from '../../dto/joueur-dto';

@Component({
  selector: 'app-carte',
  standalone: true,
  imports: [BoutonComponent, CommonModule],
  templateUrl: './carte.html',
  styleUrls: ['./carte.css'],
})
export class Carte implements AfterViewInit{

  constructor(
      private jwtService: JwtService, 
      private joueurService: JoueurService
    ) {}
    
  userId: number | null = null;


  @Output() toggleFromRandom = new EventEmitter<void>(); 
  @Output() childClicked = new EventEmitter<void>();

  @ViewChild('parentRef', { static: false }) parentRef!: ElementRef;

  parentZone!: Element;
  zoneRef!: ElementRef;

  ngAfterViewInit() {
  setTimeout(() => {
      this.parentZone = this.parentRef.nativeElement;
    }, 1000);
  
  }

  onChildButtonClicked() {
    this.childClicked.emit();
  }

  onRandomClick() {
    this.toggleFromRandom.emit(); 
  }

  popupVisible = false;

  openPopup() {
    this.popupVisible = true;
    console.log("open")
  }

  closePopup() {
    this.popupVisible = false;
  }

  recupererRecompense() {
    this.userId = this.jwtService.userId;
    console.log("User ID =", this.userId);

    if (!this.userId) {
      console.error("Aucun userId dans le JWT");
      return;
    }

    this.joueurService.findById(this.userId).subscribe({
      next: (joueur) => {
        console.log("Joueur reçu :", joueur);

        const joueurDto = new JoueurDto(
          joueur.id,
          joueur.username,
          joueur.surnom,
          joueur.nbPokeball,
          joueur.nbFriandise,
          joueur.nbBoue
        );

        // Ajouter 10 à chaque ressource
        joueurDto.nbPokeball = Math.min(joueurDto.nbPokeball + 10, 999);
        joueurDto.nbFriandise = Math.min(joueurDto.nbFriandise + 10, 999);
        joueurDto.nbBoue = Math.min(joueurDto.nbBoue + 10, 999);

        // Envoyer la mise à jour en base
        this.joueurService.updateAsAdmin(joueurDto);

        console.log("Récompense appliquée :", joueurDto);
      },
      error: (err) => console.error("Erreur JoueurService :", err)
    });
  }
  
}
