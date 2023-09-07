import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'demarrage',
    loadChildren: () => import('./demarrage/demarrage.module').then( m => m.DemarragePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'inscriptionuser',
    loadChildren: () => import('./inscriptionuser/inscriptionuser.module').then( m => m.InscriptionuserPageModule)
  },
  {
    path: 'motdepasse',
    loadChildren: () => import('./motdepasse/motdepasse.module').then( m => m.MotdepassePageModule)
  },
  {
    path: 'profiladmin',
    loadChildren: () => import('./profiluser/profiladmin.module').then( m => m.ProfiladminPageModule)
  },
  {
    path: 'nouveau-mot-de-passe',
    loadChildren: () => import('./nouveau-mot-de-passe/nouveau-mot-de-passe.module').then( m => m.NouveauMotDePassePageModule)
  }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
