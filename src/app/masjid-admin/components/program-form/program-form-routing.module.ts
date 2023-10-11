import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProgramFormPage } from './program-form.page';

const routes: Routes = [
  {
    path: '',
    component: ProgramFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProgramFormPageRoutingModule {}
