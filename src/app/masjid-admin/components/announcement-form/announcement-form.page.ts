import {Component, OnInit} from '@angular/core';
import {ModalController, NavParams} from "@ionic/angular";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AnnouncementService} from "../../../../data/announcement/announcement.service";
import {Announcement} from "../../../model/announcement.model";

@Component({
  selector: 'app-announcement-form',
  templateUrl: './announcement-form.page.html',
  styleUrls: ['./announcement-form.page.scss'],
})
export class AnnouncementFormPage implements OnInit {
  announcementForm!: FormGroup;
  imageUrl: string = '';
  date: string = this.formaterDate(new Date().toDateString());
  id: string | undefined;

  file: File|null = null;

  constructor(private modalCtrl: ModalController,
              private  formBuilder: FormBuilder,
              private announcementService: AnnouncementService,
              private navParams : NavParams
  ) {
  }

  ngOnInit() {
    const urlRegex: RegExp = /(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})(\.[a-zA-Z0-9]{2,})?/;

    // Récupérez les valeurs par défaut à partir des queryParams ou des paramètres de la route
    this.id = this.navParams.get('id');
    const titleDefaultValue = this.navParams.get('title');
    const locationDefaultValue = this.navParams.get('location');
    const placeDefaultValue = this.navParams.get('place');
    const descriptionDefaultValue = this.navParams.get('description');
    const dateTimeDefaultValue = this.navParams.get('dateTime');
    const organizerDefaultValue = this.navParams.get('organizer');
    this.imageUrl = this.navParams.get('imageUrl');


    this.announcementForm = this.formBuilder.group({
      title: [titleDefaultValue, [Validators.required]],
      location: [locationDefaultValue, [Validators.required, Validators.pattern(urlRegex)]],
      place: [placeDefaultValue, [Validators.required]],
      description: [descriptionDefaultValue],
      date: [dateTimeDefaultValue, [Validators.required]],
      organizer: [organizerDefaultValue, [Validators.required]],
    });
  }


  formaterDate(chaineDate: string): string {
    // Vérifier si la chaîne est déjà au format souhaité
    if (/^\w+\s\d{2}\/\d{2}\/\d{4}\sà\s\d{2}:\d{2}$/.test(chaineDate)) {
      return chaineDate;
    }

    const joursSemaine: string[] = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];

    const date: Date = new Date(chaineDate);
    const jour: string = joursSemaine[date.getDay()];
    const jourMois: string = date.getDate().toString().padStart(2, '0');
    const mois: string = (date.getMonth() + 1).toString().padStart(2, '0');
    const annee: number = date.getFullYear();
    const heures: string = date.getHours().toString().padStart(2, '0');
    const minutes: string = date.getMinutes().toString().padStart(2, '0');

    return `${jour} ${jourMois}/${mois}/${annee} à ${heures}:${minutes}`;
  }

  async closeModal() {
    await this.modalCtrl.dismiss();
  }


  addNewAnnouncement() {
    const announcement: Announcement = {
      id: (this.id == undefined) ? null : this.id,
      title: this.announcementForm.get('title')?.value,
      imageUrl: this.imageUrl,
      place: this.announcementForm.get('place')?.value,
      description: this.announcementForm.get('description')?.value,
      location: this.announcementForm.get('location')?.value,
      date: this.date,
      organizer: this.announcementForm.get('organizer')?.value,
    }


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

    if (announcement.id == null) {
      this.announcementService.createAnnouncement(announcement, this.file);
    }
    else {
      this.announcementService.updateAnnouncement(announcement, this.file);
    }
    this.closeModal();
  }

  updateDate(event: any) {
    // Lorsque la valeur de l'élément ion-datetime change, elle est capturée ici
    this.date = this.formaterDate(event.detail.value);
    console.log("vouveau: "+this.date);
  }
}
