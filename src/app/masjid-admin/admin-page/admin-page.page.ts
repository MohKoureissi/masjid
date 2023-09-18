import { Component, OnInit } from '@angular/core';
import {ModalController} from "@ionic/angular";
import {ProgramFormPage} from "../components/program-form/program-form.page";
import {AdminFormPage} from "../components/admin-form/admin-form.page";

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.page.html',
  styleUrls: ['./admin-page.page.scss'],
})
export class AdminPagePage implements OnInit {
  showAddAd = false;
  constructor(
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
  }

  async openModal() {
    const adminFormModal = this.modalCtrl.create({
      component: AdminFormPage,
      backdropDismiss: false,
    });
    await adminFormModal.then(m=> m.present());
  }
}
