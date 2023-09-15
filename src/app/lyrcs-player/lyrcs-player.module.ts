import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LyrcsPlayerPageRoutingModule } from './lyrcs-player-routing.module';

import { LyrcsPlayerPage } from './lyrcs-player.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LyrcsPlayerPageRoutingModule
  ],
  declarations: [LyrcsPlayerPage]
})
export class LyrcsPlayerPageModule {}
