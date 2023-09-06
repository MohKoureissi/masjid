import { Injectable } from '@angular/core';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection, getFirestore } from 'firebase/firestore';
import { Announcements } from 'src/app/model/announcement.model';
import { Mosque } from 'src/app/model/mosque.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }
//create a new UserService
  register(fullName:string, numTel:string,email:string, password:string,mosques:Mosque[], announcements: Announcements[]) {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth,email, password)
    .then(async(userCredential) => {
    // Signed in
    const user = userCredential.user;
    const db = getFirestore();
    //create doc for user in collection
    const userAdd = await addDoc(collection(db, 'users'),{
      fullName:fullName,
      numTel:numTel,
      email:email,
      mosques:mosques,
      announcements: announcements,

    })
    console.log('Utilisateur enregistré avec succès avec l\'ID du document Firestore : ', userAdd.id);
  })
  .catch((error) => {

    const errorMessage = error.message;
    console.error('Erreur lors de la création de l\'utilisateur :', errorMessage);
  });
  }

}
