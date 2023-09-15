import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListPrechePage } from './list-preche.page';
import {PPlayerPage} from "../p-player/p-player.page";

const routes: Routes = [
  {
    path: 'p-player',
    component: PPlayerPage
  },
  {
    path: ':id',
    component: ListPrechePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListPrechePageRoutingModule {}
