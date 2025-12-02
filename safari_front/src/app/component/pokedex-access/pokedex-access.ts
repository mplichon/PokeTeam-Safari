import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { JwtService } from '../../service/jwt-service';

@Component({
  selector: 'app-pokedex-access',
  imports: [],
  templateUrl: './pokedex-access.html',
  styleUrl: './pokedex-access.css',
})
export class PokedexAccess implements OnInit{
  @Input() isOpen: boolean = false; // etat parent
  @Output() toggleView = new EventEmitter<void>();

  constructor(private jwtService: JwtService){}
  userId: number | null = null;

  onClickButton() {
    this.toggleView.emit(); // on prévient le parent qu'on veut switcher
  }

  ngOnInit(): void {
    this.userId = this.jwtService.userId;
  }
}

