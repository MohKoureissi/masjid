import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditMosqueePage } from './edit-mosquee.page';

const routes: Routes = [
  {
    path: '',
    component: EditMosqueePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditMosqueePageRoutingModule {}
