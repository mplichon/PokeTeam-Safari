// src/app/page/admin/admin-page.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../../service/admin-service';
import { AdminDto } from '../../../dto/admin-dto';

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

  protected admins$!: Observable<AdminDto[]>;
  protected adminForm!: FormGroup;
  protected loginCtrl!: FormControl;
  protected passwordCtrl!: FormControl;
  protected editingAdmin!: AdminDto | null;

  constructor(private adminService: AdminService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.admins$ = this.adminService.findAll();

    this.loginCtrl = new FormControl('', Validators.required);
    this.passwordCtrl = new FormControl('', Validators.required);

    this.adminForm = this.formBuilder.group({
      login: this.loginCtrl,
      password: this.passwordCtrl
    });
  }

  public ajouterModifierAdmin(): void {
    const login = this.loginCtrl.value;
    const password = this.passwordCtrl.value; 

    if (this.editingAdmin) {
      // Modification
      const updatedAdmin = new AdminDto(this.editingAdmin.id, login);
   
      (updatedAdmin as any).password = password;
      this.adminService.save(updatedAdmin);
    } else {
      // Ajout
      const newAdmin = new AdminDto(undefined, login);
      (newAdmin as any).password = password;
      this.adminService.save(newAdmin);
    }

    this.editingAdmin = null;
    this.loginCtrl.reset();
    this.passwordCtrl.reset();
  }

  public editAdmin(admin: AdminDto): void {
    this.editingAdmin = admin;
    this.loginCtrl.setValue(admin.login);
    this.passwordCtrl.setValue(''); 
  }

  public deleteAdmin(admin: AdminDto): void {
    if (admin.id) {
      this.adminService.deleteById(admin.id);
    }
  }

  public trackAdmin(index: number, value: AdminDto): number | undefined {
    return value.id;
  }
}
