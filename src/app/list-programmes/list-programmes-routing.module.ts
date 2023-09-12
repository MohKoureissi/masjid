import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListProgrammesPage } from './list-programmes.page';

const routes: Routes = [
  {
    path: '',
    component: ListProgrammesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListProgrammesPageRoutingModule {}
