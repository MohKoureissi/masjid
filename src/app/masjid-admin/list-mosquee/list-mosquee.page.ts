import { Component, OnInit } from '@angular/core';
import {Mosque} from "../../model/mosque.model";
import {MosqueService} from "../../../data/mosque/mosque.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {map, Observable} from "rxjs";
import {AlertController, ModalController} from '@ionic/angular';
import {MosqueFormPage} from "../components/mosque-form/mosque-form.page";

@Component({
  selector: 'app-list-mosquee',
  templateUrl: './list-mosquee.page.html',
  styleUrls: ['./list-mosquee.page.scss'],
})
export class ListMosqueePage implements OnInit {
  showAdd = false;
  showAddAn = false;
  showAddAd = true;
  mosques: Mosque[]= [];
  mosqueForm!: FormGroup;
  mosqueeEnCoursDeModification: Mosque | any;

  isEditing = false;
  constructor(private mosqueService: MosqueService,
              private  formBuilder: FormBuilder,
              private alertController: AlertController,
              private modalCtrl: ModalController
              ) { }

  ngOnInit() {
    this.mosqueService.getAllMosques().then(value => value.subscribe(v =>{
      this.mosques = v
    }));
    const urlRegex: RegExp = /(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})(\.[a-zA-Z0-9]{2,})?/;

    this.mosqueForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      location: [null, [Validators.required, Validators.pattern(urlRegex)]],
      imamName: [null, [Validators.required]],
      numDonation: [null, ],
      descDonation: [null],
      quartier: [null, [Validators.required]],
      fajr: [null, [Validators.required]],
      dohr: [null, [Validators.required]],
      asr: [null, [Validators.required]],
      maghreb: [null, [Validators.required]],
      isha: [null, [Validators.required]],
      djumha: [null, [Validators.required]],

    });
  }

  ouvrirModalModification(mosque: Mosque) {
    this.mosqueeEnCoursDeModification = mosque;
    // Remplissez le formulaire avec les données de la mosquée
    this.mosqueForm.patchValue({
      name: mosque.name,
      quartier: mosque.quartier,
      imamName: mosque.imamName,
      location: mosque.location,
      isha: mosque.isha,
      maghreb:mosque.maghreb,
      asr:mosque.asr,
      djumha:mosque.djumha,
      dohr:mosque.dohr,
      fajr:mosque.fajr,
      imageUrl:mosque.imageUrl,
      numDonation:mosque.numDonation,
      descDonation:mosque.descDonation

      // Remplissez les autres champs ici avec les propriétés de la mosquée
    });
    this.showAdd = true; // Ouvrez le modal d'ajout/modification
    this.isEditing = true; // Ouvrez le modal d'ajout/modification
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

                // Refresh the page to see the updated mosques.
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


  async updateMosque() {
    if (this.mosqueeEnCoursDeModification) {
      // Récupérez les données du formulaire
      const updatedMosque: Mosque = {
        ...this.mosqueeEnCoursDeModification,
        name: this.mosqueForm.get('name')?.value,
        quartier: this.mosqueForm.get('quartier')?.value,
        imamName: this.mosqueForm.get('imamName')?.value,
        asr: this.mosqueForm.get('asr')?.value,
        fajr: this.mosqueForm.get('fajr')?.value,
        isha: this.mosqueForm.get('isha')?.value,
        djumha: this.mosqueForm.get('djumha')?.value,
        maghreb: this.mosqueForm.get('maghreb')?.value,
        location: this.mosqueForm.get('location')?.value,
        dohr:this.mosqueForm.get('dohr')?.value,
        // imageUrl:this.mosqueForm.get('imageUrl')?.value,
        numDonation: this.mosqueForm.get('numDonation')?.value,
        descDonation: this.mosqueForm.get('descDonation')?.value


      };

      try {
        await this.mosqueService.updateMosque(this.mosqueeEnCoursDeModification.id, updatedMosque);
        console.log(`Mosquée avec l'ID ${this.mosqueeEnCoursDeModification.id} mise à jour avec succès`);

        // Mettez à jour la mosquée dans la liste locale
        const index = this.mosques.findIndex((mosque) => mosque.id === this.mosqueeEnCoursDeModification.id);
        if (index !== -1) {
          this.mosques[index] = updatedMosque;
        }

        // Réinitialisez le formulaire et fermez le modal
        this.mosqueForm.reset();
        this.showAdd = false;
        this.mosqueeEnCoursDeModification = null;
      } catch (error) {
        console.error(`Erreur lors de la mise à jour de la mosquée : ${error}`);
      }
    } else {
      console.warn("ID de la mosquée à modifier est null.");
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
        djumha: mosque.djumha,
        isAdd: false
      },
    });
    await mosqueFormModal.then(m=> m.present());
  }
}
