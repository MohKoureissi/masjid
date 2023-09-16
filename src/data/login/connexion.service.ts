import { Injectable } from '@angular/core';
import { getFirestore, doc, setDoc,  collection, getDoc,deleteDoc,updateDoc, getDocs,DocumentSnapshot } from 'firebase/firestore';
import {Observable, of} from "rxjs";
import { getAuth, signInWithEmailAndPassword, Auth } from 'firebase/auth';
@Injectable({
  providedIn: 'root'
})
export class ConnexionService {
  private auth: Auth; 
constructor(){
  this.auth = getAuth();
}

async signInWithEmailAndPassword(email: string, mdp: string): Promise<any> {
  try {
    const userCredential = await signInWithEmailAndPassword(this.auth, email, mdp);
    return userCredential.user; // Retourne l'utilisateur connecté
  } catch (error) {
    console.error('Erreur lors de la connexion :', error);
    throw error; // Lancez l'erreur pour la gérer dans le composant de connexion
  }
}





}













// async checkIfUserIsRegistered(email: string,mdp:string): Promise<boolean> {
  //   try {
  //     const db = getFirestore();
  //     console.log(email);
  //     const userDocRef = doc(db, 'login', email, mdp);
  
  //     const userDocSnapshot: DocumentSnapshot = await getDoc(userDocRef);
  
  //     const isRegistered = userDocSnapshot.exists();
  //     console.log(`L'utilisateur avec l'e-mail ${email} est enregistré : ${isRegistered}`);
  
  //     return isRegistered;
  //   } catch (error) {
  //     console.error('Erreur lors de la vérification de l\'utilisateur :', error);
  //     return false;
  //   }
  // }
  
  // // connection(email: string, mdp: string): Observable<any> {
    
  // //   return new Observable((observer) => {
    
  // //     if (email === this.email.inscriptionService && mdp === this.mdp.inscriptionService) {
  // //       observer.next({ idToken: 'jeton_d_authentification' });
  // //       observer.complete();
  // //     } else {
  // //       observer.error('Erreur d\'authentification');
  // //     }
  // //   });
  // // }