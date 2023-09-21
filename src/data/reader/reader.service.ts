import { Injectable } from '@angular/core';
import {doc, Firestore, updateDoc, getDoc, deleteDoc} from '@angular/fire/firestore';
import {addDoc, collection, getFirestore, getDocs, setDoc} from 'firebase/firestore';
import {Observable, of} from "rxjs";
import {ReaderModel} from "../../app/model/reader.model";


@Injectable({
  providedIn: 'root'
})
export class ReaderService {
  COLLECTION_NAME = 'readers';

  constructor(private firestore: Firestore) { }

  async addReader(reader: ReaderModel) {
    const db = getFirestore();
    try {
      const readerCollectionRef = collection(db, `${this.COLLECTION_NAME}`);
      const docRef = await addDoc(readerCollectionRef, reader);
      reader.id = docRef.id;
      const readerDocRef = doc(this.firestore, `${this.COLLECTION_NAME}/${reader.id}`);
      await updateDoc(
        readerDocRef,
        {id: reader.id}
      );

      console.log('Reader ajouté avec succès !');
    }catch (error) {
      console.log('Erreur lors de l\'ajout du lecteur ==>', error);
    }
  }

  async getReader(id: string) {
    try {
      const readerDocRef = doc(this.firestore, `${this.COLLECTION_NAME}`, id);
      const readerSnap = await getDoc(readerDocRef);
      return readerSnap.data() as ReaderModel;
    }catch (erreor) {
      console.log(erreor);
      return null;
    }
  }
  async getAllReaders(): Promise<Observable<ReaderModel[]>> {
    const db = getFirestore();
    try {
      const readerCollectionRef = collection(db, `${this.COLLECTION_NAME}`);
      const readersSnap = await getDocs(readerCollectionRef);
      const readers: ReaderModel[] = [];
      readersSnap.forEach((doc) => {
        readers.push(doc.data() as ReaderModel);
      });
      return of(readers);
    }catch (error) {
      console.log(error);
      return of([]);
    }
  }

  async updateReader(newReader: ReaderModel|any) {
    const db = getFirestore();
    try {
      const docReaderRef = doc(this.firestore, `${this.COLLECTION_NAME}`, newReader.id!);
      const readerSnap = await getDoc(docReaderRef);
      if(readerSnap.exists()){
        await updateDoc(docReaderRef, newReader);
        console.log("Lecteur modifié avec succès !");
      }
      else {
        console.log("Le lecteur spécifier est introuvable");
      }
    }catch (error) {
      console.log(error);
    }
  }

  async deleteReader(id: string) {
    const db = getFirestore();
    try {
      const docReaderRef = doc(this.firestore, `${this.COLLECTION_NAME}`, id);
      const readerSnap = await getDoc(docReaderRef);
      if (readerSnap.exists()) {
        await deleteDoc(docReaderRef);
        console.log("Lecteur supprimé avec succès !");
      }
      else {
        console.log("Le lecteur spécifier est introuvable");
      }
    }catch (error) {
      console.log(error);
    }

  }
}
