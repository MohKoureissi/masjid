import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NamesDescriptionPage } from './names-description.page';

const routes: Routes = [
  {
    path: '',
    component: NamesDescriptionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NamesDescriptionPageRoutingModule {}
