import { NgModule } from '@angular/core';


import { NgxAngularMaterialHijriAdapterModule } from 'ngx-angular-material-hijri-adapter';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {environment} from "../environments/environment";
import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from '@angular/forms';

import 'firebase/compat/auth';
import 'firebase/compat/firestore';
// Importation de registerLocaleData et les données de localisation pour "fr-FR".
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';

// Enregistrez les données de localisation pour "fr-FR".
registerLocaleData(localeFr);
@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, NgxAngularMaterialHijriAdapterModule, IonicModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule, FormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
  ],
  providers: [{provide: RouteReuseStrategy, useClass: IonicRouteStrategy}],
  bootstrap: [AppComponent],
  exports: [
  ]
})
export class AppModule {}
