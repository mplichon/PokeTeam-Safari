import { Component } from '@angular/core';
import { AuthService } from '../../service/auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar-crud',
  imports: [],
  templateUrl: './navbar-crud.html',
  styleUrl: './navbar-crud.css',
})
export class NavbarCrud {

    constructor( 
    private authService: AuthService, 
    private router: Router){}


    logout(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
