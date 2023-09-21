import { Injectable } from '@angular/core';
import { getFirestore, doc, addDoc,setDoc,  collection, getDoc,deleteDoc,updateDoc, getDocs} from 'firebase/firestore';
import {Announcement} from 'src/app/model/announcement.model';
import {Observable, of} from "rxjs";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";


@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {
  COLLECTION_NAME = 'announcements';
  defaultImageUrl = 'https://firebasestorage.googleapis.com/v0/b/masjid-1f3cf.appspot.com/o/mosques%2Fdefault-mosque.jpg?alt=media&token=64a4374f-bddc-437e-9d09-3f890a33fc11';


  constructor() { }

  async createAnnouncement(announcement: Announcement, imageFile:File|null): Promise<void> {
    const db = getFirestore();
    const announcementCollectionRef = collection(db, `${this.COLLECTION_NAME}`);
    try {
      if(imageFile != null){
        await this.loadAnnouncementImage(imageFile).then(url =>{
          announcement.imageUrl = url;
        });
        console.log(announcement.imageUrl)
      }
      announcement.imageUrl = (announcement.imageUrl != null && announcement.imageUrl != '')? announcement.imageUrl:this.defaultImageUrl;

      // Ajoutez la nouvelle mosquée à la collection "mosques"
      const newAnnouncementRef = doc(announcementCollectionRef);
      await setDoc(newAnnouncementRef, announcement);
      updateDoc(
        newAnnouncementRef,
        {id: newAnnouncementRef.id}
      );

      console.log(`Annonce créée avec succès avec l'ID : ${newAnnouncementRef.id}`);
    } catch (error) {
      console.error('Erreur lors de la création de l\'Annonce :', error);
      throw error; // Vous pouvez gérer l'erreur de manière appropriée ici
    }
}



  //update annonce

  async updateAnnouncement(updatedAnnouncement: Announcement|any, imageFile: File|null): Promise<void> {
    try {
      const db = getFirestore();
      const announcementDocRef = doc(db, 'announcements', updatedAnnouncement.id);

      // Vérifiez si l'annonce existe dans la base de données
      const announcementSnap = await getDoc(announcementDocRef);

      if (announcementSnap.exists()) {
        if(imageFile != null){
          await this.loadAnnouncementImage(imageFile).then(url =>{
            updatedAnnouncement.imageUrl = url;
          });
          console.log(updatedAnnouncement.imageUrl)
        }
        updatedAnnouncement.imageUrl = (updatedAnnouncement.imageUrl != null && updatedAnnouncement.imageUrl != '')? updatedAnnouncement.imageUrl:this.defaultImageUrl;


        // L'annonce existe, mettez à jour les données
        await updateDoc(announcementDocRef, updatedAnnouncement);

        console.log(`Annonce avec l'ID ${updatedAnnouncement.id} mise à jour avec succès`);
      } else {
        console.log(`L'annonce avec l'ID ${updatedAnnouncement.id} n'existe pas.`);
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l\'annonce :', error);
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

  async getAllAnnouncements(): Promise<Observable<Announcement[]>>{
    const db = getFirestore();
    const announcementsCollectionRef = collection(db, "announcements");

    try {
      const announcementsSnap = await getDocs(announcementsCollectionRef);
      const announcements: Announcement[] = [];
      announcementsSnap.forEach((doc) => {
        announcements.push(doc.data() as Announcement);
      });
      return of(announcements);
    }catch (error){
      console.log(error);
      return of([]);
    }

  }

  async getAnnouncement(announcementId: string): Promise<Observable<Announcement | null>>{
    const db = getFirestore();
    const announcementDocRef = doc(db, 'announcements', announcementId);
    try {
      const announcementSnap = await getDoc(announcementDocRef);
      const announcement = announcementSnap.data() as Announcement;
      return of(announcement);
    }catch (error){
      console.log(error);
      return of(null);
    }
  }



  async loadAnnouncementImage(file: File): Promise<string | null> {
    const storage = getStorage();
    let imageUrl: string|null = null;
    const announcementRef = await ref(storage, `${this.COLLECTION_NAME}/${file.name}`);
    uploadBytes(announcementRef, file).then((snapshot) => {
      console.log('Fichier uploadé avec succès !');
    });

    await getDownloadURL(announcementRef).then((url) => {
        // `url` est l'URL de téléchargement de notre récitation
        imageUrl = url
      })
      .catch((error) => {
        // Handle any errors
      });
    return imageUrl;
  }

}
