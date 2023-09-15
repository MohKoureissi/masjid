import { Firestore, getDoc, getDocs, query } from 'firebase/firestore';
import { Users } from 'src/app/model/user.model';
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

import { addDoc, collection,updateDoc,doc, arrayRemove,getFirestore, setDoc,DocumentData } from 'firebase/firestore';
import { Announcement} from 'src/app/model/announcement.model';
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
    announcements: Announcement[]
  ) {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Signed in
        const user = userCredential.user;
        const db = getFirestore();
        //create doc for user in collection
        await addDoc(collection(db, 'users',user.uid), {
          id:user.uid,
          fullName: fullName,
          numTel: numTel,
          email: email,
          mosques: mosques,
          announcements: announcements,
        });
        console.log(
          "Utilisateur enregistré avec succès avec l'ID du document Firestore : ",
          // userAdd.id
          user.uid
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
      console.log('Utilisateur connecté avec succès avec ');



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
  async abonneMosque(userId: string, mosqueId: string): Promise<void> {
    try {
      const db = getFirestore();
      const userDocRef = doc(db, 'users', userId);


      // Récupérer les données de l'utilisateur
      const userSnap = await getDoc(userDocRef);

      if (userSnap.exists()) {
        const userData: any = userSnap.data();

        // Vérifier si l'utilisateur est déjà abonné à la mosquée
        if (!userData.mosques.includes(mosqueId)) {
          // Si l'utilisateur n'est pas déjà abonné, ajoutez l'ID de la mosquée à son tableau d'abonnements
          userData.mosques.push(mosqueId);

          // Mettez à jour le document de l'utilisateur dans Firestore
          await setDoc(userDocRef, userData);

          console.log(`L'utilisateur ${userId} s'est abonné à la mosquée ${mosqueId}`);
        } else {
          console.log(`L'utilisateur ${userId} est déjà abonné à la mosquée ${mosqueId}`);
        }
      } else {
        console.log('L\'utilisateur n\'existe pas.');
      }
    } catch (error) {
      console.error('Erreur lors de l\'abonnement de l\'utilisateur à la mosquée :', error);
      throw error;
    }
  }
  //methode desabonneMosque
  async desabonneMosque(userId: string, mosqueId: string): Promise<void> {
    try {
      const db = getFirestore();
      const userDocRef = doc(db, 'users', userId);

      // Récupérer les données de l'utilisateur
      const userSnap = await getDoc(userDocRef);

      if (userSnap.exists()) {
        const userData: any = userSnap.data();

        // Vérifier si l'utilisateur est abonné à la mosquée
        if (userData.mosques.includes(mosqueId)) {
          // Si l'utilisateur est abonné, retirez l'ID de la mosquée de son tableau d'abonnements
          userData.mosques = userData.mosques.filter((id: string) => id !== mosqueId);

          // Mettez à jour le document de l'utilisateur dans Firestore
          await setDoc(userDocRef, userData);

          console.log(`L'utilisateur ${userId} s'est désabonné de la mosquée ${mosqueId}`);
        } else {
          console.log(`L'utilisateur ${userId} n'est pas abonné à la mosquée ${mosqueId}`);
        }
      } else {
        console.log('L\'utilisateur n\'existe pas.');
      }
    } catch (error) {
      console.error('Erreur lors de la désinscription de l\'utilisateur à la mosquée :', error);
      throw error;
    }
  }

//abonnement user a une annonce
async abonneAnnonce(userId: string, announcementId: string): Promise<void> {
  try {
    const db = getFirestore();
    const userDocRef = doc(db, 'users', userId);


    // Récupérer les données de l'utilisateur
    const userSnap = await getDoc(userDocRef);

    if (userSnap.exists()) {
      const userData: any = userSnap.data();

      // Vérifier si l'utilisateur est déjà abonné à la mosquée
      if (!userData.announcements.includes(announcementId)) {
        // Si l'utilisateur n'est pas déjà abonné, ajoutez l'ID de la mosquée à son tableau d'abonnements
        userData.announcements.push(announcementId);

        // Mettez à jour le document de l'utilisateur dans Firestore
        await setDoc(userDocRef, userData);

        console.log(`L'utilisateur ${userId} s'est abonné à l'annonce ${announcementId}`);
      } else {
        console.log(`L'utilisateur ${userId} est déjà abonné à la l'annonce ${announcementId}`);
      }
    } else {
      console.log('L\'utilisateur n\'existe pas.');
    }
  } catch (error) {
    console.error('Erreur lors de l\'abonnement de l\'utilisateur à l\'annonce :', error);
    throw error;
  }
}
  //methode desabonneAnconne
  async desabonneAnnonce(userId: string, announcementId: string): Promise<void> {
    try {
      const db = getFirestore();
      const userDocRef = doc(db, 'users', userId);

      // Récupérer les données de l'utilisateur
      const userSnap = await getDoc(userDocRef);

      if (userSnap.exists()) {
        const userData: any = userSnap.data();

        // Vérifier si l'utilisateur est abonné à la mosquée
        if (userData.announcements.includes(announcementId)) {
          // Si l'utilisateur est abonné, retirez l'ID de la mosquée de son tableau d'abonnements
          userData.announcements = userData.announcements.filter((id: string) => id !== announcementId);

          // Mettez à jour le document de l'utilisateur dans Firestore
          await setDoc(userDocRef, userData);

          console.log(`L'utilisateur ${userId} s'est désabonné  à l\'annonce ${announcementId}`);
        } else {
          console.log(`L'utilisateur ${userId} n'est pas abonné à  à l\'annonce ${announcementId}`);
        }
      } else {
        console.log('L\'utilisateur n\'existe pas.');
      }
    } catch (error) {
      console.error('Erreur lors de la désinscription de l\'utilisateur  à l\'annonce :', error);
      throw error;
    }
  }

  //methode pur recuperer la liste des users
  async getListeUsers(): Promise<DocumentData[]> {
    try {
      const db: Firestore = getFirestore();
      const usersCollection = collection(db, 'users');
      const usersQuery = query(usersCollection);

      const querySnapshot = await getDocs(usersQuery);
      const users: DocumentData[] = [];

      querySnapshot.forEach((doc) => {
        users.push(doc.data());
      });
// console.log(users);
      return users;
    } catch (error) {
      console.error('Erreur lors de la récupération de la liste des utilisateurs :', error);
      throw error;
    }
  }

 //methode pur recuperer un user specifique
  async getUserById(userId: string): Promise<DocumentData | null> {
    try {
      const db: Firestore = getFirestore();
      const userDocRef = doc(db, 'users', userId);

      const userDocSnapshot = await getDoc(userDocRef);

      if (userDocSnapshot.exists()) {
         const user= userDocSnapshot.data();
// console.log(user);

         return user
      } else {
        console.log(`L'utilisateur avec l'ID ${userId} n'existe pas.`);
        return null;
      }
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'utilisateur par ID :', error);
      throw error;
    }
  }
}
