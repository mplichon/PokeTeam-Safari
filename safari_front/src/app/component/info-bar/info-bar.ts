import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { JwtService } from '../../service/jwt-service';
import { AuthService } from '../../service/auth-service';
import { Router } from '@angular/router';
import { JoueurService } from '../../service/joueur-service';

@Component({
  selector: 'app-info-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './info-bar.html',
  styleUrls: ['./info-bar.css'],
})
export class InfoBar implements OnInit {

  constructor(private jwtService: JwtService, 
    private authService: AuthService, 
    private router: Router,
    private joueurService: JoueurService
  ){}

  pseudo: string | null = null;

  protected datetime: string = '';

  ngOnInit(): void {
    const id = this.jwtService.userId;

    if (id != null) {
      this.joueurService.getPseudoById(id).subscribe({
        next: (pseudo) => {
          this.pseudo = pseudo;
        },
        error: (err) => console.error("Erreur pseudo :", err)
      });
    }

    this.updateDateTime();
    setInterval(() => this.updateDateTime(), 1000);
  }

  updateDateTime(): void {
    //date
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');

    this.datetime = `${day}/${month}/${year} ${hours}h${minutes}`;
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }

popupVisible = false;

openPopup() {
  this.popupVisible = true;
}

closePopup() {
  this.popupVisible = false;
}

}


