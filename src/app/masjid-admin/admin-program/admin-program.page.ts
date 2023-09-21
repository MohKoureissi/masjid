import { Component, OnInit } from '@angular/core';
import {AnnouncementService} from "../../../data/announcement/announcement.service";
import {AlertController, ModalController} from "@ionic/angular";
import {ProgramService} from "../../../data/programme/programme.service";
import {Programme} from "../../model/programme.model";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-admin-program',
  templateUrl: './admin-program.page.html',
  styleUrls: ['./admin-program.page.scss'],
})
export class AdminProgramPage implements OnInit {
  programmes: Programme[] = [];

  constructor(
    private programmeService: ProgramService,
    private alertController: AlertController,
    private modalCtrl: ModalController,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.params['id']
    this.programmeService.getAllPrograms(id).then(programmes => programmes.subscribe(p =>{
      this.programmes = p;
    }))
  }

  openModal() {

  }
}
