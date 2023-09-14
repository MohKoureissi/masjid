import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {

  heureActuelle: string;
  private intervalSubscription: Subscription | undefined;

  constructor() {
    const datePipe = new DatePipe('fr-FR');
    const dateTransformed = datePipe.transform(new Date(), 'HH:mm:ss');
    this.heureActuelle = dateTransformed ? dateTransformed : '';
  }

  ngOnInit() {
    // Utilisation de RxJS interval pour mettre à jour l'heure chaque seconde.
    this.intervalSubscription = interval(1000).subscribe(() => {
      const datePipe = new DatePipe('fr-FR');
      const dateTransformed = datePipe.transform(new Date(), 'HH:mm:ss');
      this.heureActuelle = dateTransformed ? dateTransformed : '';
    });
  }

  ngOnDestroy() {
    //Désabonner l'observable pour éviter les fuites de mémoire
    if (this.intervalSubscription) {
      this.intervalSubscription.unsubscribe();
    }
  }
}
