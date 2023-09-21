import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MosqueFormPage } from './mosque-form.page';

const routes: Routes = [
  {
    path: '',
    component: MosqueFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MosqueFormPageRoutingModule {}
