import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'mosquee',
    loadChildren: () => import('./mosquee/mosquee.module').then( m => m.MosqueePageModule)
  },
  {
    path: 'names',
    loadChildren: () => import('./names/names.module').then( m => m.NamesPageModule)
  },
  {
    path: 'radio',
    loadChildren: () => import('./radio/radio.module').then( m => m.RadioPageModule)
  },
  {
    path: 'calendar',
    loadChildren: () => import('./calendar/calendar.module').then( m => m.CalendarPageModule)
  },
  {
    path: 'preche',
    loadChildren: () => import('./preche/preche.module').then( m => m.PrechePageModule)
  },
  {
    path: 'coran',
    loadChildren: () => import('./coran/coran.module').then( m => m.CoranPageModule)
  },
  {
    path: 'player',
    loadChildren: () => import('./player/player.module').then( m => m.PlayerPageModule)
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
