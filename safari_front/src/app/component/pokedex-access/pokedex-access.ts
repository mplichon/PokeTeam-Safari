import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pokedex-access',
  imports: [],
  templateUrl: './pokedex-access.html',
  styleUrl: './pokedex-access.css',
})
export class PokedexAccess {
  @Input() isOpen: boolean = false; // etat parent
  @Output() toggleView = new EventEmitter<void>();

  onClickButton() {
    this.toggleView.emit(); // on prévient le parent qu'on veut switcher
  }
}

