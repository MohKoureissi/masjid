import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminAnnoncePageRoutingModule } from './admin-annonce-routing.module';

import { AdminAnnoncePage } from './admin-annonce.page';
import { NavbarComponent } from '../navbar/navbar.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminAnnoncePageRoutingModule,
    NavbarComponent
  ],
  declarations: [AdminAnnoncePage]
})
export class AdminAnnoncePageModule {}
