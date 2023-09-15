import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import * as firebase from 'firebase/app';
import { InscriptionService } from 'src/data/inscription/inscription.service';

@Component({
  selector: 'app-inscriptionuser',
  templateUrl: './inscriptionuser.page.html',
  styleUrls: ['./inscriptionuser.page.scss'],
})
export class InscriptionuserPage implements OnInit {

  registrationForm: FormGroup;

  constructor(private fb: FormBuilder, private inscriptionService:InscriptionService) {
    this.registrationForm = this.fb.group({
      nom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mdp: ['', Validators.required],
      confirm: ['', Validators.required], // Vous devrez ajouter la logique pour vérifier si les mots de passe correspondent
    });
  }
  onRegister() {
  if (this.registrationForm.valid) {
    const formData = this.registrationForm.value;
    console.log('Données du formulaire :', formData);
  }
}

  
  ngOnInit() {
  }

  
}
