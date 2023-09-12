import { Mosque } from 'src/app/model/mosque.model';
import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet';
import { Geocoder, geocoders } from 'leaflet-control-geocoder';
import { Geolocation } from '@capacitor/geolocation';
import 'leaflet-routing-machine';
import { MosqueService } from "../../data/mosque/mosque.service";

@Component({
  selector: 'app-localisation',
  templateUrl: 'localisation.page.html',
  styleUrls: ['localisation.page.scss']
})
export class Localisation implements OnInit {
  map!: L.Map;
  currentRoute: any;
  userMarker: L.Marker | null = null;
  watchId: number | null = null;

  // Pour stocker les mosquées
  mosquee: Mosque[] = [];
  filteredMosques: Mosque[] = [];
  searchQuery: string = '';
  markersLayer: L.LayerGroup = L.layerGroup();

  constructor(private mosqueService: MosqueService) {}

  async ngOnInit() {
    await this.initMap();
    const mosques = await this.mosqueService.filter();
    await this.afficherMosques(mosques);
    const searchLayer = L.layerGroup().addTo(this.map);
  }

  async initMap() {
    const { coords } = await Geolocation.getCurrentPosition();
    const lat = coords.latitude;
    const lng = coords.longitude;

    this.map = L.map('map').setView([lat, lng], 15);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
    }).addTo(this.map);

    new Geocoder({
      geocoder: new geocoders.Nominatim(),
      position: 'topright',

    }).addTo(this.map);


    const marker = L.marker([lat, lng]).addTo(this.map);
    marker.bindPopup('Vous êtes ici !').openPopup();
  }


  async afficherMosques(mosques: any[]) {
    const imageMosque = L.icon({
      iconUrl: '/assets/logo.png',
      iconSize: [32, 32],
      iconAnchor: [16, 32],
    });

    mosques.forEach((mosque) => {
      const mosqueLocation = L.latLng(mosque.lat, mosque.lng);

      const mosqueMarker = L.marker(mosqueLocation, { icon: imageMosque })
        .addTo(this.map)
        .bindPopup(`
             Nom : ${mosque.name}<br>Quartier : ${mosque.quartier} <br>Quartier : ${mosque.imanName}
        `);

      mosqueMarker.on('click', () => {
        this.lancerItineraireVersMosquee(mosque);
      });
    });
  }

  async createRoute(startCoords: L.LatLng, endCoords: L.LatLng) {
    if (this.currentRoute) {
      this.map.removeControl(this.currentRoute);
    }

    this.currentRoute = L.Routing.control({
      waypoints: [
        L.latLng(startCoords.lat, startCoords.lng),
        L.latLng(endCoords.lat, endCoords.lng),
      ],
      routeWhileDragging: true,
    }).addTo(this.map);
  }

  async lancerItineraireVersMosquee(mosque: any) {
    const mosqueLocation = L.latLng(mosque.lat, mosque.lng);

    const { coords } = await Geolocation.getCurrentPosition();
    const currentLocation = L.latLng(coords.latitude, coords.longitude);

    // Créez un marqueur pour l'utilisateur s'il n'existe pas encore
    if (!this.userMarker) {
      this.userMarker = L.marker(currentLocation).addTo(this.map);
    }

    const watchOptions = {
      enableHighAccuracy: true,
    };

    // Utilisez watchPosition pour suivre la position de l'utilisateur en temps réel
    this.watchId = navigator.geolocation.watchPosition(
      (position) => {
        const userLocation = L.latLng(
          position.coords.latitude,
          position.coords.longitude
        );

        if (this.userMarker) {
          this.userMarker.setLatLng(userLocation);
        }

        // Vous pouvez également mettre à jour l'itinéraire en temps réel ici si nécessaire
        // this.updateRoute(userLocation, mosqueLocation);
      },
      (error) => {
        console.error('Erreur de géolocalisation :', error);
      },
      watchOptions
    );

    // Créez l'itinéraire initial
    this.createRoute(currentLocation, mosqueLocation);
  }


  async quitterItineraire() {
    if (this.currentRoute) {
      if (this.userMarker) {
        this.map.removeLayer(this.userMarker);
        this.userMarker = null;
      }

      if (this.watchId) {
        navigator.geolocation.clearWatch(this.watchId);
      }

      this.map.removeControl(this.currentRoute);
      this.currentRoute = null;
      alert('Itinéraire quitté')

      console.log('Itinéraire quitté.');
    } else {
      alert('Aucun itinéraire actuellement tracé')
      console.error('Aucun itinéraire actuellement tracé.');
    }
  }

  onSearchInput(event: any) {
    const searchValue = event.target.value.toLowerCase();
    this.filteredMosques = this.mosquee.filter((mosque) => {
      return (
        mosque.name.toLowerCase().includes(searchValue) ||
        mosque.imanName.toLowerCase().includes(searchValue)
      );
    });

    this.markersLayer.clearLayers();

    this.filteredMosques.forEach((mosque) => {
      const mosqueLocation = L.latLng(mosque.lat, mosque.lng);
      const marker = L.marker(mosqueLocation).addTo(this.markersLayer);
      marker.bindPopup(`
        Nom : ${mosque.name}<br>Imam : ${mosque.imanName}<br>
        Quartier : ${mosque.quartier}
      `);
    });

    this.markersLayer.addTo(this.map);
  }

  async partagerItineraire() {
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

        // Générer un lien WhatsApp
        const whatsappLink = `https://api.whatsapp.com/send?text=${encodeURIComponent('Check out this route: ' + routeLink)}`;

        // Ouvrir le lien WhatsApp dans une nouvelle fenêtre ou un nouvel onglet
        window.open(whatsappLink);

      } else {
      alert('L\'itinéraire non chosi')

        console.error('L\'itinéraire ne contient pas suffisamment de waypoints pour le partager.');
      }
    } else {
      alert('L\'itinéraire non chosi')
      console.error('Aucun itinéraire actuellement tracé.');
    }
  }
//afficher position
  async afficherPositionUser() {
    try {
      const  position = await Geolocation.getCurrentPosition();

      const lat = position.coords.latitude;
      const lng = position.coords.longitude;

      // Centrez la carte sur la position de l'utilisateur
      this.map.setView([lat, lng],20);

    } catch (error) {
      console.error('Erreur de géolocalisation :', error);
    }
  }

}
