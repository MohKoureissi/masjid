import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListMosqueePageRoutingModule } from './list-mosquee-routing.module';

import { ListMosqueePage } from './list-mosquee.page';
import { NavbarComponent } from '../navbar/navbar.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ListMosqueePageRoutingModule,
        NavbarComponent,
        ReactiveFormsModule
    ],
  declarations: [ListMosqueePage]
})
export class ListMosqueePageModule {}
