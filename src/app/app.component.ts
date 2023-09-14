import { Component, OnInit } from '@angular/core';
import { Mosque } from './model/mosque.model';
import {RecitationService} from "../data/recitation/recitation.service";
import {RecitationModel} from "./model/recitation.model";
import {PreachService} from "../data/preach/preach.service";
import {PreacheModel} from "./model/preache.model";


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

  mosque: Mosque|null = null;
  constructor(private preacheService: PreachService) {}
  ngOnInit(): void {
    this.test();
  }

  async test() {


    //this.preacheService.createPreache(preach, );
  }

}
