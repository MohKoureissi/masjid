import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GestionMosqueePageRoutingModule } from './gestion-mosquee-routing.module';

import { GestionMosqueePage } from './gestion-mosquee.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GestionMosqueePageRoutingModule
  ],
  declarations: [GestionMosqueePage]
})
export class GestionMosqueePageModule {}
