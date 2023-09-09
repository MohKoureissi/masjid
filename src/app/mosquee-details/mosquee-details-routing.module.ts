import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MosqueeDetailsPage } from './mosquee-details.page';

const routes: Routes = [
  {
    path: '',
    component: MosqueeDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MosqueeDetailsPageRoutingModule {}
