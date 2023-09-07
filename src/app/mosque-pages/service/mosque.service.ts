import { Injectable } from '@angular/core';
import { getFirestore, doc, setDoc,  collection } from 'firebase/firestore';
import { Mosque } from 'src/app/model/mosque.model';
@Injectable({
  providedIn: 'root'
})
export class MosqueService {

  constructor() { }

  async createMosque(mosque: Mosque): Promise<void> {
    try {
      const db = getFirestore();
      const mosqueCollectionRef = collection(db, 'mosques');

      // Ajoutez la nouvelle mosquée à la collection "mosques"
      const newMosqueRef = doc(mosqueCollectionRef);
      await setDoc(newMosqueRef, mosque);

      console.log(`Mosquée créée avec succès avec l'ID : ${newMosqueRef.id}`);
    } catch (error) {
      console.error('Erreur lors de la création de la mosquée :', error);
      throw error; // Vous pouvez gérer l'erreur de manière appropriée ici
    }
  }
}
