import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PrechePageRoutingModule } from './preche-routing.module';

import { PrechePage } from './preche.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PrechePageRoutingModule
  ],
  declarations: [PrechePage]
})
export class PrechePageModule {}
