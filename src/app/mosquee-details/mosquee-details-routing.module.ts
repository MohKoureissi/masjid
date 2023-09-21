import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MosqueeDetailsPage } from './mosquee-details.page';
import {ListProgrammesPage} from "../list-programmes/list-programmes.page";
import {DonsPage} from "../dons/dons.page";

const routes: Routes = [
  {
    path: 'list-programmes',
    component:ListProgrammesPage
  },
  {
    path: 'dons',
    component: DonsPage
  },
  {
    path: 'mosquee-details',
    component: MosqueeDetailsPage
  },
  {
    path: ':id',
    component: MosqueeDetailsPage
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MosqueeDetailsPageRoutingModule {}
