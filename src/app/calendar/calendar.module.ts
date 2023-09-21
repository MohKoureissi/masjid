import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { IonicModule } from '@ionic/angular';
import { MatCommonModule } from '@angular/material/core';
import { CalendarPageRoutingModule } from './calendar-routing.module';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

import { NgxAngularMaterialHijriAdapterService, DateLocaleKeys, MOMENT_HIJRI_DATE_FORMATS } from 'ngx-angular-material-hijri-adapter';
import { NgxAngularMaterialHijriAdapterModule } from 'ngx-angular-material-hijri-adapter';
import { CalendarPage } from './calendar.page';
import {MatCardModule} from  '@angular/material/card' ;
@NgModule({
  imports: [
    MatCommonModule,
    CommonModule,
    MatDatepickerModule,
    FormsModule,
    IonicModule,
    CalendarPageRoutingModule,
    NgxAngularMaterialHijriAdapterModule,
    MatCardModule
  ],

  providers: [
    {
      provide: DateAdapter,
      useClass: NgxAngularMaterialHijriAdapterService,
    },
// Modification du format en utilisant `MOMENT_HIJRI_DATE_FORMATS` pour les dates et `MOMENT_HIJRI_DATE_TIME_FORMATS` pour la date/heure.
    { provide: MAT_DATE_FORMATS, useValue: MOMENT_HIJRI_DATE_FORMATS },
    // Change the localization to arabic by using `AR_SA` not `AR` only and `EN_US` not `EN` only.
    { provide: MAT_DATE_LOCALE, useValue: "fr-FR" },
],

  declarations: [CalendarPage]
})
export class CalendarPageModule {}
