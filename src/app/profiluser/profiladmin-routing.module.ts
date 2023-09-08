import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfiladminPage } from './profiladmin.page';

const routes: Routes = [
  {
    path: '',
    component: ProfiladminPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfiladminPageRoutingModule {}
