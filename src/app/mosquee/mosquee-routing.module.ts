import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MosqueePage } from './mosquee.page';
import {MosqueeDetailsPage} from "../mosquee-details/mosquee-details.page";

const routes: Routes = [
  {
    path: '',
    component: MosqueePage
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MosqueePageRoutingModule {}
