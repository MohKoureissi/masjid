import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChangerPageRoutingModule } from './changer-routing.module';

import { ChangerPage } from './changer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChangerPageRoutingModule
  ],
  declarations: [ChangerPage]
})
export class ChangerPageModule {}
