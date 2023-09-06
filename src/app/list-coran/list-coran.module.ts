import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListCoranPageRoutingModule } from './list-coran-routing.module';

import { ListCoranPage } from './list-coran.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListCoranPageRoutingModule
  ],
  declarations: [ListCoranPage]
})
export class ListCoranPageModule {}
