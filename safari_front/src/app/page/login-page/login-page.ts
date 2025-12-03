import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../service/auth-service';
import { AuthRequestDto } from '../../component/dto/auth-request-dto';
@Component({
  selector: 'app-login-page',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login-page.html',
  styleUrls: ['../../../styles.css'],
})

export class LoginPage implements OnInit {
  protected loginError: boolean = false;
  protected userForm!: FormGroup;
  protected usernameCtrl!: FormControl;
  protected passwordCtrl!: FormControl;

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {

    this.usernameCtrl = this.formBuilder.control('', Validators.required);
    this.passwordCtrl = this.formBuilder.control('', [ Validators.required, Validators.minLength(6) ]);

    this.userForm = this.formBuilder.group({
      username: this.usernameCtrl,
      password: this.passwordCtrl
    });
  }

  public async connecter() {
    try {
      // La méthode auth renvoyant une Promise, on peut attendre la résolution avec "await"
      await this.authService.auth(new AuthRequestDto(this.usernameCtrl.value, this.passwordCtrl.value));

      const token = sessionStorage.getItem('token');
      console.log(token)

      if (!token) {
        this.loginError = true;
        return;
      }

      // Décoder le token JWT
      const payload = JSON.parse(atob(token.split('.')[1]));
      console.log("Payload:", payload.role);

      if (payload.role==="ADMIN") {
        this.router.navigate(['/gestion/admin']);
      } else {
        this.router.navigate(['/game']);
    }
    }

    // Si la connexion n'a pas pu se faire, affichage de l'erreur sur le template
    catch {
      this.loginError = true;
    }
  }

  showPassword: boolean = false;

togglePassword() {
  this.showPassword = !this.showPassword;
}
}

