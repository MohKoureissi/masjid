import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'infos-horaires/:id',
    loadChildren: () => import('./infos-horaires/infos-horaires.module').then(m => m.InfosHorairesPageModule)
  },
  {
    path: 'list-programmes',
    loadChildren: () => import('./list-programmes/list-programmes.module').then(m => m.ListProgrammesPageModule)
  },
  {
    path: 'mosquee-details',
    loadChildren: () => import('./mosquee-details/mosquee-details.module').then(m => m.MosqueeDetailsPageModule)
  },
  {
    path: 'dons',
    loadChildren: () => import('./dons/dons.module').then(m => m.DonsPageModule)
  },
 
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}