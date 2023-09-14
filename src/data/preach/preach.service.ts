import { Injectable } from '@angular/core';
import {doc, Firestore, updateDoc, getDoc, deleteDoc} from '@angular/fire/firestore';
import {addDoc, collection, getFirestore, getDocs, setDoc} from 'firebase/firestore';
import {Observable, of} from "rxjs";
import {HttpClient} from "@angular/common/http";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {PreacheModel} from "../../app/model/preache.model";

@Injectable({
  providedIn: 'root'
})
export class PreachService {
  COLLECTION_NAME = 'preaches';

  constructor(private firestore: Firestore, private http: HttpClient) { }

  async addPreache(preache: PreacheModel, file: File) {
    const db = getFirestore();
    const storage = getStorage();
    const preacheCollectionRef = collection(db, `${this.COLLECTION_NAME}/${preache.precheur}/${this.COLLECTION_NAME}`);
    try {
      await this.loadPreache(preache.precheur.fullName, file).then(url =>{
        preache.preacheUrl = url;
      });
      console.log(preache.preacheUrl)

      if(preache.preacheUrl){
        const docRef = await addDoc(preacheCollectionRef, preache);
        preache.id = docRef.id;
        const preacheDocRef = doc(this.firestore, `${this.COLLECTION_NAME}/${preache.precheur}/${this.COLLECTION_NAME}/${preache.id}`);
        await updateDoc(
          preacheDocRef,
          {id: preache.id}
        );
        console.log('Récitation ajouté avec succès !');
      }else {
        //console.log('Erreur lors de l\'ajout de la recitation');
        throw new Error('Erreur lors de l\'ajout du prêche');
      }
    }catch (error){
      console.log(error)
    }
  }

  async getPreache(precheur: string, preachId: string) {
    try {
      const preachDocRef = doc(this.firestore, `${this.COLLECTION_NAME}/${precheur}/${this.COLLECTION_NAME}`, preachId);
      const preachSnap = await getDoc(preachDocRef);
      return preachSnap.data() as PreacheModel;
    }catch (erreor) {
      console.log(erreor);
      return null;
    }
  }

  async getAllPreaches(precheur: string): Promise<Observable<PreacheModel[]>> {
    const db = getFirestore();
    try {
      const preachCollectionRef = collection(db, `${this.COLLECTION_NAME}/${precheur}/${this.COLLECTION_NAME}`);
      const preachesSnap = await getDocs(preachCollectionRef);
      const preaches: PreacheModel[] = [];
      preachesSnap.forEach((doc) => {
        preaches.push(doc.data() as PreacheModel);
      });
      return of(preaches);
    }catch (error) {
      console.log(error);
      return of([]);
    }
  }

  async deletePreach(precheur: string, preachId: string) {
    const db = getFirestore();
    try {
      const docPreachRef = doc(this.firestore, `${this.COLLECTION_NAME}/${precheur}/${this.COLLECTION_NAME}`, preachId);
      const preachSnap = await getDoc(docPreachRef);
      if (preachSnap.exists()) {
        await deleteDoc(docPreachRef);
        console.log("Prêche supprimé avec succès !");
      }
      else {
        console.log("Le prêche spécifier est introuvable");
      }
    }catch (error) {
      console.log(error);
    }

  }

  async updatePreach(newPreach: PreacheModel|any) {
    console.log(newPreach.id);
    const db = getFirestore();
    try {
      const docPreachRef = doc(this.firestore, `${this.COLLECTION_NAME}/${newPreach.precheur}/${this.COLLECTION_NAME}`, newPreach.id!);
      const preachSnap = await getDoc(docPreachRef);
      if(preachSnap.exists()){
        await updateDoc(docPreachRef, newPreach);
        console.log("Prêche modifié avec succès !");
      }
      else {
        console.log("Le prêche spécifier est introuvable");
      }
    }catch (error) {
      console.log(error);
    }
  }








  async loadPreache(precheur: string, file: File): Promise<string | null> {
    const storage = getStorage();
    let downloadUrl: string|null = null;
    const preachesRef = await ref(storage, `${this.COLLECTION_NAME}/${precheur}/${file.name}`);
    uploadBytes(preachesRef, file).then((snapshot) => {
      console.log('Fichier uploadé avec succès !');
    });


    await getDownloadURL(preachesRef)
      .then((url) => {
        // `url` est l'URL de téléchargement de notre récitation
        downloadUrl = url
      })
      .catch((error) => {
        // Handle any errors
      });

    return downloadUrl;
  }
}
