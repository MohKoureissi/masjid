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
export class Qibla implements OnInit {
  qiblaDirection: number = 0;
  compassRotation: number = 0;
  data! : string

  constructor(private qiblaService: QiblaService) {}

  ngOnInit() {
    this.getQiblaDirection()
    // Attachez la fonction handleDeviceOrientation à l'événement deviceorientation de window
    window.addEventListener("deviceorientationabsolute", (e:any) =>{
      this.data = e.alpha+" "+e.beta+" "+e.gama
    }, true);
  }



  async getQiblaDirection() {
    try {
      this.qiblaDirection = await this.qiblaService.getQiblaDirection();
    } catch (error) {
      console.error('Erreur lors de la récupération de la direction de la Qibla :', error);
    }
  }






}



