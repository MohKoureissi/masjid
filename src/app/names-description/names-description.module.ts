import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NamesDescriptionPageRoutingModule } from './names-description-routing.module';

import { NamesDescriptionPage } from './names-description.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NamesDescriptionPageRoutingModule
  ],
  declarations: [NamesDescriptionPage]
})
export class NamesDescriptionPageModule {}
