import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QuiblaPageRoutingModule } from './quibla-routing.module';

import { QuiblaPage } from './quibla.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QuiblaPageRoutingModule
  ],
  declarations: [QuiblaPage]
})
export class QuiblaPageModule {}
