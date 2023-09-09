import { Injectable } from '@angular/core';
import {RadioModel} from "../../app/model/radio.model";
import {getFirestore, collection, doc, setDoc, getDocs, getDoc, deleteDoc} from "firebase/firestore";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RadioService {

  constructor() { }

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

  async getRadio(radioId: string): Promise<Observable<RadioModel|null>>{
    const db = getFirestore();
    try {
      const radioDocRef = doc(db, 'radios', radioId);
      const radioDocSnap = await getDoc(radioDocRef);
      const radio = radioDocSnap.data() as RadioModel;
      return of(radio);
    }catch (error){
      console.log(error);
      return of(null);
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
