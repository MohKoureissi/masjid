import { Injectable } from '@angular/core';
import { getFirestore, doc, setDoc,  collection,getDoc,deleteDoc,updateDoc} from 'firebase/firestore';
import { Announcements } from 'src/app/model/announcement.model';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {

  constructor() { }

  async createAnnouncement(announcement: Announcements): Promise<void> {
    try{
      const db = getFirestore();
      const announcementCollectionRef = collection(db, "announcements")
      //ajouter une nouvelle annonce a la collection "announcements"
      const newAnouncementRef= doc(announcementCollectionRef);
      await setDoc(newAnouncementRef, announcement);
    console.log(`Annnoce  créée avec succès avec l'ID : ${newAnouncementRef.id}`);

    }catch (error) {
      console.error('Erreur lors de la création de l\'annonce :', error);
      throw error; // Vous pouvez gérer l'erreur de manière appropriée ici
    }
  }

// delete annonce
  async deleteAnnouncement(announcementId: string): Promise<void> {
    try {
      const db = getFirestore();
      const announcementDocRef = doc(db, 'announcements', announcementId);

      // Vérifiez si l'annonce existe dans la base de données
      const announcementSnap = await getDoc(announcementDocRef);

      if (announcementSnap.exists()) {
        // L'annonce existe, supprimez-la
        await deleteDoc(announcementDocRef);

        console.log(`Annonce avec l'ID ${announcementId} supprimée avec succès`);
      } else {
        console.log(`L'annonce avec l'ID ${announcementId} n'existe pas.`);
      }
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'annonce :', error);
      throw error; // Vous pouvez gérer l'erreur de manière appropriée ici
    }
  }

  //update annonce

  async updateAnnouncement(announcementId: string, updatedAnnouncement: Announcements|any): Promise<void> {
    try {
      const db = getFirestore();
      const announcementDocRef = doc(db, 'announcements', announcementId);

      // Vérifiez si l'annonce existe dans la base de données
      const announcementSnap = await getDoc(announcementDocRef);

      if (announcementSnap.exists()) {
        // L'annonce existe, mettez à jour les données
        await updateDoc(announcementDocRef, updatedAnnouncement);

        console.log(`Annonce avec l'ID ${announcementId} mise à jour avec succès`);
      } else {
        console.log(`L'annonce avec l'ID ${announcementId} n'existe pas.`);
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l\'annonce :', error);
      throw error; // Vous pouvez gérer l'erreur de manière appropriée ici
    }
  }

}



