import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProgramFormPageRoutingModule } from './program-form-routing.module';

import { ProgramFormPage } from './program-form.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ProgramFormPageRoutingModule,
        ReactiveFormsModule
    ],
  declarations: [ProgramFormPage]
})
export class ProgramFormPageModule {}
