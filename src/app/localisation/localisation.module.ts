import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Localisation } from './localisation.page';


import { LocalisationModuleRoutingModule } from './localisation-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    LocalisationModuleRoutingModule
  ],
  declarations: [Localisation]
})
export class LocalisationModule {}
