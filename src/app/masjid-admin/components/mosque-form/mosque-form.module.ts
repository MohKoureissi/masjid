import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MosqueFormPageRoutingModule } from './mosque-form-routing.module';

import { MosqueFormPage } from './mosque-form.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        MosqueFormPageRoutingModule,
        ReactiveFormsModule
    ],
  declarations: [MosqueFormPage]
})
export class MosqueFormPageModule {}
