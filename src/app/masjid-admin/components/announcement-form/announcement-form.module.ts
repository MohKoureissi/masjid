import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AnnouncementFormPageRoutingModule } from './announcement-form-routing.module';

import { AnnouncementFormPage } from './announcement-form.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        AnnouncementFormPageRoutingModule,
        ReactiveFormsModule
    ],
  declarations: [AnnouncementFormPage]
})
export class AnnouncementFormPageModule {}
