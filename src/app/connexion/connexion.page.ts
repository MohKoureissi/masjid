import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/data/user/user.service';
import { ConnexionService } from 'src/data/login/connexion.service';
@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.page.html',
  styleUrls: ['./connexion.page.scss'],
})
export class ConnexionPage implements OnInit {


  loginForm: FormGroup;
  errorMessage: string | null = null; // Variable pour suivre les messages d'erreur

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

  ngOnInit() {
  }

  onLogin() {
    if (this.loginForm.valid) {
      const formData = this.loginForm.value;
  
      // Utilisez votre service de connexion pour vérifier si l'utilisateur est inscrit
      this.connectionService.checkIfUserIsRegistered(formData.email,formData.password).then((userIsRegistered) => {
        if (userIsRegistered) {
          // L'utilisateur est inscrit, connectez-le
          this.connectionService.connection(formData.email, formData.mdp).subscribe(
            (response: any) => {
              if (response.idToken) {
                // L'authentification a réussi, redirigez l'utilisateur.
                this.router.navigate(['/accueil']);

                console.log(userIsRegistered)
              } else {
                // Gérez les erreurs d'authentification ici.
                this.errorMessage = 'Erreur d\'authentification. Vérifiez vos informations de connexion.';
              }
            },
            (error: any) => {
              // Gérez les erreurs de requête ici.
              this.errorMessage = 'Erreur de requête.';
            }
          );
        } else {
          // L'utilisateur n'est pas inscrit, affichez un message
          this.errorMessage = 'Vous n\'êtes pas inscrit. Veuillez vous inscrire d\'abord.';
        }
      });
    }
  }
  




}















