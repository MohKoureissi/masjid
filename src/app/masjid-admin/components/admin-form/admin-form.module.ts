import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminFormPageRoutingModule } from './admin-form-routing.module';

import { AdminFormPage } from './admin-form.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        AdminFormPageRoutingModule,
        ReactiveFormsModule
    ],
  declarations: [AdminFormPage]
})
export class AdminFormPageModule {}
