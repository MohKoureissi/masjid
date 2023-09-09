import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InfosHorairesPage } from './infos-horaires.page';

const routes: Routes = [
  {
    path: '',
    component: InfosHorairesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InfosHorairesPageRoutingModule {}
