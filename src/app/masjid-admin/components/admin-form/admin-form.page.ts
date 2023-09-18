import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AdminService} from "../../../../data/user/admin.service";
import {ModalController} from "@ionic/angular";
import {AdminModel} from "../../../model/admin.model";

@Component({
  selector: 'app-admin-form',
  templateUrl: './admin-form.page.html',
  styleUrls: ['./admin-form.page.scss'],
})
export class AdminFormPage implements OnInit {
  adminForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private adminService: AdminService,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    this.adminForm = this.formBuilder.group({
      fullName: [null, [Validators.required]],
      email: [null, [Validators.required]],
      numTel: [null, [Validators.required]],
      password: [null, [Validators.required]],
      recupEmail: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required]],
    });
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

  addNewAdmin() {
    const admin: AdminModel = {
      id: null,
      fullName: this.adminForm.get('title')?.value,
      email: this.adminForm.get('organizer')?.value,
      numTel: this.adminForm.get('daysTimes')?.value,
      password: this.adminForm.get('description')?.value,
      recupEmail: this.adminForm.get('description')?.value
    }

    this.adminService.signUpAdmin(admin)
  }
}
