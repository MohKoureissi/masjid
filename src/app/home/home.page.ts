import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import {Mosque} from "../model/mosque.model";
import {MosqueService} from "../../data/mosque/mosque.service";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {

  heureActuelle: string;
  private intervalSubscription: Subscription | undefined;
  mosque!: Mosque|null;

  constructor(private mosqueService: MosqueService) {
    const datePipe = new DatePipe('fr-FR');
    const dateTransformed = datePipe.transform(new Date(), 'HH:mm:ss');
    this.heureActuelle = dateTransformed ? dateTransformed : '';
  }

  async ngOnInit() {
    const mosque: Mosque = {
      id: "bxGLA4gWXHQf9DSKpHN1",
      name: "Al-Noor",
      imageUrl: "https://firebasestorage.googleapis.com/v0/b/masjid-1f3cf.appspot.com/o/mosques%2Fdefault-mosque.jpg?alt=media&token=4d74e169-b335-4635-a947-49044e13102a",
      imamName: "Idriss Sidik Traore",
      quartier: "Lafiabougou",
      location: "htttps://map.google.com/12.899,-11.601",
      numDonation: 72196636,
      descDonation: "Aucune",
      lat: 0,
      lng: 0,
      fajr: "05:10",
      dohr: "13:30",
      asr: "16:00",
      maghreb: "18:45",
      isha: "19:55",
      djumha: "13:00"
    }

    this.mosque = mosque;
    /*await this.mosqueService.getDetailsMosque("bxGLA4gWXHQf9DSKpHN1").then(mosque => mosque.subscribe(m =>{
      this.mosque = m;
    }));*/

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
