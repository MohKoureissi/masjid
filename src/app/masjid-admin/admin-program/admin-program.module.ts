import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminProgramPageRoutingModule } from './admin-program-routing.module';

import { AdminProgramPage } from './admin-program.page';
import { NavbarComponent } from '../navbar/navbar.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminProgramPageRoutingModule,
    NavbarComponent
  ],
  declarations: [AdminProgramPage]
})
export class AdminProgramPageModule {}
