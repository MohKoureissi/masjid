import { Injectable } from '@angular/core';
import {deleteDoc, doc, Firestore, getDoc, updateDoc} from "@angular/fire/firestore";
import {addDoc, collection, getDocs, getFirestore} from "firebase/firestore";
import {PrecheurModel} from "../../app/model/precheur.model";
import {ReaderModel} from "../../app/model/reader.model";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PrecheurService {
  COLLECTION_NAME = 'precheurs';

  constructor(private firestore: Firestore) { }

  async addPrecheur(precheur: PrecheurModel) {
    const db = getFirestore();
    try {
      const precheurCollectionRef = collection(db, `${this.COLLECTION_NAME}`);
      const docRef = await addDoc(precheurCollectionRef, precheur);
      precheur.id = docRef.id;
      const readerDocRef = doc(this.firestore, `${this.COLLECTION_NAME}/${precheur.id}`);
      await updateDoc(
        readerDocRef,
        {id: precheur.id}
      );

      console.log('Precheur ajouté avec succès !');
    }catch (error) {
      console.log('Erreur lors de l\'ajout du precheur ==>', error);
    }
  }

  async getPrecheur(id: string) {
    try {
      const precheurDocRef = doc(this.firestore, `${this.COLLECTION_NAME}`, id);
      const precheurSnap = await getDoc(precheurDocRef);
      return precheurSnap.data() as ReaderModel;
    }catch (error) {
      console.log(error);
      return null;
    }
  }

  async getAllPrecheurs(): Promise<Observable<PrecheurModel[]>> {
    const db = getFirestore();
    try {
      const precheurCollectionRef = collection(db, `${this.COLLECTION_NAME}`);
      const precheursSnap = await getDocs(precheurCollectionRef);
      const precheurs: PrecheurModel[] = [];
      precheursSnap.forEach((doc) => {
        precheurs.push(doc.data() as PrecheurModel);
      });
      return of(precheurs);
    }catch (error) {
      console.log(error);
      return of([]);
    }
  }

  async updatePrecheur(newPrecheur: PrecheurModel|any) {
    const db = getFirestore();
    try {
      const docPrecheurRef = doc(this.firestore, `${this.COLLECTION_NAME}`, newPrecheur.id!);
      const precheurSnap = await getDoc(docPrecheurRef);
      if(precheurSnap.exists()){
        await updateDoc(docPrecheurRef, newPrecheur);
        console.log("Prêcheur modifié avec succès !");
      }
      else {
        console.log("Le prêcheur spécifier est introuvable");
      }
    }catch (error) {
      console.log(error);
    }
  }

  async deletePrecheur(id: string) {
    const db = getFirestore();
    try {
      const docPrecheurRef = doc(this.firestore, `${this.COLLECTION_NAME}`, id);
      const precheurSnap = await getDoc(docPrecheurRef);
      if (precheurSnap.exists()) {
        await deleteDoc(docPrecheurRef);
        console.log("Prêcheur supprimé avec succès !");
      }
      else {
        console.log("Le prêcheur spécifier est introuvable");
      }
    }catch (error) {
      console.log(error);
    }

  }
}
