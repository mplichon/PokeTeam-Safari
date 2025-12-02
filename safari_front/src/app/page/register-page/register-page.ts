import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../service/auth-service';
import { SubscribeRequestDto } from '../../component/dto/subscribe-request-dto';
import { passwordMatchValidator } from '../../validator/password-match-validator';

@Component({
  selector: 'app-register-page',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register-page.html',
  styleUrl: './register-page.css',
})
export class RegisterPage implements OnInit{

  test(){
    console.log("clic")
  }

  protected registerForm!: FormGroup;
  protected registerError = false;
  showPassword = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group(
      {
        username: ['', Validators.required],
        surnom: [''],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirm: ['', Validators.required]
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
        this.registerForm.value.username,
        this.registerForm.value.password,
        ""
        )
      );
      this.router.navigate(['/login']);
    }
    catch {
      this.registerError = true;
    }
  }
  
}
