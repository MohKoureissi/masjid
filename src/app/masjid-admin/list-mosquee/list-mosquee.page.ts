import { Component, OnInit } from '@angular/core';
import {Mosque} from "../../model/mosque.model";
import {MosqueService} from "../../../data/mosque/mosque.service";
import {AlertController, ModalController} from '@ionic/angular';
import {MosqueFormPage} from "../components/mosque-form/mosque-form.page";

@Component({
  selector: 'app-list-mosquee',
  templateUrl: './list-mosquee.page.html',
  styleUrls: ['./list-mosquee.page.scss'],
})
export class ListMosqueePage implements OnInit {
  mosques: Mosque[]= [];

  isEditing = false;
  constructor(private mosqueService: MosqueService,
              private alertController: AlertController,
              private modalCtrl: ModalController
              ) { }

  ngOnInit() {
    this.mosqueService.getAllMosques().then(value => value.subscribe(v =>{
      this.mosques = v
    }));
  }

  async deleteMosque(mosqueId: string | null) {
    if (mosqueId !== null) {
      const alert = await this.alertController.create({
        header: 'Confirmation',
        message: 'Voulez-vous vraiment supprimer cette mosquée ?',
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
                await this.mosqueService.deleteMosque(mosqueId);
                console.log(`Mosquée avec l'ID ${mosqueId} supprimée avec succès`);

                // Rafraichir la liste des mosquées
                window.location.reload();
              } catch (error) {
                console.error(`Erreur lors de la suppression de la mosquée : ${error}`);
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
    const mosqueFormModal = this.modalCtrl.create({
      component: MosqueFormPage,
      backdropDismiss: false,
    });
    await mosqueFormModal.then(m=> m.present());
  }


  async openModalWithUpdateMode(mosque: Mosque) {
    const mosqueFormModal = this.modalCtrl.create({
      component: MosqueFormPage,
      backdropDismiss: false,
      componentProps: {
        // Les valeurs par défaut du formulaire
        id: mosque.id,
        name: mosque.name,
        imageUrl: mosque.imageUrl,
        imamName: mosque.imamName,
        numDonation: mosque.numDonation,
        descDonation: mosque.descDonation,
        location: mosque.location,
        quartier: mosque.quartier,
        lat: mosque.lat,
        lng: mosque.lng,
        fajr: mosque.fajr,
        dohr: mosque.dohr,
        asr: mosque.asr,
        maghreb: mosque.maghreb,
        isha: mosque.isha,
        djumha: mosque.djumha
      },
    });
    await mosqueFormModal.then(m=> m.present());
  }
}
