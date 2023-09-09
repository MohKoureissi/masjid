import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MosqueePageRoutingModule } from './mosquee-routing.module';

import { MosqueePage } from './mosquee.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MosqueePageRoutingModule
  ],
  declarations: [MosqueePage]
})
export class MosqueePageModule {}
