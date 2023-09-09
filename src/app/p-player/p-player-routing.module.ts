import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PPlayerPage } from './p-player.page';

const routes: Routes = [
  {
    path: '',
    component: PPlayerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PPlayerPageRoutingModule {}
