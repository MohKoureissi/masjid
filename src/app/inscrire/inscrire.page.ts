import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InscriptionService } from 'src/data/inscription/inscription.service';
import { getAuth, createUserWithEmailAndPassword, Auth } from 'firebase/auth';

@Component({
  selector: 'app-inscrire',
  templateUrl: './inscrire.page.html',
  styleUrls: ['./inscrire.page.scss'],
})
export class InscrirePage implements OnInit {
  registrationForm: FormGroup;
  inscriptionSuccess = false; // Variable pour suivre l'état de l'inscription réussie
  errorMessage: string | null = null; // Variable pour suivre les messages d'erreur

  auth: Auth; // Ajoutez une variable pour gérer l'authentification Firebase

  constructor(private fb: FormBuilder, private inscriptionService: InscriptionService) {
    // Initialisation du formulaire
    this.registrationForm = this.fb.group({
      nom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mdp: ['', Validators.required],
      confirm: ['', Validators.required],
    });

    // Initialisez l'authentification Firebase
    this.auth = getAuth();
  }

  onRegister() {
    if (this.registrationForm.valid) {
      const formData = this.registrationForm.value;

      if (formData.mdp === formData.confirm) {
        // Les mots de passe correspondent, vous pouvez créer un nouvel utilisateur
        createUserWithEmailAndPassword(this.auth, formData.email, formData.mdp)
          .then((userCredential) => {
            // L'utilisateur est créé avec succès. Vous pouvez gérer la suite ici.
            const user = userCredential.user;
            console.log('Utilisateur créé avec succès', user);

            // Enregistrez d'autres informations d'utilisateur si nécessaire, par exemple, dans Firestore.
            this.inscriptionService.createInscription(formData).then(() => {
              console.log('Inscription réussie !');
              this.inscriptionSuccess = true;
              this.errorMessage = null;
            }).catch((error) => {
              console.error('Erreur lors de l\'inscription :', error);
              this.inscriptionSuccess = false;
              this.errorMessage = 'Une erreur s\'est produite lors de l\'inscription.';
            });
          })
          .catch((error) => {
            // Gérez les erreurs lors de la création de l'utilisateur ici.
            console.error('Erreur lors de la création de l\'utilisateur', error);
            this.inscriptionSuccess = false;
            this.errorMessage = 'Une erreur s\'est produite lors de la création de l\'utilisateur.';
          });
      } else {
        // Les mots de passe ne correspondent pas, affichez une erreur
        console.error('Les mots de passe ne correspondent pas');
        this.inscriptionSuccess = false;
        this.errorMessage = 'Les mots de passe ne correspondent pas.';
      }
    }
  }

  ngOnInit() {}
}
