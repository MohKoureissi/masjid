import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MosqueeDetailsPageRoutingModule } from './mosquee-details-routing.module';

import { MosqueeDetailsPage } from './mosquee-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MosqueeDetailsPageRoutingModule
  ],
  declarations: [MosqueeDetailsPage]
})
export class MosqueeDetailsPageModule {}
