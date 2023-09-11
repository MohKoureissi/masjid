import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PPlayerPageRoutingModule } from './p-player-routing.module';

import { PPlayerPage } from './p-player.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PPlayerPageRoutingModule
  ],
  declarations: [PPlayerPage]
})
export class PPlayerPageModule {}
