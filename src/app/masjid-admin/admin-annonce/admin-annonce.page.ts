import { Component, OnInit } from '@angular/core';
import { Announcement } from 'src/app/model/announcement.model';
import { AnnouncementService } from 'src/data/announcement/announcement.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {AlertController, ModalController} from '@ionic/angular';
import {MosqueFormPage} from "../components/mosque-form/mosque-form.page";
import {AnnouncementFormPage} from "../components/announcement-form/announcement-form.page";


@Component({
  selector: 'app-admin-annonce',
  templateUrl: './admin-annonce.page.html',
  styleUrls: ['./admin-annonce.page.scss'],
})
export class AdminAnnoncePage implements OnInit {
  showAddAn = false;
  showAddAd = true;
  showAdd = false;
  announcements: Announcement[] = [];
  announcementForm!: FormGroup;
  AnnouncementEnCoursDeModification: Announcement | any;
  isEditing = false;

  constructor(
    private announcementService: AnnouncementService,
    private formBuilder: FormBuilder,
    private alertController: AlertController,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    this.announcementService.getAllAnnouncements().then(value => value.subscribe(a => {
      this.announcements = a
    }));

    this.announcementForm = this.formBuilder.group({
      title: [null, [Validators.required]],
      location: [null, [Validators.required]],
      place: [null, [Validators.required]],
      description: [null],
      date: [null, [Validators.required]],
      hour: [null, [Validators.required]],
      imageUrl: [null, [Validators.required]],
      organizer: [null, [Validators.required]],
    });


  }

  ouvrirModalModification(announcement: Announcement) {
    this.AnnouncementEnCoursDeModification = announcement;
    this.announcementForm.patchValue({
      title: announcement.title,
      description: announcement.description,
      date: announcement.date,
      place: announcement.place,
      location: announcement.location,
      imageUrl: announcement.imageUrl,
      hour: announcement.hour,
      organizer: announcement.organizer,
    });
    this.showAdd = true; // Ouvrez le modal d'ajout/modification
    this.isEditing = true;
  }

  addNewAnnouncement() {
    const announcement = {
      id: null,
      title: this.announcementForm.get('title')?.value,
      place: this.announcementForm.get('place')?.value,
      description: this.announcementForm.get('description')?.value,
      location: this.announcementForm.get('location')?.value,
      date: this.announcementForm.get('date')?.value,
      hour: this.announcementForm.get('hour')?.value,
      imageUrl: this.announcementForm.get('imageUrl')?.value,
      organizer: this.announcementForm.get('organizer')?.value,
    };

    // Vérifiez si un fichier a été sélectionné
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      // Récupérez le premier fichier sélectionné
      const file = fileInput.files[0];

      // Maintenant, vous pouvez utiliser 'file' en toute sécurité
      console.log('Nom du fichier :', file.name);
      console.log('Taille du fichier :', file.size, 'octets');

      // Ensuite, vous pouvez appeler votre service pour ajouter l'annonce
      this.announcementService.createAnnouncement(announcement, file)
      alert("Annonce creer avec succes")
      // Réinitialisez le formulaire après l'ajout

    } else {
      // Aucun fichier sélectionné
      console.log('Aucune image sélectionnée.');
    }


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


  // mise a jour
  async updateAnnouncement() {
    if (this.AnnouncementEnCoursDeModification) {
      // recupere les donnees du formulaire
      const updateAnnouncement: Announcement = {
        ...this.AnnouncementEnCoursDeModification,
        title: this.announcementForm.get('title')?.value,
        date: this.announcementForm.get('date')?.value,
        description: this.announcementForm.get('description')?.value,
        place: this.announcementForm.get('place')?.value,
        imageUrl: this.announcementForm.get('imageUrl')?.value,
        location: this.announcementForm.get('location')?.value,
        organizer: this.announcementForm.get('organizer')?.value,
        hour: this.announcementForm.get('hour')?.value

      };
      try {
        await this.announcementService.updateAnnouncement(this.AnnouncementEnCoursDeModification.id, updateAnnouncement);
        alert("Annonce mise a jour avec succes")
        console.log(`Annonce avec l'ID ${this.AnnouncementEnCoursDeModification.id} mise à jour avec succès`)
        // Mettez à jour l'annonce dans la liste locale
        const index = this.announcements.findIndex((announcement) => announcement.id === this.AnnouncementEnCoursDeModification.id);
        if (index !== -1) {
          this.announcements[index] = updateAnnouncement;
        }

        // Réinitialisez le formulaire et fermez le modal
        this.announcementForm.reset();
        this.showAdd = false;
        this.AnnouncementEnCoursDeModification = null;
      } catch (error) {
        console.error(`Erreur lors de la mise à jour de l\'annonce : ${error}`);
      }
    } else {
      console.warn("ID de l\'annonce à modifier est null.");
    }
  }

  async openModal() {
    const announcementFormModal = this.modalCtrl.create({
      component: AnnouncementFormPage,
      backdropDismiss: false,
    });
    await announcementFormModal.then(m=> m.present());
  }
}
