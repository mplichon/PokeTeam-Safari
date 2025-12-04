import { Component, Output, EventEmitter, AfterViewInit, ElementRef, ViewChild  } from '@angular/core';
import { BoutonComponent } from "./bouton/bouton";

@Component({
  selector: 'app-carte',
  standalone: true,
  imports: [BoutonComponent],
  templateUrl: './carte.html',
  styleUrls: ['./carte.css'],
})
export class Carte implements AfterViewInit{

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
}
