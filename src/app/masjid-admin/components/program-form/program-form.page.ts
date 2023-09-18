import { Component, OnInit } from '@angular/core';
import {ModalController} from "@ionic/angular";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AnnouncementService} from "../../../../data/announcement/announcement.service";
import {Announcement} from "../../../model/announcement.model";
import {Programme} from "../../../model/programme.model";
import {ProgramService} from "../../../../data/programme/programme.service";

@Component({
  selector: 'app-program-form',
  templateUrl: './program-form.page.html',
  styleUrls: ['./program-form.page.scss'],
})
export class ProgramFormPage implements OnInit {
  programForm!: FormGroup;

  constructor(private modalCtrl: ModalController,
              private  formBuilder: FormBuilder,
              private programmeService: ProgramService
  ) {
  }

  ngOnInit() {
    this.programForm = this.formBuilder.group({
      title: [null, [Validators.required]],
      organizer: [null, [Validators.required]],
      daysTimes: [null, [Validators.required]],
      description: [null]
    });
  }

  async closeModal() {
    await this.modalCtrl.dismiss();
  }

  addNewProgram() {
    const programme: Programme = {
      id: null,
      title: this.programForm.get('title')?.value,
      organizer: this.programForm.get('organizer')?.value,
      daysTimes: this.programForm.get('daysTimes')?.value,
      description: this.programForm.get('description')?.value,
      mosque: undefined
    }

    this.programmeService.createProgram(programme);
  }
}
