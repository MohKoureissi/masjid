import { Component, OnInit } from '@angular/core';
import {AnnouncementFormPage} from "../components/announcement-form/announcement-form.page";
import {AnnouncementService} from "../../../data/announcement/announcement.service";
import {FormBuilder} from "@angular/forms";
import {AlertController, ModalController} from "@ionic/angular";
import {ProgramFormPage} from "../components/program-form/program-form.page";

@Component({
  selector: 'app-admin-program-list',
  templateUrl: './admin-program-list.page.html',
  styleUrls: ['./admin-program-list.page.scss'],
})
export class AdminProgramListPage implements OnInit {

  constructor(
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
  }

  async openModal() {
    const programFormModal = this.modalCtrl.create({
      component: ProgramFormPage,
      backdropDismiss: false,
    });
    await programFormModal.then(m=> m.present());
  }
}
