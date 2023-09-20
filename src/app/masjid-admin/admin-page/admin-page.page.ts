import { Component, OnInit } from '@angular/core';
import {AlertController, ModalController} from "@ionic/angular";
import {AdminFormPage} from "../components/admin-form/admin-form.page";
import {AdminModel} from "../../model/admin.model";
import {AdminService} from "../../../data/user/admin.service";
import {FormBuilder} from "@angular/forms";
import {AnnouncementFormPage} from "../components/announcement-form/announcement-form.page";

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.page.html',
  styleUrls: ['./admin-page.page.scss'],
})
export class AdminPagePage implements OnInit {
  admins: AdminModel[] = []
  constructor(
    private modalCtrl: ModalController,
    private alertController: AlertController,
    private adminService: AdminService
  ) { }

  ngOnInit() {
    this.adminService.getAdmins().then(value => value.subscribe(a => {
      this.admins = a
    }));
  }

  async openModal() {
    const adminFormModal = this.modalCtrl.create({
      component: AdminFormPage,
      backdropDismiss: false,
    });
    await adminFormModal.then(m=> m.present());
  }

  async openModalWithUpdateMode(admin: AdminModel) {
    const adminFormModal = this.modalCtrl.create({
      component: AdminFormPage,
      backdropDismiss: false,
      componentProps: {
        // Les valeurs par défaut du formulaire
        id: admin.id,
        fullName: admin.fullName,
        imageUrl: admin.imageUrl,
        email: admin.email,
        numTel: admin.numTel,
        password: admin.password,
        recupEmail: admin.recupEmail
      },
    });
    await adminFormModal.then(m=> m.present());
  }

  async deleteAdmin(adminId: string | null) {
    if (adminId !== null) {
      const alert = await this.alertController.create({
        header: 'Confirmation',
        message: 'Voulez-vous vraiment supprimer cet administrateur ?',
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
                await this.adminService.deleteAdmin(adminId);

                console.log(`annonce avec l'ID ${adminId} supprimée avec succès`);


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
}
