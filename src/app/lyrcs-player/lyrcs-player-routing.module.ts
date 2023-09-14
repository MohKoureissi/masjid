import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LyrcsPlayerPage } from './lyrcs-player.page';

const routes: Routes = [
  {
    path: '',
    component: LyrcsPlayerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LyrcsPlayerPageRoutingModule {}
