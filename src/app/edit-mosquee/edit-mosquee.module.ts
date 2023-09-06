import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditMosqueePageRoutingModule } from './edit-mosquee-routing.module';

import { EditMosqueePage } from './edit-mosquee.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditMosqueePageRoutingModule
  ],
  declarations: [EditMosqueePage]
})
export class EditMosqueePageModule {}
