import { Component, Input, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bouton',
  imports: [CommonModule],
  templateUrl: './bouton.html',
  styleUrl: './bouton.css',
})

export class BoutonComponent implements OnInit {
  @Input() isOpen: boolean = false; // etat parent
  @Output() randomClick = new EventEmitter<void>();
  @Input() zone!: Element;
  @Output() clicked = new EventEmitter<void>();
  @Input() parentZone!: Element;

  onButtonClick() {
    this.clicked.emit();
  }
  
  showButton: boolean = false;
  position = { x: 0, y: 0 };

  ngOnInit(): void { 

    
    setTimeout(() => {
      this.scheduleNextAppearance();
    }, 500);
  }

scheduleNextAppearance() {
     const delay = 2000 + Math.random() * 5000; //Temps avant apparition (fréquence)
  
     setTimeout(() => {
       this.randomPosition();
       this.showButton = true;

       setTimeout(() => {
         this.showButton = false;
         
         this.scheduleNextAppearance();
       }, 7000); //Temps pendant lequel le bouton reste visible
     }, delay);
  }

   randomPosition() {
     const zone = this.parentZone;
     const w = zone.clientWidth;
     const h = zone.clientHeight;

     const btn = 200;

     let x = Math.floor(Math.random() * (w - btn));
     let y = Math.floor(Math.random() * (h - btn));

     if (x < 100) x = 100;
     if (y < 100) y = 100;
     if (x > 1150) x = 1150;
     if (y > 650) y = 550;

     this.position.x = x;
     this.position.y = y;
    console.log(`Position du bouton : x=${this.position.x}, y=${this.position.y}`);
  }
}
