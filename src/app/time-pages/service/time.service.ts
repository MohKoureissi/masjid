import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/compat/firestore'; // Importez AngularFirestore

import { TimeModel } from '../../model/time.model';

@Injectable({
  providedIn: 'root'
})
export class TimeService {

  constructor(private firestore: AngularFirestore) { } // Utilisez AngularFirestore ici

  async addTime(time: TimeModel): Promise<DocumentReference<TimeModel>> {
    const timesCollectionRef = this.firestore.collection<TimeModel>('times'); // Utilisez le type de modèle pour la collection
    const docRef = await timesCollectionRef.add(time); // Utilisez add() pour ajouter un document à la collection
    return docRef;
  }
}
