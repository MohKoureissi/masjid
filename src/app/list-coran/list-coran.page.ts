import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {RecitationService} from "../../data/recitation/recitation.service";
import {RecitationModel} from "../model/recitation.model";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-list-coran',
  templateUrl: './list-coran.page.html',
  styleUrls: ['./list-coran.page.scss'],
})
export class ListCoranPage implements OnInit {
  recitations: RecitationModel[] = [];
  constructor(private route: ActivatedRoute, private recitationService: RecitationService, private http: HttpClient) { }

  async ngOnInit() {
    const id = this.route.snapshot.params['id'];
    await this.recitationService.getAllRecitations(id).then(recitations => recitations.subscribe(r => {
      this.recitations = r;
    }))

  }

  stopPropagation(event: Event, url: string, fileName: string) {
    event.stopPropagation();
    this.downloadAudioFile(url, fileName)
  }









  downloadAudioFile(audioUrl: string, fileName: string) {
    console.log("commençons le téléchargement du fichier");
    fetch(audioUrl)
      .then((response) => response.blob())
      .then((blob) => {
        // Crée un objet URL à partir du Blob
        const url = window.URL.createObjectURL(blob);

        // Crée un élément <a> pour déclencher le téléchargement
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;

        // Ajoute l'élément <a> à la page et déclenche le téléchargement
        document.body.appendChild(a);
        a.click();

        // Nettoie l'objet URL
        window.URL.revokeObjectURL(url);
      })
      .catch((error) => {
        console.error('Erreur lors du téléchargement du fichier :', error);
      });
  }



}
