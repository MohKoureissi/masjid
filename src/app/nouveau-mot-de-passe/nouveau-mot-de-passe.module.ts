import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NouveauMotDePassePageRoutingModule } from './nouveau-mot-de-passe-routing.module';

import { NouveauMotDePassePage } from './nouveau-mot-de-passe.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NouveauMotDePassePageRoutingModule
  ],
  declarations: [NouveauMotDePassePage]
})
export class NouveauMotDePassePageModule {}
