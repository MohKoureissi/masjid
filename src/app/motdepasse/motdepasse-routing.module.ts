import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MotdepassePage } from './motdepasse.page';

const routes: Routes = [
  {
    path: '',
    component: MotdepassePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MotdepassePageRoutingModule {}
