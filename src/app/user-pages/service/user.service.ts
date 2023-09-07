import { getDoc } from 'firebase/firestore';
import { Users } from './../../model/user.model';
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

import { addDoc, collection,updateDoc,doc, arrayRemove,getFirestore, setDoc } from 'firebase/firestore';
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
  async subscribeToMosque(userId: string, mosque: Mosque): Promise<void> {
    try {
      const db = getFirestore();
      const userDocRef = doc(db, 'users', userId);

      // Vérifiez si l'utilisateur existe dans la base de données
      const userSnap = await getDoc(userDocRef);

      if (userSnap.exists()) {
        // L'utilisateur existe, récupérez ses données
        const userData: Users = userSnap.data() as Users;

        // Vérifiez si l'utilisateur est déjà abonné à cette mosquée
        const isAlreadySubscribed = userData.subscribedMosques.some(
          (m) => m.id === mosque.id
        );

        if (!isAlreadySubscribed) {
          // Si l'utilisateur n'est pas déjà abonné, ajoutez la mosquée à sa liste d'abonnements
          userData.subscribedMosques.push(mosque);

          // Mettez à jour les données de l'utilisateur dans la base de données
          await setDoc(userDocRef, userData);

          console.log(`L'utilisateur ${userId} s'est abonné à la mosquée ${mosque.name}`);
        } else {
          console.log(`L'utilisateur ${userId} est déjà abonné à la mosquée ${mosque.name}`);
        }
      } else {
        console.log(`L'utilisateur avec l'ID ${userId} n'existe pas.`);
      }
    } catch (error) {
      console.error('Erreur lors de l\'abonnement à la mosquée :', error);
      throw error; // Vous pouvez gérer l'erreur de manière appropriée ici
    }
  }

  //methode desabonne
  async unsubscribeFromMosque(userId: string, mosque: Mosque): Promise<void> {
    try {
      const db = getFirestore();
      const userDocRef = doc(db, 'users', userId);

      // Récupérez l'utilisateur actuel depuis la base de données
      const userSnap = await getDoc(userDocRef);

      if (userSnap.exists()) {
        const userData: Users = userSnap.data() as Users;

        // Vérifiez si l'utilisateur est abonné à cette mosquée
        const isSubscribed = userData.mosques.some((m) => m.id === mosque.id);

        if (isSubscribed) {
          // Si l'utilisateur est abonné, supprimez la mosquée de sa liste d'abonnements
          const updatedMosques = userData.mosques.filter((m) => m.id !== mosque.id);
          await updateDoc(userDocRef, {
            mosques: updatedMosques
          });

          console.log(`L'utilisateur ${userId} s'est désabonné de la mosquée ${mosque.id}`);
        } else {
          console.log(`L'utilisateur ${userId} n'est pas abonné à la mosquée ${mosque.id}`);
        }
      } else {
        console.log(`L'utilisateur avec l'ID ${userId} n'existe pas.`);
      }
    } catch (error) {
      console.error('Erreur lors de la désinscription de la mosquée :', error);
    }
  }
}
