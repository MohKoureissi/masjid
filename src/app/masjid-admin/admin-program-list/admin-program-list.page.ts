import { Component, OnInit } from '@angular/core';
import {AlertController, ModalController} from "@ionic/angular";
import {ProgramFormPage} from "../components/program-form/program-form.page";
import {ActivatedRoute} from "@angular/router";
import {Programme} from "../../model/programme.model";
import {ProgramService} from "../../../data/programme/programme.service";
import {Mosque} from "../../model/mosque.model";
import {MosqueService} from "../../../data/mosque/mosque.service";

@Component({
  selector: 'app-admin-program-list',
  templateUrl: './admin-program-list.page.html',
  styleUrls: ['./admin-program-list.page.scss'],
})
export class AdminProgramListPage implements OnInit {
  programmes: Programme[] = [];
  mosque!: Mosque|null;
  constructor(
    private programmeService: ProgramService,
    private mosqueService: MosqueService,
    private alertController: AlertController,
    private modalCtrl: ModalController,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.params['id']
    this.mosqueService.getDetailsMosque(id).then(mosque => mosque.subscribe(m => {
      this.mosque = m;
    }));
    this.programmeService.getAllPrograms(id).then(programmes => programmes.subscribe(p =>{
      this.programmes = p;
    }))
  }

  async openModal() {
    const programFormModal = this.modalCtrl.create({
      component: ProgramFormPage,
      backdropDismiss: false,
    });
    await programFormModal.then(m=> m.present());
  }

  openModalWithUpdateMode(programme: Programme) {

  }

  deleteProgramme(programId: string|null) {

  }
}
