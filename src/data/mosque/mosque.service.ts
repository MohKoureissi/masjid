import { Injectable, OnInit } from '@angular/core';
import { getFirestore, doc, setDoc,getDocs,where, query, collection ,getDoc,updateDoc,deleteDoc,QuerySnapshot} from 'firebase/firestore';
import { Mosque } from 'src/app/model/mosque.model';
import { Observable, of } from "rxjs";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";


@Injectable({
  providedIn: 'root'
})
export class MosqueService implements OnInit {
  COLLECTION_NAME = 'mosques';

  constructor() { }
  ngOnInit(): void {}


//Methode pour ajouter une mosque
  async createMosque(mosque: Mosque, imageFile: File): Promise<void> {
    const db = getFirestore();
    const mosqueCollectionRef = collection(db, `${this.COLLECTION_NAME}`);

    try {
      await this.loadMosqueImage(imageFile).then(url =>{
        mosque.imageUrl = url;
      });
      console.log(mosque.imageUrl)

      // Ajoutez la nouvelle mosquée à la collection "mosques"
      const newMosqueRef = doc(mosqueCollectionRef);
      mosque.id = newMosqueRef.id;
      await setDoc(newMosqueRef, mosque);
      /*updateDoc(
        newMosqueRef,
        {id: newMosqueRef.id}
      );*/

      console.log(`Mosquée créée avec succès avec l'ID : ${mosque}`);
    } catch (error) {
      console.error('Erreur lors de la création de la mosquée :', error);
      throw error; // Vous pouvez gérer l'erreur de manière appropriée ici
    }
  }
// update mosquee
  async updateMosque(mosqueId:string,updateMosque:Mosque|any): Promise<void> {
    try{
        const db = getFirestore();
        const mosqueCollectionRef = doc(db, `${this.COLLECTION_NAME}`,mosqueId);
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
      const mosqueDocRef = doc(db, `${this.COLLECTION_NAME}`, mosqueId);

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
    const mosqueCollectionRef = collection(db, `${this.COLLECTION_NAME}`);

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
async getDetailsMosque(mosqueId: string): Promise<Observable<Mosque | null>> {
  try {
    const db = getFirestore();
    const mosqueDocRef = doc(db, `${this.COLLECTION_NAME}`, mosqueId);

    // Récupérez le document de la mosquée spécifique
    const docSnapshot = await getDoc(mosqueDocRef);

    if (docSnapshot.exists()) {
      // Le document de la mosquée existe, vous pouvez récupérer ses données
      const mosqueData = docSnapshot.data() as Mosque;
      return of(mosqueData);
    } else {
      // La mosquée n'a pas été trouvée
      console.log("mosque non trouve")

      return of(null);
    }
  } catch (error) {
    console.error('Erreur lors de la récupération de la mosquée :', error);
    throw error; // Vous pouvez gérer l'erreur de manière appropriée ici
  }
}


  // Récupération de la liste des mosquées
  async getAllMosques(): Promise<Observable<Mosque[]>> {
    const db = getFirestore();
    const mosquesCollectionRef = collection(db, `${this.COLLECTION_NAME}`);

    try {
      const mosquesSnap = await getDocs(mosquesCollectionRef);
      const mosques: Mosque[] = [];

      mosquesSnap.forEach((doc) => {
        mosques.push(doc.data() as Mosque);
      });

      // Utilisez l'opérateur RxJS 'of' pour transformer le tableau en un observable
      return of(mosques);
    } catch (error) {
      console.log(error);
      return of([]); // Vous pouvez également retourner un tableau vide en cas d'erreur
    }
  }


  async loadMosqueImage(file: File): Promise<string | null> {
    const storage = getStorage();
    let imageUrl: string|null = null;
    const mosquesRef = await ref(storage, `${this.COLLECTION_NAME}/${file.name}`);
    await uploadBytes(mosquesRef, file).then((snapshot) => {
      console.log('Fichier uploadé avec succès !');
    });


    await getDownloadURL(mosquesRef).then((url) => {
        // `url` est l'URL de téléchargement de notre récitation
        imageUrl = url
      })
      .catch((error) => {
        // Handle any errors
      });

    return imageUrl;
  }

}
