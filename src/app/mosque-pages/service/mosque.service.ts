import { Injectable } from '@angular/core';
import { getFirestore, doc, setDoc,  collection ,getDoc,updateDoc,deleteDoc} from 'firebase/firestore';
import { Mosque } from 'src/app/model/mosque.model';
@Injectable({
  providedIn: 'root'
})
export class MosqueService {

  constructor() { }
//Methode pour ajouter une mosque
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
// update mosquee
  async updateMosque(mosqueId:string,updateMosque:Mosque|any): Promise<void> {
    try{
        const db = getFirestore();
        const mosqueCollectionRef = doc(db, 'mosques',mosqueId);
        // Vérifiez si la mosquee existe dans la base de données
      const mosqueSnap = await getDoc(mosqueCollectionRef);

      if (mosqueSnap.exists()) {
        // La mosquee existe, mettez à jour les données
        await updateDoc(mosqueCollectionRef, updateMosque);

        console.log(`Mosquee avec l'ID ${mosqueId} mise à jour avec succès`);
      } else {
        console.log(`Mosquee avec l'ID ${mosqueId} n'existe pas.`);
      }
     }catch (error) {
      console.error('Erreur lors de la mise à jour de la mosquee :', error);
      throw error; // Vous pouvez gérer l'erreur de manière appropriée ici
    }
  }

  // delete mosque
  async deleteMosque(mosqueId: string): Promise<void> {
    try {
      const db = getFirestore();
      const mosqueDocRef = doc(db, 'mosques', mosqueId);

      // Vérifiez si la mosquee existe dans la base de données
      const mosqueSnap = await getDoc(mosqueDocRef);

      if (mosqueSnap.exists()) {
        // L'annonce existe, supprimez-la
        await deleteDoc(mosqueDocRef);

        console.log(`Mosquee avec l'ID ${mosqueId} supprimée avec succès`);
      } else {
        console.log(`Mosquee avec l'ID ${mosqueId} n'existe pas.`);
      }
    } catch (error) {
      console.error('Erreur lors de la suppression de la mosquee :', error);
      throw error; // Vous pouvez gérer l'erreur de manière appropriée ici
    }
  }

}
