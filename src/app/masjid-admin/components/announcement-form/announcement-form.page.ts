import { Component, OnInit } from '@angular/core';
import {ModalController} from "@ionic/angular";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MosqueService} from "../../../../data/mosque/mosque.service";
import {AnnouncementService} from "../../../../data/announcement/announcement.service";
import {Mosque} from "../../../model/mosque.model";
import {Announcement} from "../../../model/announcement.model";

@Component({
  selector: 'app-announcement-form',
  templateUrl: './announcement-form.page.html',
  styleUrls: ['./announcement-form.page.scss'],
})
export class AnnouncementFormPage implements OnInit {
  announcementForm!: FormGroup;

  constructor(private modalCtrl: ModalController,
              private  formBuilder: FormBuilder,
              private announcementService: AnnouncementService
  ) {
  }

  ngOnInit() {
    const urlRegex: RegExp = /(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})(\.[a-zA-Z0-9]{2,})?/;

    this.announcementForm = this.formBuilder.group({
      title: [null, [Validators.required]],
      location: [null, [Validators.required, Validators.pattern(urlRegex)]],
      place: [null, [Validators.required]],
      description: [null],
      dateTime: [null, [Validators.required]],
      organizer: [null, [Validators.required]],
    });
  }


  async closeModal() {
    await this.modalCtrl.dismiss();
  }


  addNewMosque() {
    const announcement: Announcement = {
      id: null,
      title: this.announcementForm.get('title')?.value,
      imageUrl: null,
      place: this.announcementForm.get('place')?.value,
      description: this.announcementForm.get('description')?.value,
      location: this.announcementForm.get('location')?.value,
      date: this.announcementForm.get('date')?.value,
      hour: this.announcementForm.get('hour')?.value,
      organizer: this.announcementForm.get('organizer')?.value,
    }


    const fileInput = document.getElementById('fileInput') as HTMLInputElement;

    // Vérifiez si un fichier a été sélectionné
    if (fileInput.files && fileInput.files.length > 0) {
      // Récupérez le premier fichier sélectionné
      const file = fileInput.files[0];

      // Maintenant, vous pouvez utiliser 'file' en toute sécurité
      console.log('Nom du fichier :', file.name);
      console.log('Taille du fichier :', file.size, 'octets');

      this.announcementService.createAnnouncement(announcement, file);

      console.log(announcement);
    } else {
      // Aucun fichier sélectionné
      console.log('Aucune image sélectionné.');
    }
  }

}
