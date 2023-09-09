import { AnnouncementService } from './announcement-pages/service/announcement.service';
import { MosqueService } from './mosque-pages/service/mosque.service';
import { Component, OnInit } from '@angular/core';
import { UserService } from './user-pages/service/user.service';
import { Mosque } from './model/mosque.model';
import {TimeService} from "./time-pages/service/time.service";
import {TimeModel} from "./model/time.model";
import { Announcements } from './model/announcement.model';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

  constructor(private MosqueService:MosqueService, private UserService:UserService, private AnnouncementService:AnnouncementService) {}
  ngOnInit(): void {

    //  const mosque: Mosque = {
    // id: null,
    // name: "Mosquée Ar-Rahmane de Sébénikoro",
    // imanName: "Mahi",
    // description: "belle mosquee",
    // donation: "7218734",
    // location: "Bamako",
    // quartier: "Sébénikoro",
    // lat:12.610543806858887,
    // lng:-8.044679166173166
    // };


    // this.MosqueService.createMosque(mosque)

    // this.MosqueService.getAllMosques()
}}

