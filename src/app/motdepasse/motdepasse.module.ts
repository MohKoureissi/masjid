import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MotdepassePageRoutingModule } from './motdepasse-routing.module';

import { MotdepassePage } from './motdepasse.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MotdepassePageRoutingModule
  ],
  declarations: [MotdepassePage]
})
export class MotdepassePageModule {}
