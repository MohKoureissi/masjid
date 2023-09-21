import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Localisation } from './localisation.page';

const routes: Routes = [
  {
    path: '',
    component: Localisation,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LocalisationModuleRoutingModule {}
