import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConnexionService } from 'src/data/login/connexion.service';
import { Router } from '@angular/router';
import { IonIcon } from '@ionic/angular';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.page.html',
  styleUrls: ['./connexion.page.scss'],
})
export class ConnexionPage implements OnInit {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private connectionService: ConnexionService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      mdp: ['', Validators.required],
    });
  }

  ngOnInit() {}

  onLogin() {
    if (this.loginForm.valid) {
      const formData = this.loginForm.value;
      this.connectionService.login(formData.email, formData.mdp).subscribe(
        (response: any) => { // Utilisation de 'any' pour éviter les erreurs de typage
          if (response.idToken) {
            // L'authentification a réussi, redirigez l'utilisateur.
            this.router.navigate(['/accueil']);
          } else {
            // Gérez les erreurs d'authentification ici.
          }
        },
        (error) => {
          // Gérez les erreurs de requête ici.
        }
      );
    }
}
}
