import { Component, OnInit } from '@angular/core';
import {AnnouncementService} from "../../data/announcement/announcement.service";
import {Announcement} from "../model/announcement.model";

@Component({
  selector: 'app-annonces',
  templateUrl: './annonces.page.html',
  styleUrls: ['./annonces.page.scss'],
})
export class AnnoncesPage implements OnInit {

  announcements: Announcement[] = [];
  constructor(private announcementService: AnnouncementService) { }

  ngOnInit() {
    this.announcementService.getAllAnnouncements().then(
      announcements => announcements.subscribe(a =>{
        this.announcements = a;
    }))
  }

}
