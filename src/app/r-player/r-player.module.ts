import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RPlayerPageRoutingModule } from './r-player-routing.module';

import { RPlayerPage } from './r-player.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RPlayerPageRoutingModule
  ],
  declarations: [RPlayerPage]
})
export class RPlayerPageModule {}
