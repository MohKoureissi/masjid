import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {  HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ConnexionService {
  private firebaseAuthBaseUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDW9MK1pAcfgLo_M8w93nrcEXKrZ3FUclM';
  

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    const requestBody = {
      email: email,
      password: password,
      returnSecureToken: true, // Demande un jeton d'accès sécurisé
    };

    return this.http.post(this.firebaseAuthBaseUrl, requestBody).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    // Gérez les erreurs ici, par exemple, en affichant un message d'erreur.
    let errorMessage = 'Une erreur inconnue s\'est produite.';
    if (error.error instanceof ErrorEvent) {
      // Erreur côté client.
      errorMessage = `Erreur : ${error.error.message}`;
    } else {
      // Erreur côté serveur.
      errorMessage = `Code d'erreur : ${error.status}, message : ${error.error.error.message}`;
    }
    // Vous pouvez logguer l'erreur ou afficher un message à l'utilisateur.
    console.error(errorMessage);
    return throwError(errorMessage);
  }


}
