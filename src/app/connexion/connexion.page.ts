import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/data/user/user.service';
import { ConnexionService } from 'src/data/login/connexion.service';
import { getAuth, signInWithEmailAndPassword, Auth } from 'firebase/auth';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.page.html',
  styleUrls: ['./connexion.page.scss'],
})
export class ConnexionPage implements OnInit {

loginForm: FormGroup;
  errorMessage: string | null = null; // Variable pour suivre les messages d'erreur

  constructor(private fb: FormBuilder,private connectionService: ConnexionService,private router: Router)
  
  {
    
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      mdp: ['', Validators.required],
    });
  }

  async onLogin() {
    if (this.loginForm.valid) {
      const formData = this.loginForm.value;
  
      try {
        const user = await this.connectionService.signInWithEmailAndPassword(formData.email, formData.mdp);
        // L'utilisateur est connecté avec succès ici
        console.log('Utilisateur connecté :', user);
  
        // Redirigez l'utilisateur vers la page souhaitée (par exemple, la page d'accueil)
        this.router.navigate(['/home']);
      } catch (error) {
        // Gérez les erreurs d'authentification ici.
        this.errorMessage = 'Erreur d\'authentification. Vérifiez vos informations de connexion.';
      }
    }
  }
  

  ngOnInit(): void {
      
  }

  
  
}





  










  // constructor(private userService: UserService, private fb: FormBuilder, // Injectez FormBuilder
  // private router: Router) { }
  // loginForm: FormGroup = new FormGroup({}); // Remplacez par la configuration de votre formulaire

  // errorMessage: string | null = null;
  // ngOnInit() {
  //   // Initialisez le formulaire réactif ici
  //   this.loginForm = this.fb.group({
  //     email: ['', [Validators.required, Validators.email]],
  //     mdp: ['', Validators.required],
  //   });
  // }
  // onLogin() {
  //   if (this.loginForm) {
  //     const emailControl = this.loginForm.get('email');
  //     const passwordControl = this.loginForm.get('mdp');
  
  //     if (emailControl && passwordControl) {
  //       const email = emailControl.value;
  //       const password = passwordControl.value;
  
  //       this.userService.loginUser(email, password)
  //         .then(() => {
  //           this.router.navigate(['./home']); // Remplacez '/accueil' par le chemin souhaité
  //         })
  //         .catch((error) => {
  //           // La connexion a échoué, affichez l'erreur si nécessaire
  //           this.errorMessage = error.message;
  //         });
  //     }
  //   }


