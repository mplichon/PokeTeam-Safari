import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-not-found-page',
  imports: [],
  templateUrl: './not-found-page.html',
  styleUrl: './not-found-page.css',
})
export class NotFoundPage implements OnInit {
  constructor(private title: Title) {}

  ngOnInit(): void {
    this.title.setTitle("Erreur 404 | PokéFari");
  }
}
