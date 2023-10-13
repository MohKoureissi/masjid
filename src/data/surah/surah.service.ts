// import { Injectable } from '@angular/core';
// import {doc, Firestore, updateDoc, getDoc, deleteDoc} from '@angular/fire/firestore';
// import {addDoc, collection, getFirestore, getDocs, setDoc} from 'firebase/firestore';
// import {Observable, of} from "rxjs";
// import {SurahModel} from "../../app/model/surah.model";

// @Injectable({
//   providedIn: 'root'
// })
// export class SurahService {

//   COLLECTION_NAME = 'surahs';

//   constructor(private firestore: Firestore) { }

//   async addSurah(surah: SurahModel) {

//     const db = getFirestore();
//     try {
//       const surahCollectionRef = collection(db, `${this.COLLECTION_NAME}/${surah.readerId}/${this.COLLECTION_NAME}`);
//       const docRef = await addDoc(surahCollectionRef, surah);
//       surah.id = docRef.id;
//       const surahDocRef = doc(this.firestore, `${this.COLLECTION_NAME}/${surah.readerId}/${this.COLLECTION_NAME}/${surah.id}`);
//       await updateDoc(
//         surahDocRef,
//         {id: surah.id}
//       );

//       console.log('Surah ajouté avec succès !');
//     }catch (error) {
//       console.log('Erreur lors de l\'ajout de la surah ==>', error);
//     }
//   }

//   async getSurah(readerId: string, surahId: string) {
//     try {
//       const surahDocRef = doc(this.firestore, `${this.COLLECTION_NAME}/${readerId}/${this.COLLECTION_NAME}`, surahId);
//       const surahSnap = await getDoc(surahDocRef);
//       return surahSnap.data() as SurahModel;
//     }catch (erreor) {
//       console.log(erreor);
//       return null;
//     }
//   }
//   async getAllSurahs(readerId: string): Promise<Observable<SurahModel[]>> {
//     const db = getFirestore();
//     try {
//       const surahCollectionRef = collection(db, `${this.COLLECTION_NAME}/${readerId}/${this.COLLECTION_NAME}`);
//       const surahsSnap = await getDocs(surahCollectionRef);
//       const surahs: SurahModel[] = [];
//       surahsSnap.forEach((doc) => {
//         surahs.push(doc.data() as SurahModel);
//       });
//       return of(surahs);
//     }catch (error) {
//       console.log(error);
//       return of([]);
//     }
//   }

//   async updateSurah(newSurah: SurahModel|any) {
//     const db = getFirestore();
//     try {
//       const docSurahRef = doc(this.firestore, `${this.COLLECTION_NAME}/${newSurah.readerId}/${this.COLLECTION_NAME}`, newSurah.id!);
//       const surahSnap = await getDoc(docSurahRef);
//       if(surahSnap.exists()){
//         await updateDoc(docSurahRef, newSurah);
//         console.log("Surate modifié avec succès !");
//       }
//       else {
//         console.log("La surate spécifier est introuvable");
//       }
//     }catch (error) {
//       console.log(error);
//     }
//   }

//   async deleteSurah(readerId: string, surahId: string) {
//     const db = getFirestore();
//     try {
//       const docSurahRef = doc(this.firestore, `${this.COLLECTION_NAME}/${readerId}/${this.COLLECTION_NAME}`, surahId);
//       const surahSnap = await getDoc(docSurahRef);
//       if (surahSnap.exists()) {
//         await deleteDoc(docSurahRef);
//         console.log("Sourate supprimé avec succès !");
//       }
//       else {
//         console.log("La sourate spécifier est introuvable");
//       }
//     }catch (error) {
//       console.log(error);
//     }

//   }
// }
