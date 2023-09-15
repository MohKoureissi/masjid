import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ConnexionPageRoutingModule } from './connexion-routing.module';
import { ConnexionPage } from './connexion.page';
import { HttpClientModule } from '@angular/common/http'; // Assurez-vous que vous avez cette importation

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConnexionPageRoutingModule,
    HttpClientModule, // Ajoutez HttpClientModule ici
  ],
  declarations: [ConnexionPage]
})
export class ConnexionPageModule {}
