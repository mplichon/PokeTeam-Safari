import { Component, Input, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-transbout',
  imports: [CommonModule],
  templateUrl: './transbout.html',
  styleUrl: './transbout.css',
})
export class Transbout {
 
  @Output() clickTrans = new EventEmitter<void>();
showTransButton: any;


  onTransClick() {
    this.clickTrans.emit();
  }

}
