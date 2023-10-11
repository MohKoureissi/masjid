import { Component, OnInit } from '@angular/core';
import {ModalController, NavParams} from "@ionic/angular";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Programme} from "../../../model/programme.model";
import {ProgramService} from "../../../../data/programme/programme.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-program-form',
  templateUrl: './program-form.page.html',
  styleUrls: ['./program-form.page.scss'],
})
export class ProgramFormPage implements OnInit {
  programForm!: FormGroup;
  programId: string | undefined;
  mosqueId: string | undefined;

  constructor(private modalCtrl: ModalController,
              private  formBuilder: FormBuilder,
              private programmeService: ProgramService,
              private navParams : NavParams,
              private router: Router
  ) {
  }

  ngOnInit() {
    // Récupérez les valeurs par défaut à partir des queryParams ou des paramètres de la route
    this.programId = this.navParams.get('id');
    const titleDefaultValue = this.navParams.get('title');
    const organizerDefaultValue = this.navParams.get('organizer');
    const daysTimesDefaultValue = this.navParams.get('daysTimes');
    const descriptionDefaultValue = this.navParams.get('description');
    this.mosqueId = this.navParams.get('mosqueId');

    this.programForm = this.formBuilder.group({
      title: [titleDefaultValue, [Validators.required]],
      organizer: [organizerDefaultValue, [Validators.required]],
      daysTimes: [daysTimesDefaultValue, [Validators.required]],
      description: [descriptionDefaultValue]
    });
  }

  async closeModal() {
    await this.modalCtrl.dismiss();
  }

  addNewProgram() {
    if(this.mosqueId != undefined){
      const programme: Programme = {
        id: (this.programId == undefined) ? null : this.programId,
        title: this.programForm.get('title')?.value,
        organizer: this.programForm.get('organizer')?.value,
        daysTimes: this.programForm.get('daysTimes')?.value,
        description: this.programForm.get('description')?.value,
        mosqueId: this.mosqueId
      }

      if (programme.id == null) {
        this.programmeService.createProgram(programme);
      }
      else {
        this.programmeService.updateProgram(programme);
      }
      this.closeModal();
    }
    else {
      this.router.navigateByUrl('not-found');
    }
  }
}
