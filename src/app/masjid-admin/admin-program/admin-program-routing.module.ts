import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminProgramPage } from './admin-program.page';

const routes: Routes = [
  {
    path: '',
    component: AdminProgramPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminProgramPageRoutingModule {}
