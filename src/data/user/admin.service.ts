import { Injectable } from '@angular/core';
import {
  getAuth, createUserWithEmailAndPassword,
  signInWithEmailAndPassword, signOut, updateEmail,
  updatePassword, updateProfile, sendPasswordResetEmail, deleteUser } from "firebase/auth";
import { getFirestore, setDoc, doc } from 'firebase/firestore';
import { Firestore } from "@angular/fire/firestore";
import {AdminModel} from "../../app/model/admin.model";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private firestore: Firestore) { }

  getNewEmailCode() {
    let combination = '';
    for (let i = 0; i < 4; i++) {
      const randomDigit = Math.floor(Math.random() * 10); // Génère un chiffre aléatoire entre 0 à 9
      combination += randomDigit.toString(); // Ajoute le chiffre à la combinaison en tant que chaîne de caractères
    }
    return combination+='_';
  }
  signUpAdmin(newAdmin: AdminModel) {
    //fullName: string, email:string, numTel:string, password:string, recupEmail:string
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, newAdmin.email, newAdmin.password)
      .then((userCredential) => {
        // Signed in
        const admin = userCredential.user;
        const db = getFirestore();

        // Génération de code unique pour l'email et la password du nouveau administrateur
        const emailCode = this.getNewEmailCode();
        const passwordCode = this.getNewEmailCode();

        // Création du nouvel administrateur avec comme nom de document de l'admin sont identifiant
        setDoc(doc(db, "admins", admin.uid), {
          id:admin.uid,
          fullName: newAdmin.fullName,
          numTel: newAdmin.numTel,
          email: newAdmin.email,
          emailCode:emailCode,
          passwordCode:passwordCode,
          recupEmail: newAdmin.recupEmail
        });

        console.log('Administrateur enregistré avec succès avec ');
      })
      .catch((error) => {

        const errorMessage = error.message;
        console.error('Erreur lors de la création de l\'admin :', errorMessage);
      });
  }

  signInAdmin(email: string, password: string) {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log("Connexion reussi !");
        console.log("Bienvenue " + user.email);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode === 'auth/wrong-password') {
          console.log('Erreur : Mot de passe incorrect.');
        } else {
          console.error('Erreur inattendue :', errorMessage);
        }
      });
  }

  signOutAdmin() {
    const auth = getAuth();
    signOut(auth).then(() => {
      console.log("Deconnexion reussie !");
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("Erreur: impossible de se deconnecté.",errorCode, errorMessage );
    });
  }

  updateAdmin(updateAdmin: AdminModel) {
    //fullName: string, numTel: string, email: string, password: string, id: string
    const db = getFirestore();
    //this.updateEmail(email);
    //this.updatePassword(password);
    //this.updateBasicInfo(fullName);
    setDoc(doc(db, "admins", updateAdmin.id!), {
      fullName: updateAdmin.fullName,
      numTel: updateAdmin.numTel,
      email: updateAdmin.email,
      password: updateAdmin.password,
      id: updateAdmin.id,
      emailCode: updateAdmin.emailCode,
      passwordCode: updateAdmin.passwordCode,
      recupEmail: updateAdmin.recupEmail
    });
  }

  updateEmail(newEmail: string) {
    const auth = getAuth();
    if (auth.currentUser) {
      updateEmail(auth.currentUser, newEmail).then(() => {
        // Email updated!
        // ...
      }).catch((error) => {
        // An error occurred
        // ...
      });
    }
  }

  updatePassword(newPassword: string) {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      updatePassword(user, newPassword).then(() => {
        console.log("Mot de passe mis à jour !");
      }).catch((error) => {
       const errorCode = error.code;
       const errorMessage = error.message;
       console.log("Erreur: impossible de mettre à jour le mot de passe.", errorCode, errorMessage);
      });
    }

  }

  updateBasicInfo(displayName: string) {
    const auth = getAuth();
    if (auth.currentUser) {
      updateProfile(auth.currentUser, {
        displayName: displayName
      }).then(() => {
      }).catch((error) => {
        console.log("Erreur: impossible de mettre à jour le nom.", error);
      });
    }
  }

  sendPasswordResetEmail(email: string) {
    const auth = getAuth();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        console.log("Email de reinitialisation du mot de passe envoyé !");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("Erreur: impossible d'envoyer l'email de reinitialisation du mot de passe.", errorCode, errorMessage);
      });

  }

  deleteAdmin() {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      deleteUser(user).then(() => {
        // User deleted.
      }).catch((error) => {
        // An error ocurred
        // ...
      });
    }
  }

  /*reauthenticateAdmin(email: string, password: string) {
    const auth = getAuth();
    const user = auth.currentUser;

    const credential = {email: email, password: password};

    if (user) {
      reauthenticateWithCredential(user, credential).then(() => {
        // User re-authenticated.
      }).catch((error) => {
        // An error ocurred
        // ...
      });
    }

  }*/
}
