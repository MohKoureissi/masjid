import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { InscriptionService } from 'src/data/inscription/inscription.service';
import { ReactiveFormsModule } from '@angular/forms';
import * as firebase from 'firebase/app';
@Component({
  selector: 'app-inscriptionuser',
  templateUrl: './inscriptionuser.page.html',
  styleUrls: ['./inscriptionuser.page.scss'],
})
export class InscriptionuserPage implements OnInit {
  // registrationForm: FormGroup;

  // constructor(private fb: FormBuilder) {
  //   this.registrationForm = this.fb.group({
  //     nom: ['', Validators.required],
  //     email: ['', [Validators.required, Validators.email]],
  //     mdp: ['', Validators.required],
  //     confirm: ['', Validators.required],
  //   });
  // }

  onRegister() {
    // if (this.registrationForm.valid) {
    //   const formData = this.registrationForm.value;

    //   console.log('Formulaire soumis', formData);
    // } else {
      
    // }
  }
  
  ngOnInit() {
  }

  onSubmit(){
// this.onRegister()
  }
}
