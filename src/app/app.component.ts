import { Component, OnInit } from '@angular/core';
import { Mosque } from './model/mosque.model';
import {TimeModel} from "./model/time.model";
import {AdminModel} from "./model/admin.model";
import {TimeService} from "../data/time/time.service";
import {AdminService} from "../data/user/admin.service";
import {MosqueService} from "../data/mosque/mosque.service";
import {Announcement} from "./model/announcement.model";
import {AnnouncementService} from "../data/announcement/announcement.service";
import {RadioModel} from "./model/radio.model";
import {RadioService} from "../data/radio/radio.service";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

  mosque: Mosque|null = null;
  constructor(private radioService: RadioService) {}
  ngOnInit(): void {
    this.test();
  }

  async test() {}
}
