import { Component, OnInit } from '@angular/core';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { UserService } from 'src/data/user/user.service';
@Component({
  selector: 'app-oublier',
  templateUrl: './oublier.page.html',
  styleUrls: ['./oublier.page.scss'],
})
export class OublierPage implements OnInit {

  constructor() { }

  ngOnInit() {
   
    this.forgotPassword('email'); 
  }
  forgotPassword(email: string) {
    const auth = getAuth();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        console.log('Vous avez reçu un email de changement de mot de passe');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
       
      });
  }

}
