import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../service/auth-service';
import { SubscribeRequestDto } from '../../component/dto/subscribe-request-dto';
import { passwordMatchValidator } from '../../validator/password-match-validator';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-register-page',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register-page.html',
  styleUrl: './register-page.css',
})
export class RegisterPage implements OnInit{

  protected registerForm!: FormGroup;
  protected usernameCtrl!: FormControl;
  protected passwordCtrl!: FormControl;
  protected confirmCtrl!: FormControl;
  protected surnomCtrl!: FormControl;
  protected registerError = false;
  showPassword = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private title: Title
  ) {}

  ngOnInit(): void {
    this.title.setTitle("Inscription | PokéFari");

    this.usernameCtrl = new FormControl('', Validators.required);
    this.passwordCtrl = new FormControl('', [ Validators.required, Validators.minLength(6) ]);
    this.surnomCtrl = new FormControl('', Validators.required);
    this.confirmCtrl = new FormControl('', Validators.required);

    this.registerForm = this.formBuilder.group(
      {
        username: this.usernameCtrl,
        password: this.passwordCtrl,
        surnom: this.surnomCtrl,
        confirm: this.confirmCtrl
      },
      {
        validators: passwordMatchValidator('password', 'confirm')
      }
    );
  }


  async register() {

    console.log("oui");

    try {
      await this.authService.register(
        new SubscribeRequestDto(
        this.usernameCtrl.value,
        this.passwordCtrl.value,
        this.surnomCtrl.value
        )
      );
      this.router.navigate(['/login']);
    }
    catch {
      this.registerError = true;
    }
  }

  togglePassword() {
  this.showPassword = !this.showPassword;
}
  
}
