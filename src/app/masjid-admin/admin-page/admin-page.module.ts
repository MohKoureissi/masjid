import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminPagePageRoutingModule } from './admin-page-routing.module';

import { AdminPagePage } from './admin-page.page';

import { NavbarComponent } from '../navbar/navbar.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminPagePageRoutingModule,
    NavbarComponent
  ],
  declarations: [AdminPagePage]
})
export class AdminPagePageModule {}
