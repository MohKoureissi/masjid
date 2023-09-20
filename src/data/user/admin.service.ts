import { Injectable } from '@angular/core';
import {
  getAuth, createUserWithEmailAndPassword,
  signInWithEmailAndPassword, signOut, updateEmail,
  updatePassword, updateProfile, sendPasswordResetEmail, deleteUser } from "firebase/auth";
import {getFirestore, setDoc, doc, collection, getDocs, getDoc, deleteDoc, updateDoc} from 'firebase/firestore';
import { Firestore } from "@angular/fire/firestore";
import {AdminModel} from "../../app/model/admin.model";
import {Observable, of} from "rxjs";
import {getDownloadURL, getStorage, ref, uploadBytes} from "firebase/storage";

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  COLLECTION_NAME = 'admins';
  defaultImageUrl: string = '';
  constructor(private firestore: Firestore) { }

  getNewEmailCode() {
    let combination = '';
    for (let i = 0; i < 4; i++) {
      const randomDigit = Math.floor(Math.random() * 10); // Génère un chiffre aléatoire entre 0 à 9
      combination += randomDigit.toString(); // Ajoute le chiffre à la combinaison en tant que chaîne de caractères
    }
    return combination+='_';
  }
  async signUpAdmin(newAdmin: AdminModel, imageFile: File|null) {
    //fullName: string, email:string, numTel:string, password:string, recupEmail:string
    const auth = getAuth();
    try {
      createUserWithEmailAndPassword(auth, newAdmin.email, newAdmin.password)
        .then(async (userCredential) => {
          // Signed in
          const admin = userCredential.user;
          const db = getFirestore();


          if (imageFile != null) {
            await this.loadAdminImage(imageFile).then(url => {
              newAdmin.imageUrl = url;
            });
            console.log(newAdmin.imageUrl)
          }
          newAdmin.imageUrl = (newAdmin.imageUrl != null && newAdmin.imageUrl != '') ? newAdmin.imageUrl : this.defaultImageUrl;


          // Création du nouvel administrateur avec comme nom de document de l'admin sont identifiant
          setDoc(doc(db, `${this.COLLECTION_NAME}`, admin.uid), {
            id: admin.uid,
            fullName: newAdmin.fullName,
            numTel: newAdmin.numTel,
            email: newAdmin.email,
            imageUrl: newAdmin.imageUrl,
            recupEmail: newAdmin.recupEmail
          });

          console.log('Administrateur enregistré avec succès avec ');
        })
        .catch((error) => {

          const errorMessage = error.message;
          console.error('Erreur lors de la création de l\'admin :', errorMessage);
        });
    }catch (error){
      console.log(error);
    }
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

  async updateAdmin(updateAdmin: AdminModel|any, imageFile: File | null) {
    try {
      const db = getFirestore();
      const adminDocRef = doc(db, `${this.COLLECTION_NAME}`, updateAdmin.id!);

      // Vérifiez si l'annonce existe dans la base de données
      const adminSnap = await getDoc(adminDocRef);

      if (adminSnap.exists()) {
        if(imageFile != null){
          await this.loadAdminImage(imageFile).then(url =>{
            updateAdmin.imageUrl = url;
          });
          console.log(updateAdmin.imageUrl)
        }
        updateAdmin.imageUrl = (updateAdmin.imageUrl != null && updateAdmin.imageUrl != '')? updateAdmin.imageUrl:this.defaultImageUrl;


        // L'annonce existe, mettez à jour les données
        await updateDoc(adminDocRef, updateAdmin);

        console.log(`Annonce avec l'ID ${updateAdmin.id} mise à jour avec succès`);
      } else {
        console.log(`L'annonce avec l'ID ${updateAdmin.id} n'existe pas.`);
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l\'annonce :', error);
      throw error; // Vous pouvez gérer l'erreur de manière appropriée ici
    }
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

  async deleteAdmin(adminId: string) {
    try {
      const db = getFirestore();
      const adminDocRef = doc(db, `${this.COLLECTION_NAME}`, adminId);

      // Vérifiez si l'annonce existe dans la base de données
      const adminSnap = await getDoc(adminDocRef);

      if (adminSnap.exists()) {
        // L'annonce existe, supprimez-la
        await deleteDoc(adminDocRef);

        console.log(`Annonce avec l'ID ${adminId} supprimée avec succès`);
      } else {
        console.log(`L'annonce avec l'ID ${adminId} n'existe pas.`);
      }
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'annonce :', error);
      throw error; // Vous pouvez gérer l'erreur de manière appropriée ici
    }





    /*const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      deleteUser(user).then(() => {
        // User deleted.
      }).catch((error) => {
        // An error ocurred
        // ...
      });
    }*/
  }

  async getAdmins(): Promise<Observable<AdminModel[]>>{
    const db = getFirestore();
    const adminsCollectionRef = collection(db, `${this.COLLECTION_NAME}`);

    try {
      const aadminsSnap = await getDocs(adminsCollectionRef);
      const admins: AdminModel[] = [];
      aadminsSnap.forEach((doc) => {
        admins.push(doc.data() as AdminModel);
      });
      return of(admins);
    }catch (error){
      console.log(error);
      return of([]);
    }

  }


  async loadAdminImage(file: File): Promise<string | null> {
    const storage = getStorage();
    let imageUrl: string|null = null;
    const adminRef = await ref(storage, `${this.COLLECTION_NAME}/${file.name}`);
    uploadBytes(adminRef, file).then((snapshot) => {
      console.log('Fichier uploadé avec succès !');
    });

    await getDownloadURL(adminRef).then((url) => {
      // `url` est l'URL de téléchargement de notre récitation
      imageUrl = url
    })
      .catch((error) => {
        // Handle any errors
      });
    return imageUrl;
  }

}
