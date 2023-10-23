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
      componentProps: {
        mosqueId: this.mosque?.id
      }
    });
    await programFormModal.then(m=> m.present());
  }

  async openModalWithUpdateMode(programme: Programme) {
    const programFormModal = this.modalCtrl.create({
      component: ProgramFormPage,
      backdropDismiss: false,
      componentProps: {
        // Les valeurs par défaut du formulaire
        id: programme.id,
        title: programme.title,
        organizer: programme.organizer,
        daysTimes: programme.daysTimes, // Ex: Lundi à 14:00, Mardi à 19:00
        description: programme.description,
        mosqueId: programme.mosqueId
      },
    });
    await programFormModal.then(m=> m.present());

  }

  async deleteProgram(mosqueId: string | null, programmeId: string | null) {
    if (mosqueId !== null && programmeId !== null) {
      const alert = await this.alertController.create({
        header: 'Confirmation',
        message: 'Voulez-vous vraiment supprimer cet programme ?',
        buttons: [
          {
            text: 'Annuler',
            role: 'cancel',
            handler: () => {
              console.log('Suppression annulée');
            },
          },
          {
            text: 'Supprimer',
            handler: async () => {
              try {
                await this.programmeService.deleteProgram(mosqueId, programmeId);

                console.log(`Le programme avec l'ID ${programmeId} a été supprimée avec succès`);


                // Refresh the page to see the updated mosques.
                window.location.reload();
              } catch (error) {
                console.error(`Erreur lors de la suppression du programme : ${error}`);
              }
            },
          },
        ],
      });

      await alert.present();
    } else {
      console.warn("ID de la mosquée est null.");
    }
  }
}
