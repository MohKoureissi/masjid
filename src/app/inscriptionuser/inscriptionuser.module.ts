import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InscriptionuserPageRoutingModule } from './inscriptionuser-routing.module';

import { InscriptionuserPage } from './inscriptionuser.page';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InscriptionuserPageModule,
    ReactiveFormsModule,
    
  ],
  declarations: [InscriptionuserPage]
})
export class InscriptionuserPageModule {}
