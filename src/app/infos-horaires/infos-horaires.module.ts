import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InfosHorairesPageRoutingModule } from './infos-horaires-routing.module';

import { InfosHorairesPage } from './infos-horaires.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InfosHorairesPageRoutingModule
  ],
  declarations: [InfosHorairesPage]
})
export class InfosHorairesPageModule {}
