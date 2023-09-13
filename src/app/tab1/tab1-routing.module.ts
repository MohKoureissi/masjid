import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Tab1Page } from './tab1.page';
import { DateLocaleKeys, MOMENT_HIJRI_DATE_FORMATS, NgxAngularMaterialHijriAdapterModule, NgxAngularMaterialHijriAdapterService } from 'ngx-angular-material-hijri-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

const routes: Routes = [
  {
    path: '',
    component: Tab1Page,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes),
  NgxAngularMaterialHijriAdapterModule],
  providers: [
    {
      provide: DateAdapter,
      useClass: NgxAngularMaterialHijriAdapterService,
    },
    // Change the format by using `MOMENT_HIJRI_DATE_FORMATS` for Dates and `MOMENT_HIJRI_DATE_TIME_FORMATS` for date/time.
    { provide: MAT_DATE_FORMATS, useValue: MOMENT_HIJRI_DATE_FORMATS },
    // Change the localization to arabic by using `AR_SA` not `AR` only and `EN_US` not `EN` only.
    { provide: MAT_DATE_LOCALE, useValue: DateLocaleKeys.AR_SA },
  ],


  exports: [RouterModule]
})
export class Tab1PageRoutingModule {}
