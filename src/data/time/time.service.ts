import {Injectable} from '@angular/core';
import {doc, Firestore, updateDoc, getDoc, deleteDoc} from '@angular/fire/firestore';
import {addDoc, collection, getFirestore, getDocs} from 'firebase/firestore';
import {TimeModel} from "../../app/model/time.model";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TimeService {
  COLLECTION_NAME = 'times';
  constructor(private firestore: Firestore) { }

  async addTime(time: TimeModel){
    const db = getFirestore();
    const timesCollectionRef = collection(db, `${this.COLLECTION_NAME}/${time.mosqueId}/${this.COLLECTION_NAME}`);
    const docRef = await addDoc(timesCollectionRef, time);
    time.id = docRef.id;
    const timeDocRef = doc(this.firestore, `${this.COLLECTION_NAME}/${time.mosqueId}/${this.COLLECTION_NAME}/${time.id}`);
    updateDoc(
      timeDocRef,
      {id: time.id}
    );
  }

  // Méthode de recuperation d'une horaire précise
  async getTime(mosqueId: string, timeId: string): Promise<TimeModel | null>{
    const db = getFirestore();
    const timeDocRef = doc(this.firestore, `${this.COLLECTION_NAME}/${mosqueId}/${this.COLLECTION_NAME}/${timeId}`);

   try{
     const timeSnap = await getDoc(timeDocRef);
     if(timeSnap.exists()){
       return timeSnap.data() as TimeModel;
     }else{
       return null;
     }
   }catch (error){
     console.log(error);
   }
   return null;
  }

  async getAllTimes(mosqueId: string): Promise<Observable<TimeModel[]|null>> {
    const db = getFirestore();
    const timesCollectionRef = collection(db, `times/${mosqueId}/times`);

    try{
      const timesSnap = await getDocs(timesCollectionRef);
      const times: TimeModel[] = [];
      timesSnap.forEach((doc) => {
        times.push(doc.data() as TimeModel);
      });
      return of(times);
    }catch (error){
      console.log(error);
    }
    return of(null);
  }

  updateTime(time: TimeModel){
    const db = getFirestore();
    const timesDocRef = doc(this.firestore, `${this.COLLECTION_NAME}/${time.mosqueId}/${this.COLLECTION_NAME}/${time.id}`);
    updateDoc(timesDocRef, {name: time.name, hour: time.hour});

    return this.getTime(time.mosqueId, time.id!);
  }

  deleteTime(mosqueId: string, timeId: string){
    const db = getFirestore();
    const timesDocRef = doc(this.firestore, `${this.COLLECTION_NAME}/${mosqueId}/${this.COLLECTION_NAME}/${timeId}`);
    try{
      deleteDoc(timesDocRef);
      console.log("Horaires supprimés avec succès !");
    }catch (error){
      console.log(error);
    }
  }

}
