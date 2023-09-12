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
    try {
      //recitation.downloadUrl = await this.downloadRecitation(recitation.readerId, recitation.recitationNumber);
      recitation.downloadUrl = `gs://masjid-1f3cf.appspot.com/${this.COLLECTION_NAME}/${recitation.readerId}/${recitation.recitationNumber}`
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


      const surahCollectionRef = collection(db, `${this.COLLECTION_NAME}/${recitation.readerId}/${this.COLLECTION_NAME}`);
      const docRef = await addDoc(surahCollectionRef, recitation);
      recitation.id = docRef.id;
      const surahDocRef = doc(this.firestore, `${this.COLLECTION_NAME}/${recitation.readerId}/${this.COLLECTION_NAME}/${recitation.id}`);
      await updateDoc(
        surahDocRef,
        {id: recitation.id}
      );
      this.loadRecitation(recitation.readerId, file, recitation.recitationNumber);

      console.log('Récitation ajouté avec succès !');
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

  loadRecitation(readerId: string, file: File, number: number) {
    const storage = getStorage();

    const recitationsRef = ref(storage, `${this.COLLECTION_NAME}/${readerId}/${number}.mp3`);
    uploadBytes(recitationsRef, file).then((snapshot) => {
      console.log('Fichier uploadé avec succès !');
    });
  }

  downloadRecitation(readerId: string, recitationNumber: number): string|null {

    const storage = getStorage();
    let downloadURL: string|null = null;
    getDownloadURL(ref(storage, `gs://masjid-1f3cf.appspot.com/${this.COLLECTION_NAME}/${readerId}/${recitationNumber}`))
      .then((url) => {
        downloadURL = url;
        // `url` est l'URL de téléchargement de notre récitation

        // Celui-ci peut être téléchargé directement:
        /*const xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';
        xhr.onload = (event) => {
          const blob = xhr.response;
        };
        xhr.open('GET', url);
        xhr.send();*/

        // Or inserted into an <img> element
        /*const img = document.getElementById('myimg');
        img.setAttribute('src', url);*/
      })
      .catch((error) => {
        // Handle any errors
      });
    return downloadURL;

  }

}
