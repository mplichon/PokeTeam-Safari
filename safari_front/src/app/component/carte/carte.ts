import { Component, Output, EventEmitter } from '@angular/core';
import { BoutonComponent } from "./bouton/bouton";
import { ElementRef, ViewChild } from "@angular/core";

@Component({
  selector: 'app-carte',
  standalone: true,
  imports: [BoutonComponent],
  templateUrl: './carte.html',
  styleUrls: ['./carte.css'],
})
export class Carte {

 @Output() toggleFromRandom = new EventEmitter<void>(); // 💥 NOUVEAU

  @ViewChild('zone', { static: true }) zone!: ElementRef;
  zoneRef!: ElementRef;

  ngAfterViewInit() {
    this.zoneRef = this.zone;
  }

  onRandomClick() {
    this.toggleFromRandom.emit();  // 💥 on prévient le parent (GamePage)
  }
}
