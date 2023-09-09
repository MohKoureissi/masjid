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
  currentRoute: any;

  constructor(private mosqueService: MosqueService) {}

  async ngOnInit() {
    await this.initMap();
    const mosques = await this.mosqueService.filter();
    await this.displayAllMosques(mosques);
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

  async displayAllMosques(mosques: any[]) {
    mosques.forEach((mosque) => {
      const mosqueLocation = L.latLng(mosque.lat, mosque.lng);

      // Ajoutez un marqueur à la position de la mosquée
      const mosqueMarker = L.marker(mosqueLocation)
        .addTo(this.map)
        .bindPopup(`Nom : ${mosque.name}<br>Quartier : ${mosque.quartier} <br>Quartier : ${mosque.imanName}`);

      // Attachez un gestionnaire d'événements de clic au marqueur pour lancer l'itinéraire
      mosqueMarker.on('click', () => {
        this.launchRouteToMosque(mosque);
      });
    });
  }

  async createRoute(startCoords: L.LatLng, endCoords: L.LatLng) {
    // Supprimez l'itinéraire actuel s'il existe
    if (this.currentRoute) {
      this.map.removeControl(this.currentRoute);
    }

    // Calculez un nouvel itinéraire
    this.currentRoute = L.Routing.control({
      waypoints: [
        L.latLng(startCoords.lat, startCoords.lng), // Point de départ
        L.latLng(endCoords.lat, endCoords.lng),     // Point d'arrivée
      ],
      routeWhileDragging: true, // Mettez à true si vous souhaitez recalculer l'itinéraire pendant le glissement du marqueur
    }).addTo(this.map);
  }

  async launchRouteToMosque(mosque: any) {
    // Obtenez les coordonnées de la mosquée
    const mosqueLocation = L.latLng(mosque.lat, mosque.lng);

    // Obtenir la position actuelle de l'utilisateur
    const { coords } = await Geolocation.getCurrentPosition();
    const currentLocation = L.latLng(coords.latitude, coords.longitude);

    // Créez un itinéraire depuis la position actuelle vers la mosquée
    this.createRoute(currentLocation, mosqueLocation);
  }
}
