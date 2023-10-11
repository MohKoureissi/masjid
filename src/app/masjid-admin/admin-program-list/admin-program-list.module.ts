import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminProgramListPageRoutingModule } from './admin-program-list-routing.module';

import { AdminProgramListPage } from './admin-program-list.page';
import { NavbarComponent } from '../navbar/navbar.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminProgramListPageRoutingModule,
    NavbarComponent
  ],
  declarations: [AdminProgramListPage]
})
export class AdminProgramListPageModule {}
