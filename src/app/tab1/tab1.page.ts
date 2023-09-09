import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { Geolocation } from '@capacitor/geolocation';
import { MosqueService } from '../mosque-pages/service/mosque.service';
import 'leaflet-routing-machine';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  map!: L.Map;
  constructor(private mosqueService: MosqueService) {}

  async ngOnInit() {
 this.initMap()
 this.displayMosques()

  }

  async initMap() {
    const { coords } = await Geolocation.getCurrentPosition();
    const lat = coords.latitude;
    const lng = coords.longitude;

    this.map = L.map('map').setView([lat, lng], 15);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
    }).addTo(this.map);

    const marker = L.marker([lat, lng]).addTo(this.map);

    marker.bindPopup('Vous êtes ici !').openPopup();
  }

  async displayMosques() {
    // Récupérez les données des mosquées depuis le service
    const mosques = await this.mosqueService.filter();

    // Obtenir la position actuelle
    const { coords } = await Geolocation.getCurrentPosition();
    const lat = coords.latitude;
    const lng = coords.longitude;

    // Créer un itinéraire depuis votre position actuelle jusqu'à chaque mosquée
    mosques.forEach((mosque) => {
      const mosqueLocation = L.latLng(mosque.lat, mosque.lng);
      const route = L.Routing.control({
        waypoints: [
          L.latLng(lat, lng), // Position actuelle
          mosqueLocation,     // Emplacement de la mosquée
        ],
        routeWhileDragging: true, // Mettez à true si vous souhaitez recalculer l'itinéraire pendant le glissement du marqueur
      }).addTo(this.map);

      // Ajoutez un marqueur à la position de la mosquée
      L.marker(mosqueLocation)
        .addTo(this.map)
        .bindPopup(`Nom : ${mosque.name}<br>Quartier : ${mosque.quartier}`);
    });
  }

  

}
