// src/app/page/admin/admin-page.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../../service/admin-service';
import { AdminDto } from '../../../dto/admin-dto';
import { AdminPasswordDto } from '../../../dto/admin-password-dto';

@Component({
  selector: 'app-admin-page',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './admin-page.html',
  styleUrls: ['./admin-page.css']
})
export class AdminPage implements OnInit {
  protected admin: AdminDto = new AdminDto(0, "");
  protected admins$!: Observable<AdminDto[]>;
  protected adminForm!: FormGroup;
  protected loginCtrl!: FormControl;
  protected passwordCtrl!: FormControl;
  protected editingAdmin!: AdminDto | null;

  constructor(private adminService: AdminService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.admins$ = this.adminService.findAll();

    this.loginCtrl = new FormControl('', Validators.required);
    this.passwordCtrl = new FormControl('', [ Validators.required, Validators.minLength(6) ]);

    this.adminForm = this.formBuilder.group({
      login: this.loginCtrl,
      password: this.passwordCtrl
    });
  }

  public ajouterModifierAdmin() {

    if (this.editingAdmin) {
      this.adminService.save(new AdminPasswordDto(
        this.editingAdmin.id, 
        this.loginCtrl.value, 
        this.passwordCtrl.value
      ));
    }

    else {
      this.adminService.save(new AdminPasswordDto(
        0, 
        this.loginCtrl.value, 
        this.passwordCtrl.value
      ));
    }

    this.editingAdmin = null;
    this.loginCtrl.reset();
    this.passwordCtrl.reset();
  }

  public editAdmin(admin: AdminDto): void {
    // Clone du Admin pour l'édition
    this.editingAdmin = admin;
    this.loginCtrl.setValue(admin.login);
    this.passwordCtrl.setValue('');
  }

  public deleteAdmin(admin: AdminDto): void {
    this.adminService.deleteById(admin.id);
  }

  public trackAdmin(index: number, value: AdminDto) {
    return value.id;
  }
}
