import { Injectable, OnInit } from '@angular/core';
import { getFirestore, doc, setDoc,getDocs,where, query, collection ,getDoc,updateDoc,deleteDoc,QuerySnapshot} from 'firebase/firestore';
import { Mosque } from 'src/app/model/mosque.model';

@Injectable({
  providedIn: 'root'
})
export class MosqueService implements OnInit {


  constructor() { }
  ngOnInit(): void {

  }
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


//filter mosque
async filter(name?: string, location?: string): Promise<Mosque[]> {
  try {
    const db = getFirestore();
    const mosqueCollectionRef = collection(db, 'mosques');

    // Créez une requête pour filtrer les mosquées
    let filteredQuery = query(mosqueCollectionRef);

    // Ajoutez les critères de recherche si les paramètres sont définis
    if (name) {
      filteredQuery = query(filteredQuery, where('name', '==', name));
    }
    if (location) {
      filteredQuery = query(filteredQuery, where('location', '==', location));
    }

    // Exécutez la requête
    const querySnapshot: QuerySnapshot = await getDocs(filteredQuery);

    // Parcourez les résultats de la requête et convertissez-les en tableau de mosquées
    const mosques: Mosque[] = [];
    querySnapshot.forEach((doc) => {
      const mosqueData = doc.data() as Mosque;
      mosques.push(mosqueData);
    });

    console.log(mosques)
    return mosques;


  } catch (error) {
    console.error('Erreur lors de la recherche de mosquées :', error);
    throw error; // Vous pouvez gérer l'erreur de manière appropriée ici
  }
}


// Fonction pour récupérer les informations d'une mosquée spécifique par son ID
async getDetailsMosque(mosqueId: string): Promise<Mosque | null> {
  try {
    const db = getFirestore();
    const mosqueDocRef = doc(db, 'mosques', mosqueId);

    // Récupérez le document de la mosquée spécifique
    const docSnapshot = await getDoc(mosqueDocRef);

    if (docSnapshot.exists()) {
      // Le document de la mosquée existe, vous pouvez récupérer ses données
      const mosqueData = docSnapshot.data() as Mosque;
      console.log(mosqueData)
      return mosqueData;
    } else {
      // La mosquée n'a pas été trouvée
      console.log("mosque non trouve")

      return null;
    }
  } catch (error) {
    console.error('Erreur lors de la récupération de la mosquée :', error);
    throw error; // Vous pouvez gérer l'erreur de manière appropriée ici
  }
}



}
