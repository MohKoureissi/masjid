import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListCoranPage } from './list-coran.page';
import {PlayerPage} from "../player/player.page";

const routes: Routes = [
  {
    path: 'player',
    component: PlayerPage
  },
  {
    path: ':id',
    component: ListCoranPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListCoranPageRoutingModule {}
