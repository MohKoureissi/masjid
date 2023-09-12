import { LoginPageModule } from './masjid-admin/login/login.module';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'tab1',
    loadChildren: () => import('./tab1/tab1.module').then( m => m.Tab1PageModule)
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
  {
    path: 'coran-display',
    loadChildren: () => import('./coran-display/coran-display.module').then( m => m.CoranDisplayPageModule)
  },
  {
    path: 'list-coran',
    loadChildren: () => import('./list-coran/list-coran.module').then( m => m.ListCoranPageModule)
  },
  {
    path: 'p-player',
    loadChildren: () => import('./p-player/p-player.module').then( m => m.PPlayerPageModule)
  },
  {
    path: 'list-preche',
    loadChildren: () => import('./list-preche/list-preche.module').then( m => m.ListPrechePageModule)
  },
  {
    path: 'edit-mosquee',
    loadChildren: () => import('./edit-mosquee/edit-mosquee.module').then( m => m.EditMosqueePageModule)
  },
  {
    path: 'mosquee-details',
    loadChildren: () => import('./mosquee-details/mosquee-details.module').then( m => m.MosqueeDetailsPageModule)
  },
  {
    path: 'infos-horaires',
    loadChildren: () => import('./infos-horaires/infos-horaires.module').then( m => m.InfosHorairesPageModule)
  },
  {
    path: 'list-programmes',
    loadChildren: () => import('./list-programmes/list-programmes.module').then( m => m.ListProgrammesPageModule)
  },
  {
    path: 'dons',
    loadChildren: () => import('./dons/dons.module').then( m => m.DonsPageModule)
  },
  {
    path: 'annonces',
    loadChildren: () => import('./annonces/annonces.module').then( m => m.AnnoncesPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./dashbord-page/login/login.module').then( m => m.LoginPageModule)
  },

  {
    path: 'login-admin',
    loadChildren: () => import('./masjid-admin/login/login.module').then( m => m.LoginPageModule)
  },
 
  {
    path: 'panel',
    loadChildren: () => import('./masjid-admin/panel/panel.module').then( m => m.PanelPageModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./masjid-admin/dashboard/dashboard.module').then( m => m.DashboardPageModule)
  }
  ,
  {
    path: 'admin-page',
    loadChildren: () => import('./masjid-admin/admin-page/admin-page.module').then( m => m.AdminPagePageModule)
  },
  {
    path: 'admin-program',
    loadChildren: () => import('./masjid-admin/admin-program/admin-program.module').then( m => m.AdminProgramPageModule)
  },




];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
