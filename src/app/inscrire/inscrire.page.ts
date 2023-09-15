import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InscriptionService } from 'src/data/inscription/inscription.service';

@Component({
  selector: 'app-inscrire',
  templateUrl: './inscrire.page.html',
  styleUrls: ['./inscrire.page.scss'],
})
export class InscrirePage implements OnInit {
  registrationForm: FormGroup;
  inscriptionSuccess = false; // Variable pour suivre l'état de l'inscription réussie
  errorMessage: string | null = null; // Variable pour suivre les messages d'erreur

  constructor(private fb: FormBuilder, private inscriptionService: InscriptionService) {
    // Initialisation du formulaire
    this.registrationForm = this.fb.group({
      nom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mdp: ['', Validators.required],
      confirm: ['', Validators.required],
    });
  }

  onRegister() {
    if (this.registrationForm.valid) {
      const formData = this.registrationForm.value;

      if (formData.mdp === formData.confirm) {
        // Les mots de passe correspondent, vous pouvez enregistrer les données
        this.inscriptionService.createInscription(formData).then(() => {
          console.log('Inscription réussie !');
          this.inscriptionSuccess = true; // Définir l'état de réussite sur true
          this.errorMessage = null; // Effacer tout message d'erreur précédent
        }).catch((error) => {
          console.error('Erreur lors de l\'inscription :', error);
          this.inscriptionSuccess = false; // Définir l'état de réussite sur false en cas d'erreur
          this.errorMessage = 'Une erreur s\'est produite lors de l\'inscription.'; // Définir le message d'erreur
        });
      } else {
        // Les mots de passe ne correspondent pas, affichez une erreur
        console.error('Les mots de passe ne correspondent pas');
        this.inscriptionSuccess = false; // Définir l'état de réussite sur false
        this.errorMessage = 'Les mots de passe ne correspondent pas.'; // Définir le message d'erreur
      }
    }
  }

  ngOnInit() {}
}
