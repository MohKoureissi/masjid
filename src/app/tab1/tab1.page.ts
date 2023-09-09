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
//pour avoir la poistion de
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
    const imageMosque = L.icon({
      iconUrl: '/assets/logo.png', // URL de votre image personnalisée
      iconSize: [32, 32], // Taille de l'icône en pixels
      iconAnchor: [16, 32], // Point d'ancrage de l'icône par rapport à sa position
    });
    mosques.forEach((mosque) => {
      const mosqueLocation = L.latLng(mosque.lat, mosque.lng);

      // Ajoutez un marqueur à la position de la mosquée
      const mosqueMarker = L.marker(mosqueLocation, { icon: imageMosque })
        .addTo(this.map)
        .bindPopup(`
             Nom : ${mosque.name}<br>Quartier : ${mosque.quartier} <br>Quartier : ${mosque.imanName}

        `);

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

  async shareRoute() {
    // Vérifiez d'abord si un itinéraire est actuellement tracé
    if (this.currentRoute) {
      const route = this.currentRoute.getPlan();
      const waypoints = route.getWaypoints();

      if (waypoints.length >= 2) {
        // Obtenez les coordonnées de départ et d'arrivée
        const startCoords = waypoints[0].latLng;
        const endCoords = waypoints[waypoints.length - 1].latLng;

        // Générer un lien vers l'itinéraire en utilisant les coordonnées de départ et d'arrivée
        const routeLink = `https://www.google.com/maps/dir/${startCoords.lat},${startCoords.lng}/${endCoords.lat},${endCoords.lng}/`;

        // Vous pouvez maintenant utiliser ce lien pour partager l'itinéraire
        // Par exemple, vous pouvez l'ouvrir dans le navigateur ou le partager via une application de messagerie
        console.log('Lien vers l\'itinéraire:', routeLink);
      } else {
        console.error('L\'itinéraire ne contient pas suffisamment de waypoints pour le partager.');
      }
    } else {
      console.error('Aucun itinéraire actuellement tracé.');
    }
  }


}
