import { Injectable } from '@angular/core';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';
import { addDoc, collection, getFirestore } from 'firebase/firestore';
import { Announcements } from 'src/app/model/announcement.model';
import { Mosque } from 'src/app/model/mosque.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor() {}
  //create a new UserService
  registerUser(
    fullName: string,
    numTel: string,
    email: string,
    password: string,
    mosques: Mosque[],
    announcements: Announcements[]
  ) {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Signed in
        const user = userCredential.user;
        const db = getFirestore();
        //create doc for user in collection
        const userAdd = await addDoc(collection(db, 'users'), {
          fullName: fullName,
          numTel: numTel,
          email: email,
          mosques: mosques,
          announcements: announcements,
        });
        console.log(
          "Utilisateur enregistré avec succès avec l'ID du document Firestore : ",
          userAdd.id
        );
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.error(
          "Erreur lors de la création de l'utilisateur :",
          errorMessage
        );
      });
  }
  //login user
  async loginUser(email: string, password: string): Promise<void> {
    const auth = getAuth();

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      // Connexion réussie
      const user = userCredential.user;
      console.log('Utilisateur connecté avec succès');

      //si user est ok redirection
    } catch (error: any) {
      const errorCode = error.code;
      const errorMessage = error.message;

      //les messages d'erreurs
      switch (errorCode) {
        case 'auth/user-not-found':
          console.error('Utilisateur non trouvé.');
          break;
        case 'auth/wrong-email':
          console.error('Email de passe incorrect.');
          break;
        case 'auth/wrong-password':
          console.error('Mot de passe incorrect.');
          break;
        default:
          console.error('Erreur de connexion :', errorMessage);
          break;
      }
    }
  }

  //logout user
  logoutUser() {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        console.log("L'utilisateur deconnecte avec success");
      })
      .catch((error) => {
        console.log(error);
      });
  }
  //forgot password envoi de reinitialisation de mot de passe
  forgotPassword(email: string) {
    const auth = getAuth();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        // Password reset email sent!
        console.log('Vous avez recu un email de changement de mot de passe');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  }


  // connect with google

  registerWithGoogleUsers(){
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
signInWithPopup(auth, provider)
  .then((result) => {
    const credential = GoogleAuthProvider.credentialFromResult(result);

    const user = result.user;
    console.log("connexion reussie avec success")

  }).catch((error) => {

    const errorCode = error.code;
    const errorMessage = error.message;
    // si l'email n'est pas correct
    const email = error.customData.email;
    // si l'email est deja utililise
    const credential = GoogleAuthProvider.credentialFromError(error);

  });
  }
  //send Email verification
  // sendEmailVerification(){

  // const auth = getAuth();
  //   sendEmailVerification(auth.currentUser)
  //   .then(() => {
  //     // Email verification sent!
  //     // ...
  //   });
  // }
  //abonnement user a mosque
}
