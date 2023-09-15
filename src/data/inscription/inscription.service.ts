import { Injectable } from '@angular/core';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InscriptionService {

  constructor() { }

  async createInscription(inscriptionData: any): Promise<void> {
    try {
      const db = getFirestore();
      const inscriptionRef = doc(db, 'inscriptions', inscriptionData.email); 


      await setDoc(inscriptionRef, {
        nom: inscriptionData.nom,
        email: inscriptionData.email,
        mdp: inscriptionData.mdp,
      });

      console.log('Inscription réussie !');
    } catch (error) {
      console.error('Erreur lors de l\'inscription :', error);
    }
  }
}
