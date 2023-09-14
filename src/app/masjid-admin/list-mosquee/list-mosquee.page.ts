import { Component, OnInit } from '@angular/core';
import {Mosque} from "../../model/mosque.model";
import {MosqueService} from "../../../data/mosque/mosque.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {map, Observable} from "rxjs";

@Component({
  selector: 'app-list-mosquee',
  templateUrl: './list-mosquee.page.html',
  styleUrls: ['./list-mosquee.page.scss'],
})
export class ListMosqueePage implements OnInit {
  showAdd = false;
  showAddAn = false;
  showAddAd = true;
  mosques: Mosque[]= [];
  mosqueForm!: FormGroup;
  constructor(private mosqueService: MosqueService, private  formBuilder: FormBuilder) { }

  ngOnInit() {
    this.mosqueService.getAllMosques().then(value => value.subscribe(v =>{
      this.mosques = v
    }));
    const urlRegex: RegExp = /(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})(\.[a-zA-Z0-9]{2,})?/;

    this.mosqueForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      location: [null, [Validators.required, Validators.pattern(urlRegex)]],
      imamName: [null, [Validators.required]],
      numDonation: [null, ],
      descDonation: [null],
      quartier: [null, [Validators.required]],
      fajr: [null, [Validators.required]],
      dohr: [null, [Validators.required]],
      asr: [null, [Validators.required]],
      maghreb: [null, [Validators.required]],
      isha: [null, [Validators.required]],
      djumha: [null, [Validators.required]],

    });
  }

  addNewMosque() {
    const mosque: Mosque = {
      id: null,
      name: this.mosqueForm.get('name')?.value,
      imageUrl: null,
      imamName: this.mosqueForm.get('imamName')?.value,
      numDonation: this.mosqueForm.get('numDonation')?.value,
      descDonation: this.mosqueForm.get('descDonation')?.value,
      location: this.mosqueForm.get('location')?.value,
      quartier: this.mosqueForm.get('quartier')?.value,
      lat: 0,
      lng: 0,
      fajr: this.mosqueForm.get('fajr')?.value,
      dohr: this.mosqueForm.get('dohr')?.value,
      asr: this.mosqueForm.get('asr')?.value,
      maghreb: this.mosqueForm.get('maghreb')?.value,
      isha: this.mosqueForm.get('isha')?.value,
      djumha: this.mosqueForm.get('djumha')?.value
    }


    const fileInput = document.getElementById('fileInput') as HTMLInputElement;

    // Vérifiez si un fichier a été sélectionné
    if (fileInput.files && fileInput.files.length > 0) {
      // Récupérez le premier fichier sélectionné
      const file = fileInput.files[0];

      // Maintenant, vous pouvez utiliser 'file' en toute sécurité
      console.log('Nom du fichier :', file.name);
      console.log('Taille du fichier :', file.size, 'octets');

      this.mosqueService.createMosque(mosque, file);
    } else {
      // Aucun fichier sélectionné
      console.log('Aucune image sélectionné.');
    }

    //console.log(mosque)
  }

  // Cette méthode sera utilisé pour uploader un fichier de récitation
  /*uploadFile() {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;

// Vérifiez si un fichier a été sélectionné
    if (fileInput.files && fileInput.files.length > 0) {
      // Récupérez le premier fichier sélectionné
      const file = fileInput.files[0];

      // Maintenant, vous pouvez utiliser 'file' en toute sécurité
      console.log('Nom du fichier :', file.name);
      console.log('Taille du fichier :', file.size, 'octets');

      this.mosqueService.loadMosqueImage(file);
    } else {
      // Aucun fichier sélectionné
      console.log('Aucun fichier sélectionné.');
    }
  }*/

}
