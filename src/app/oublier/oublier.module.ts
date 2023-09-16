import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OublierPageRoutingModule } from './oublier-routing.module';

import { OublierPage } from './oublier.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OublierPageRoutingModule
  ],
  declarations: [OublierPage]
})
export class OublierPageModule {}
