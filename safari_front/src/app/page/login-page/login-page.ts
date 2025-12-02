import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { AuthService } from '../../service/auth-service';
import { AuthRequestDto } from '../../component/dto/auth-request-dto';
@Component({
  selector: 'app-login-page',
  imports: [CommonModule, ReactiveFormsModule],
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

      // Si tout est OK, on va sur la page des matières
      this.router.navigate([ '/game' ]);
    }

    // Si la connexion n'a pas pu se faire, affichage de l'erreur sur le template
    catch {
      this.loginError = true;
    }
  }
}

  // <script>
  //     const mdp = document.getElementById('password');
  //     const toggle = document.getElementById('toggle');

  //     toggle.addEventListener('click', () => {
  //       if (mdp.type === 'password') {
  //         mdp.type = 'text';
  //         toggle.src = 'assets/openy.pngopeny.png'; 
  //       } else {
  //         mdp.type = 'password';
  //         toggle.src = 'assets/closey.png'; 
  //       }
  //     });
  // </script>
