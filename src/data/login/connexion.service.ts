import { Injectable } from '@angular/core';
import { getFirestore, doc, setDoc,  collection, getDoc,deleteDoc,updateDoc, getDocs,DocumentSnapshot } from 'firebase/firestore';
import {Observable, of} from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class ConnexionService {
  
constructor(){}

async checkIfUserIsRegistered(email: string,paswword:string): Promise<boolean> {
  try {
    const db = getFirestore();
    console.log(email);
    const userDocRef = doc(db, 'inscriptions', email);

    const userDocSnapshot: DocumentSnapshot = await getDoc(userDocRef);

    const isRegistered = userDocSnapshot.exists();
    console.log(`L'utilisateur avec l'e-mail ${email} est enregistré : ${isRegistered}`);

    return isRegistered;
  } catch (error) {
    console.error('Erreur lors de la vérification de l\'utilisateur :', error);
    return false;
  }
}

connection(email: string, password: string): Observable<any> {
  
  return new Observable((observer) => {
    // Remplacez cette logique par votre propre logique d'authentification.
    if (email === 'utilisateur@test.com' && password === 'motdepasse') {
      observer.next({ idToken: 'jeton_d_authentification' });
      observer.complete();
    } else {
      observer.error('Erreur d\'authentification');
    }
  });
}


}

