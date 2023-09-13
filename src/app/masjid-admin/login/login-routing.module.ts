import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginPage } from './login.page';
import { NavbarComponent } from '../navbar/navbar.component';

const routes: Routes = [
  {
    path: '',
    component: LoginPage
  },
  {
    path: 'navbar',
    component: NavbarComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginPageRoutingModule {}
