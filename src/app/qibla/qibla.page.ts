import { Mosque } from 'src/app/model/mosque.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet';
import { Geocoder, geocoders } from 'leaflet-control-geocoder';
import { Geolocation } from '@capacitor/geolocation';
import 'leaflet-routing-machine';
import { QiblaService } from 'src/data/qibla/qibla.service';

@Component({
  selector: 'app-qibla',
  templateUrl: 'qibla.page.html',
  styleUrls: ['qibla.page.scss']
})
export class Qibla implements OnInit,OnDestroy {
  qiblaDirection: number = 0;
  compassRotation: number = 0;

  constructor(private qiblaService: QiblaService) {}
  handleDeviceOrientation(event: DeviceOrientationEvent) {
    // Accédez aux valeurs beta et gamma de l'événement
    const { beta, gamma,alpha } = event;
    // Affichez ces valeurs dans la console pour le débogage
    console.log(`Beta (Inclinaison) : ${beta} degrés`);
    console.log(`Gamma (Roulis) : ${gamma} degrés`);
    console.log(`alpha (Roulis) : ${alpha} degrés`);

    // Utilisez ces valeurs pour mettre à jour la rotation de l'image de la boussole
    // Assurez-vous d'ajuster la logique en fonction de ces valeurs pour obtenir le comportement souhaité.
  }
  ngOnInit() {
    // Attachez la fonction handleDeviceOrientation à l'événement deviceorientation de window
    window.addEventListener('deviceorientation', this.handleDeviceOrientation.bind(this));
    this.getQiblaDirection();
  }

  ngOnDestroy() {
    // N'oubliez pas de supprimer l'écouteur d'événement lors de la destruction du composant
    window.removeEventListener('deviceorientation', this.handleDeviceOrientation.bind(this));
  }

  async getQiblaDirection() {
    try {
      this.qiblaDirection = await this.qiblaService.getQiblaDirection();
    } catch (error) {
      console.error('Erreur lors de la récupération de la direction de la Qibla :', error);
    }
  }






}
