import { Injectable } from '@angular/core';
import {RadioModel} from "../../app/model/radio.model";
import {doc, Firestore, updateDoc, getDoc, deleteDoc} from '@angular/fire/firestore';
import {addDoc, collection, getFirestore, getDocs, setDoc} from 'firebase/firestore';
import {Observable, of} from "rxjs";
import {RecitationModel} from "../../app/model/recitation.model";

@Injectable({
  providedIn: 'root'
})
export class RadioService {

  COLLECTION_NAME  = "radios"
  constructor(private firestore: Firestore) { }

  createRadio(radio: RadioModel) {
    const db = getFirestore();

    try {
      const radiosCollectionRef = collection(db, 'radios');
      const newRadioRef = doc(radiosCollectionRef);
      radio.id = newRadioRef.id;
      setDoc(newRadioRef, radio);
      console.log("Radio crée avec succes: ", newRadioRef.id);
    }catch (error){
      console.log("Erreur lors de la création du radio", error);
    }

  }
  async getAllRadios(): Promise<Observable<RadioModel[]>>{
    const db = getFirestore();

    try {
      const radiosCollectionRef = collection(db, 'radios');
      const radiosSnap = await getDocs(radiosCollectionRef);
      const radios: RadioModel[] = [];
      radiosSnap.forEach((doc) => {
        radios.push(doc.data() as RadioModel);
      });
      return of(radios);
    }catch (error){
      console.log(error);
      return of([]);
    }
  }

  async getRadio(radioId: string) {
    console.log(radioId)
    try {
      const radioDocRef = doc(this.firestore, `${this.COLLECTION_NAME}`, radioId);
      const radioSnap = await getDoc(radioDocRef);
      return radioSnap.data() as RadioModel;
    }catch (erreor) {
      console.log(erreor);
      return null;
    }
  }

  updateRadio(radio: RadioModel){
    const db = getFirestore();

    try {
      const radioDocRef = doc(db, 'radios', radio.id!);
      setDoc(radioDocRef, radio);
      console.log("Radio mise à jour avec succes: ", radio.id);
    }catch (error){
      console.log("Erreur lors de la mise à jour du radio", error);
    }
  }
  deleteRadio(radioId: string){
    const db = getFirestore();

    try {
      const radioDocRef = doc(db, 'radios', radioId);
      deleteDoc(radioDocRef);
      console.log("Radio supprimée avec succes: ", radioId);
    }catch (error){
      console.log("Erreur lors de la suppression du radio", error);
    }
  }
}
