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

}
