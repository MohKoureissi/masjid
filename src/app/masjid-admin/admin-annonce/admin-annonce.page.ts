import { Component, OnInit } from '@angular/core';
import { Announcement } from 'src/app/model/announcement.model';
import { AnnouncementService } from 'src/data/announcement/announcement.service';
import {AlertController, ModalController} from '@ionic/angular';
import {AnnouncementFormPage} from "../components/announcement-form/announcement-form.page";


@Component({
  selector: 'app-admin-annonce',
  templateUrl: './admin-annonce.page.html',
  styleUrls: ['./admin-annonce.page.scss'],
})
export class AdminAnnoncePage implements OnInit {
  announcements: Announcement[] = [];

  constructor(
    private announcementService: AnnouncementService,
    private alertController: AlertController,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    this.announcementService.getAllAnnouncements().then(value => value.subscribe(a => {
      this.announcements = a
    }));
  }

  //delete annonce
  async deleteAnnouncement(announcementId: string | null) {
    if (announcementId !== null) {
      const alert = await this.alertController.create({
        header: 'Confirmation',
        message: 'Voulez-vous vraiment supprimer cette annonce ?',
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
                await this.announcementService.deleteAnnouncement(announcementId);

                console.log(`annonce avec l'ID ${announcementId} supprimée avec succès`);


                // Refresh the page to see the updated mosques.
                window.location.reload();
              } catch (error) {
                console.error(`Erreur lors de la suppression de la annonce : ${error}`);
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


  async openModal() {
    const announcementFormModal = this.modalCtrl.create({
      component: AnnouncementFormPage,
      backdropDismiss: false,
    });
    await announcementFormModal.then(m=> m.present());
  }


  async openModalWithUpdateMode(announcement: Announcement) {
    const announcementFormModal = this.modalCtrl.create({
      component: AnnouncementFormPage,
      backdropDismiss: false,
      componentProps: {
        // Les valeurs par défaut du formulaire
        id: announcement.id,
        title: announcement.title,
        place: announcement.place,
        description: announcement.description,
        location: announcement.location,
        date: announcement.date,
        imageUrl: announcement.imageUrl,
        organizer: announcement.organizer,
      },
    });
    await announcementFormModal.then(m=> m.present());
  }

}
