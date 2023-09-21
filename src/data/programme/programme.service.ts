import { Injectable } from '@angular/core';
import { getFirestore, doc, setDoc, collection, getDoc, deleteDoc, updateDoc, getDocs, addDoc } from 'firebase/firestore';
import { Programme } from 'src/app/model/programme.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProgramService {
  COLLECTION_NAME = 'programmes';
  constructor() {}
 async createProgram(programme : Programme): Promise<void> {
    try {
      const db = getFirestore();
      const programCollectionRef = collection(db, `${this.COLLECTION_NAME}/${programme.mosqueId}/${this.COLLECTION_NAME}`);
      // Ajouter un nouveau programme à la collection "programs"
      const newProgramRef = doc(programCollectionRef);
      await setDoc(newProgramRef, programme);
      updateDoc(newProgramRef, { id: newProgramRef.id });
      console.log(`Programme créé avec succès avec l'ID : ${newProgramRef.id}`);
    } catch (error) {
      console.error('Erreur lors de la création du programme :', error);
      throw error;
    }
  }

  async updateProgram(updatedProgram: Programme | any): Promise<void> {
    try {
      const db = getFirestore();
      const programDocRef = doc(db, `${this.COLLECTION_NAME}/${updatedProgram.mosqueId}/${this.COLLECTION_NAME}`, updatedProgram.id);

      // Vérifiez si le programme existe dans la base de données
      const programSnap = await getDoc(programDocRef);

      if (programSnap.exists()) {
        // Le programme existe, mettez à jour les données
        await updateDoc(programDocRef, updatedProgram);

        console.log(`Programme avec l'ID ${updatedProgram.id} mis à jour avec succès`);
      } else {
        console.log(`Le programme avec l'ID ${updatedProgram.id} n'existe pas.`);
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour du programme :', error);
      throw error; // Vous pouvez gérer l'erreur de manière appropriée ici
    }
  }

  async deleteProgram(mosqueId:string, programId: string): Promise<void> {
    try {
      const db = getFirestore();
      const programDocRef = doc(db, `${this.COLLECTION_NAME}/${mosqueId}/${this.COLLECTION_NAME}`, programId);

      // Vérifiez si le programme existe dans la base de données
      const programSnap = await getDoc(programDocRef);

      if (programSnap.exists()) {
        // Le programme existe, supprimez-le
        await deleteDoc(programDocRef);

        console.log(`Programme avec l'ID ${programId} supprimé avec succès`);
      } else {
        console.log(`Le programme avec l'ID ${programId} n'existe pas.`);
      }
    } catch (error) {
      console.error('Erreur lors de la suppression du programme :', error);
      throw error; // Vous pouvez gérer l'erreur de manière appropriée ici
    }
  }

  async getAllPrograms(mosqueId: string): Promise<Observable<Programme[]>> {
    const db = getFirestore();
    const programsCollectionRef = collection(db, `${this.COLLECTION_NAME}/${mosqueId}/${this.COLLECTION_NAME}`);

    try {
      const programsSnap = await getDocs(programsCollectionRef);
      const programs: Programme[] = [];
      programsSnap.forEach((doc) => {
        programs.push(doc.data() as Programme);
      });

      return of(programs);
    } catch (error) {
      console.log(error);
      return of([]);
    }
  }

}




















































//getAllProgrammes(programme: string): Observable<programme[]> {
  //   const collectionRef = collection(this.db, programme);
  //   return new Observable((observer) => {
  //     getDocs(collectionRef)
  //       .then((querySnapshot) => {
  //         const programmes: programme[] = [];
  //         querySnapshot.forEach((doc) => {
  //           programmes.push({ id: doc.id, ...doc.data() } as programme);
  //         });
  //         observer.next(programmes); // Émettez les données récupérées
  //         observer.complete();
  //       })
  //       .catch((error) => {
  //         observer.error(error);
  //       });
  //   });
  // }


  // addProgramme(programme: string, newProgramme: any): Observable<any> {
  //   const collectionRef = collection(this.db, programme);
  //   return new Observable((observer) => {
  //     addDoc(collectionRef, newProgramme)
  //       .then((docRef) => {
  //         observer.next({ id: docRef.id, ...newProgramme });
  //         observer.complete();
  //       })
  //       .catch((error) => {
  //         observer.error(error);
  //       });
  //   });
  // }

