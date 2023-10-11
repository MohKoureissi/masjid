import {Component, Input, OnInit} from '@angular/core';
import {ModalController, NavParams} from "@ionic/angular";
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
  file: File|null = null;

  fajr!: string;
  dohr: string = "13:30";
  asr: string = "16:00";
  maghreb: string = "19:00";
  isha: string = "20:00";
  djumha: string = "13:00";

  lat: number = 0;
  lng: number = 0;
  imageUrl: string = '';

  id: string | undefined;
  constructor(private modalCtrl: ModalController,
              private  formBuilder: FormBuilder,
              private mosqueService: MosqueService,
              private navParams : NavParams
  ) {
  }

  ngOnInit() {
    const urlRegex: RegExp = /(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})(\.[a-zA-Z0-9]{2,})?/;
    // Récupérez les valeurs par défaut à partir des queryParams ou des paramètres de la route
    this.id = this.navParams.get('id');
    const nameDefaultValue = this.navParams.get('name');
    this.imageUrl = this.navParams.get('imageUrl');
    const imamNameDefaultValue = this.navParams.get('imamName');
    const numDonationDefaultValue = this.navParams.get('numDonation');
    const descDonationDefaultValue = this.navParams.get('descDonation');
    const locationDefaultValue = this.navParams.get('location');
    const quartierDefaultValue = this.navParams.get('quartier');
    this.lat = (this.navParams.get('lat') != undefined)? this.navParams.get('lat'):0;
    this.lng = (this.navParams.get('lng') != undefined)? this.navParams.get('lng'):0;
    this.fajr = (this.navParams.get('fajr') != undefined)? this.navParams.get('fajr'):"05:30";
    this.dohr = (this.navParams.get('dohr') != undefined)? this.navParams.get('dohr'):"13:30";
    this.asr = (this.navParams.get('asr') != undefined)? this.navParams.get('asr'):"16:00";
    this.maghreb = (this.navParams.get('maghreb') != undefined)? this.navParams.get('maghreb'):"19:00";
    this.isha = (this.navParams.get('isha') != undefined)? this.navParams.get('isha'):"20:00";
    this.djumha = (this.navParams.get('djumha') != undefined)? this.navParams.get('djumha'):"13:00";
    console.log(this.fajr)

    this.mosqueForm = this.formBuilder.group({
      name: [nameDefaultValue, [Validators.required]],
      location: [locationDefaultValue, [Validators.required, Validators.pattern(urlRegex)]],
      imamName: [imamNameDefaultValue, [Validators.required]],
      numDonation: [numDonationDefaultValue, ],
      descDonation: [descDonationDefaultValue],
      quartier: [quartierDefaultValue, [Validators.required]],
    });
  }

  formatDateTimeToTime(dateTimeString: string): string {
    // Vérifiez si la chaîne est déjà au format "HH:mm"
    if (/^\d{2}:\d{2}$/.test(dateTimeString)) {
      return dateTimeString; // Retourne la chaîne telle quelle
    }

    // Si la chaîne n'est pas au format "HH:mm", alors essayez de la convertir en Date
    const date = new Date(dateTimeString);

    // Assurez-vous que la date est valide avant de la formater
    if (!isNaN(date.getTime())) {
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
      return `${hours}:${minutes}`;
    } else {
      // Si la conversion en Date échoue, retournez la chaîne originale
      return dateTimeString;
    }
  }




  goToPage2() {
    this.showForm1Content = false;
    this.showForm2Content = true;
    // Accédez au champ de fichier via le formulaire
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;

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
    this.fajr = this.formatDateTimeToTime(event.detail.value);
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
      id: (this.id == undefined) ? null : this.id,
      name: this.mosqueForm.get('name')?.value,
      imageUrl: this.imageUrl,
      imamName: this.mosqueForm.get('imamName')?.value,
      numDonation: this.mosqueForm.get('numDonation')?.value,
      descDonation: this.mosqueForm.get('descDonation')?.value,
      location: this.mosqueForm.get('location')?.value,
      quartier: this.mosqueForm.get('quartier')?.value,
      lat: this.lat,
      lng: this.lng,
      fajr: this.fajr,
      dohr: this.dohr,
      asr: this.asr,
      maghreb: this.maghreb,
      isha: this.isha,
      djumha: this.djumha
    }

    if (mosque.id == null) {
      this.mosqueService.createMosque(mosque, this.file);
    }
    else {
      this.mosqueService.updateMosque(mosque, this.file);
    }
    this.closeModal();
  }


}
