import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AdminService} from "../../../../data/user/admin.service";
import {ModalController, NavParams} from "@ionic/angular";
import {AdminModel} from "../../../model/admin.model";

@Component({
  selector: 'app-admin-form',
  templateUrl: './admin-form.page.html',
  styleUrls: ['./admin-form.page.scss'],
})
export class AdminFormPage implements OnInit {
  adminForm!: FormGroup;
  imageUrl: string|null = '';
  id: string | undefined;

  file: File|null = null;

  constructor(
    private formBuilder: FormBuilder,
    private adminService: AdminService,
    private modalCtrl: ModalController,
    private navParams: NavParams
  ) { }

  ngOnInit() {
    // Récupérez les valeurs par défaut à partir des queryParams ou des paramètres de la route
    this.id = this.navParams.get('id');
    const fullName = this.navParams.get('fullName');
    this.imageUrl = this.navParams.get('imageUrl');
    const email = this.navParams.get('email');
    const numTel = this.navParams.get('numTel');
    const password = this.navParams.get('password');
    const recupEmail = this.navParams.get('recupEmail');

    this.adminForm = this.formBuilder.group({
      fullName: [fullName, [Validators.required]],
      email: [email, [Validators.required]],
      numTel: [numTel, [Validators.required]],
      password: [password, [Validators.required]],
      recupEmail: [recupEmail, [Validators.required]],
      confirmPassword: [null, [Validators.required]],
    });
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

  addNewAdmin() {
    const admin: AdminModel = {
      id: (this.id == undefined) ? null : this.id,
      fullName: this.adminForm.get('fullName')?.value,
      imageUrl: this.imageUrl,
      email: this.adminForm.get('email')?.value,
      numTel: this.adminForm.get('numTel')?.value,
      password: this.adminForm.get('password')?.value,
      recupEmail: this.adminForm.get('recupEmail')?.value,
    }


    const fileInput = document.getElementById('fileInput') as HTMLInputElement;

    // Vérifiez si un fichier a été sélectionné
    if (fileInput.files && fileInput.files.length > 0) {
      // Récupérez le premier fichier sélectionné
      this.file = fileInput.files[0];

      // Maintenant, vous pouvez utiliser 'file' en toute sécurité
      console.log('Nom du fichier :', this.file.name);
      console.log('Taille du fichier :', this.file.size, 'octets');
    } else {
      // Aucun fichier sélectionné
      console.log('Aucune image sélectionné.');
    }

    if (admin.id == null) {
      this.adminService.signUpAdmin(admin, this.file);
    }
    else {
      this.adminService.updateAdmin(admin, this.file);
    }
    this.closeModal();
  }
}
