import { Injectable } from '@angular/core';
import {doc, Firestore, updateDoc, getDoc, deleteDoc} from '@angular/fire/firestore';
import {addDoc, collection, getFirestore, getDocs, setDoc} from 'firebase/firestore';
import {Observable, of} from "rxjs";
import {RecitationModel} from "../../app/model/recitation.model";
import {HttpClient} from "@angular/common/http";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";


@Injectable({
  providedIn: 'root'
})
export class RecitationService {

  COLLECTION_NAME = 'recitations';

  constructor(private firestore: Firestore, private http: HttpClient) { }

  async addRecitation(recitation: RecitationModel, file: File) {
    const db = getFirestore();
    const storage = getStorage();
    const surahCollectionRef = collection(db, `${this.COLLECTION_NAME}/${recitation.readerId}/${this.COLLECTION_NAME}`);

    try {
      await this.loadRecitation(recitation.readerId, file, recitation.recitationNumber).then(url =>{
        recitation.downloadUrl = url;
      });
      console.log(recitation.downloadUrl)

      if (recitation.downloadUrl != null){
        //recitation.downloadUrl = await this.downloadRecitation(recitation.readerId, recitation.recitationNumber);
        recitation.apiUrl = "https://api.alquran.cloud/v1/surah/" + recitation.recitationNumber +"/fr.asad";
        // Attendre que la requête HTTP soit terminée avant de continuer
        const data: any = await this.http.get(recitation.apiUrl).toPromise();
        recitation.surah = {
          number: data.data.number,
          name: data.data.name,
          englishName: data.data.englishName,
          revelationType: data.data.revelationType,
          numberOfAyahs: data.data.numberOfAyahs
        };

        const docRef = await addDoc(surahCollectionRef, recitation);
        recitation.id = docRef.id;
        const surahDocRef = doc(this.firestore, `${this.COLLECTION_NAME}/${recitation.readerId}/${this.COLLECTION_NAME}/${recitation.id}`);
        await updateDoc(
          surahDocRef,
          {id: recitation.id}
        );
        console.log('Récitation ajouté avec succès !');
      }
      else {
        //console.log('Erreur lors de l\'ajout de la recitation');
        throw new Error('Erreur lors de l\'ajout de la recitation');
      }
    }catch (error) {
      console.log('Erreur lors de l\'ajout de la recitation ==>', error);
    }
  }

  async getRecitation(readerId: string, recitationId: string) {
    try {
      const recitationDocRef = doc(this.firestore, `${this.COLLECTION_NAME}/${readerId}/${this.COLLECTION_NAME}`, recitationId);
      const recitationSnap = await getDoc(recitationDocRef);
      return recitationSnap.data() as RecitationModel;
    }catch (erreor) {
      console.log(erreor);
      return null;
    }
  }
  async getAllRecitations(readerId: string): Promise<Observable<RecitationModel[]>> {
    const db = getFirestore();
    try {
      const recitationCollectionRef = collection(db, `${this.COLLECTION_NAME}/${readerId}/${this.COLLECTION_NAME}`);
      const recitationsSnap = await getDocs(recitationCollectionRef);
      const recitations: RecitationModel[] = [];
      recitationsSnap.forEach((doc) => {
        recitations.push(doc.data() as RecitationModel);
      });
      return of(recitations);
    }catch (error) {
      console.log(error);
      return of([]);
    }
  }

  async updateRecitation(newRecitation: RecitationModel|any) {
    const db = getFirestore();
    try {
      const docRecitationRef = doc(this.firestore, `${this.COLLECTION_NAME}/${newRecitation.readerId}/${this.COLLECTION_NAME}`, newRecitation.id!);
      const recitationSnap = await getDoc(docRecitationRef);
      if(recitationSnap.exists()){
        await updateDoc(docRecitationRef, newRecitation);
        console.log("Récitation modifié avec succès !");
      }
      else {
        console.log("La récitation spécifier est introuvable");
      }
    }catch (error) {
      console.log(error);
    }
  }

  async deleteRecitation(readerId: string, recitationId: string) {
    const db = getFirestore();
    try {
      const docRecitationRef = doc(this.firestore, `${this.COLLECTION_NAME}/${readerId}/${this.COLLECTION_NAME}`, recitationId);
      const recitationSnap = await getDoc(docRecitationRef);
      if (recitationSnap.exists()) {
        await deleteDoc(docRecitationRef);
        console.log("Récitation supprimé avec succès !");
      }
      else {
        console.log("La recitation spécifier est introuvable");
      }
    }catch (error) {
      console.log(error);
    }

  }

  async loadRecitation(readerId: string, file: File, number: number): Promise<string | null> {
    const storage = getStorage();
    let downloadUrl: string|null = null;
    const recitationsRef = await ref(storage, `${this.COLLECTION_NAME}/${readerId}/${number}.mp3`);
    uploadBytes(recitationsRef, file).then((snapshot) => {
      console.log('Fichier uploadé avec succès !');
    });


    await getDownloadURL(recitationsRef)
      .then((url) => {
        // `url` est l'URL de téléchargement de notre récitation
        downloadUrl = url
      })
      .catch((error) => {
        // Handle any errors
      });

    return downloadUrl;
  }

  downloadRecitation(readerId: string, recitationNumber: number) {
    console.log("Je suis dedans");
    const storage = getStorage();
    getDownloadURL(ref(storage, `${this.COLLECTION_NAME}/${readerId}/${recitationNumber}.mp3`))
      .then((url) => {
        // `url` est l'URL de téléchargement de notre récitation
        console.log(url)
      })
      .catch((error) => {});
  }

  download() {}



}
