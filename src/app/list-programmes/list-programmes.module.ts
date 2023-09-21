import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListProgrammesPageRoutingModule } from './list-programmes-routing.module';

import { ListProgrammesPage } from './list-programmes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListProgrammesPageRoutingModule
  ],
  declarations: [ListProgrammesPage]
})
export class ListProgrammesPageModule {}
