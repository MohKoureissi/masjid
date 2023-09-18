import { Component, OnInit } from '@angular/core';
import {ModalController} from "@ionic/angular";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Mosque} from "../../../model/mosque.model";
import {MosqueService} from "../../../../data/mosque/mosque.service";

@Component({
  selector: 'app-mosque-form',
  templateUrl: './mosque-form.page.html',
  styleUrls: ['./mosque-form.page.scss'],
  styles: [`
    ion-modal {
      max-width: 80%;
    }
  `]
})
export class MosqueFormPage implements OnInit {
  showForm1Content = true;
  showForm2Content = false;
  mosqueForm!: FormGroup;
  file!: File;

  fajr: string = "05:00";
  dohr: string = "13:30";
  asr: string = "16:00";
  maghreb: string = "19:00";
  isha: string = "20:00";
  djumha: string = "13:00";
  constructor(private modalCtrl: ModalController,
              private  formBuilder: FormBuilder,
              private mosqueService: MosqueService
  ) {
  }

  ngOnInit() {
    const urlRegex: RegExp = /(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})(\.[a-zA-Z0-9]{2,})?/;

    this.mosqueForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      location: [null, [Validators.required, Validators.pattern(urlRegex)]],
      imamName: [null, [Validators.required]],
      numDonation: [null, ],
      descDonation: [null],
      quartier: [null, [Validators.required]],
    });
  }

  goToPage2() {
    this.showForm1Content = false;
    this.showForm2Content = true;
    // Accédez au champ de fichier via le formulaire
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    console.log(fileInput);

    // Vérifiez si un fichier a été sélectionné
    if (fileInput.files && fileInput.files.length > 0) {
      // Récupérez le premier fichier sélectionné
      this.file = fileInput.files[0];

      // Maintenant, vous pouvez utiliser 'file' en toute sécurité
      console.log('Nom du fichier :', this.file.name);
      console.log('Taille du fichier :', this.file.size, 'octets');
    } else {
      // Aucun fichier sélectionné
      console.log('Aucune image sélectionné.');
    }
  }
  previous() {
    this.showForm1Content = true;
    this.showForm2Content = false;
  }


  updateFajr(event: any) {
    // Lorsque la valeur de l'élément ion-datetime change, elle est capturée ici
    this.fajr = event.detail.value;
    console.log(this.fajr)
  }
  updateDohr(event: any) {
    // Lorsque la valeur de l'élément ion-datetime change, elle est capturée ici
    this.dohr = event.detail.value;
  }
  updateAsr(event: any) {
    // Lorsque la valeur de l'élément ion-datetime change, elle est capturée ici
    this.asr = event.detail.value;
  }
  updateMaghreb(event: any) {
    // Lorsque la valeur de l'élément ion-datetime change, elle est capturée ici
    this.maghreb = event.detail.value;
  }
  updateIsha(event: any) {
    // Lorsque la valeur de l'élément ion-datetime change, elle est capturée ici
    this.isha = event.detail.value;
  }
  updateDjumha(event: any) {
    // Lorsque la valeur de l'élément ion-datetime change, elle est capturée ici
    this.djumha = event.detail.value;
  }

  async closeModal() {
    await this.modalCtrl.dismiss();
  }



  addNewMosque() {
    const mosque: Mosque = {
      id: null,
      name: this.mosqueForm.get('name')?.value,
      imageUrl: null,
      imamName: this.mosqueForm.get('imamName')?.value,
      numDonation: this.mosqueForm.get('numDonation')?.value,
      descDonation: this.mosqueForm.get('descDonation')?.value,
      location: this.mosqueForm.get('location')?.value,
      quartier: this.mosqueForm.get('quartier')?.value,
      lat: 0,
      lng: 0,
      fajr: this.fajr,
      dohr: this.dohr,
      asr: this.asr,
      maghreb: this.maghreb,
      isha: this.isha,
      djumha: this.djumha
    }

    this.mosqueService.createMosque(mosque, this.file);
    this.closeModal();
  }


}
