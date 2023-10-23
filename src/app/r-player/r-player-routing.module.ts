import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RPlayerPage } from './r-player.page';

const routes: Routes = [
  {
    path: '',
    component: RPlayerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RPlayerPageRoutingModule {}
