import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DemarragePageRoutingModule } from './demarrage-routing.module';

import { DemarragePage } from './demarrage.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DemarragePageRoutingModule
  ],
  declarations: [DemarragePage]
})
export class DemarragePageModule {}
