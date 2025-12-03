import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-forbidden-page',
  imports: [],
  templateUrl: './forbidden-page.html',
  styleUrl: './forbidden-page.css',
})
export class ForbiddenPage implements OnInit {
  constructor(private title: Title) {}

  ngOnInit(): void {
    this.title.setTitle("Erreur 403 | PokéFari");
  }
}
