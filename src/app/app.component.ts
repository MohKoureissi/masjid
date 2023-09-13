import { Component, OnInit } from '@angular/core';
import { Mosque } from './model/mosque.model';
import {RecitationService} from "../data/recitation/recitation.service";
import {RecitationModel} from "./model/recitation.model";


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

  mosque: Mosque|null = null;
  constructor(private recitationService: RecitationService) {}
  ngOnInit(): void {
    this.test();
  }

  async test() {
    this.recitationService.downloadRecitation("DMfFKyFucSDh0oYYbDzN", 1);

    const recit: RecitationModel = {
      id: null,
      apiUrl: null,
      duration: 0,
      readerId: "DMfFKyFucSDh0oYYbDzN",
      recitationNumber: 113,
      surah: null,
      downloadUrl: null
    }

    //await this.recitationService.addRecitation(recit);
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

      this.recitationService.loadRecitation("DMfFKyFucSDh0oYYbDzN", file);
    } else {
      // Aucun fichier sélectionné
      console.log('Aucun fichier sélectionné.');
    }
  }*/
}
