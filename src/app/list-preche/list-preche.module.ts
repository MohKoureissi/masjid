import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListPrechePageRoutingModule } from './list-preche-routing.module';

import { ListPrechePage } from './list-preche.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListPrechePageRoutingModule
  ],
  declarations: [ListPrechePage]
})
export class ListPrechePageModule {}
