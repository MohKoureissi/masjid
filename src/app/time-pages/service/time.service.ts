import { Injectable } from '@angular/core';
import { Firestore, doc, updateDoc } from '@angular/fire/firestore';
import { collection, addDoc, setDoc, getFirestore,  } from 'firebase/firestore';
import { TimeModel } from '../../model/time.model';

@Injectable({
  providedIn: 'root'
})
export class TimeService {

  constructor(private firestore: Firestore) { } // Utilisez AngularFirestore ici

  async addTime(time: TimeModel){
    const db = getFirestore();
    const timesCollectionRef = collection(db, 'times');
    const docRef = await addDoc(timesCollectionRef, time);
    time.id = docRef.id;
    const timeDocRef = doc(this.firestore, `times/${time.id}`);
    console.log(docRef.id);
    updateDoc(
      timeDocRef,
      {id: time.id}
    );
  }
}
