import { Component, Input, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bouton',
  imports: [CommonModule],
  templateUrl: './bouton.html',
  styleUrl: './bouton.css'
})
export class BoutonComponent implements OnInit {
 
 @Input() isOpen: boolean = false; // etat parent
  @Output() randomClick = new EventEmitter<void>();
  @Input() zone!: Element;

  onButtonClick() {
    this.randomClick.emit(); // on prévient le parent qu'on veut switcher
}
 showButton: boolean = false;
  position = { x: 0, y: 0 };
ngOnInit(): void {}
  
  scheduleNextAppearance() {
    const delay = 2000 + Math.random() * 3000; //Temps avant apparition (fréquence)

    setTimeout(() => {
      this.randomPosition();
      this.showButton = true;

      setTimeout(() => {
        this.showButton = false;
        this.scheduleNextAppearance();
      }, 3000);//Temps pendant lequel le bouton reste visible

    }, delay);
  }

  randomPosition() {
    const el = this.zone.nativeElement;
    const w = el.clientWidth;
    const h = el.clientHeight;

    const btn = 50;

    this.position.x = Math.random() * (w - btn);
    this.position.y = Math.random() * (h - btn);
  }

}

