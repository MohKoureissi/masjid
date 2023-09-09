import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CoranDisplayPageRoutingModule } from './coran-display-routing.module';

import { CoranDisplayPage } from './coran-display.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CoranDisplayPageRoutingModule
  ],
  declarations: [CoranDisplayPage]
})
export class CoranDisplayPageModule {}
