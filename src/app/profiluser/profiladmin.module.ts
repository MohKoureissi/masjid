import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfiladminPageRoutingModule } from './profiladmin-routing.module';

import { ProfiladminPage } from './profiladmin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfiladminPageRoutingModule
  ],
  declarations: [ProfiladminPage]
})
export class ProfiladminPageModule {}
