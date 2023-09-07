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

  // const mosque: Mosque = {
  //   id: null,
  //   name: "Mosque faissala",
  //   imanName: "Koita",
  //   description: "belle mosquee",
  //   donation: "7218734",
  //   location: "Bamako",
  //   quartier: "Sebenikoro"
  //   };

// this.MosqueService.deleteMosque("5wAxEAuQ2uUkwGBBwz6C")
    // this.AnnouncementService.updateAnnouncement("6kfsj8p2dl6gHP4mFQfp",annonce);

// this.AnnouncementService.createAnnouncement();
    // const mosque: Mosque = {
    //   id:null,
    //   name: 'Nom de la mosquée',
    //   imanName: 'Nom de l\'iman',
    //   description: 'Description de la mosquée',
    //   donation: 'Informations sur les dons',
    //   location: 'Emplacement de la mosquée',
    //   quartier: 'Quartier de la mosquée',
    // };
  //   this.UserService.desabonneAnnonce("PtLvGxAOJl2fWzfTEMCT","5wAxEAuQ2uUkwGBBwz6C")
  //  this.UserService.loginUser('awa80598@gmail.com','123456')
  //  this.userService.loginUser('ayaya6436@gmail.com','0987654');
  //  this.userService.logoutUser();
  
  // ngOnInit(): void {
  //   const time: TimeModel = {
  //     id: null,
  //     name: 'Fajr',
  //     hour: 0,
  //     minute: 0
  //   }
  //   this.timeService.addTime(time);

  // }
}}
