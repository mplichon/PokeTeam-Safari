import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-info-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './info-bar.html',
  styleUrls: ['./info-bar.css'],
})
export class InfoBar implements OnInit {

  protected datetime: string = '';

  ngOnInit(): void {
    this.updateDateTime();
    setInterval(() => this.updateDateTime(), 1000);
  }

  updateDateTime(): void {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');

    this.datetime = `${day}/${month}/${year} ${hours}h${minutes}`;
  }
}


