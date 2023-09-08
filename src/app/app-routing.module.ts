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
  {
    path: 'coran-display',
    loadChildren: () => import('./coran-display/coran-display.module').then( m => m.CoranDisplayPageModule)
  },
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
  },
  {
    path: 'changer',
    loadChildren: () => import('./changer/changer.module').then( m => m.ChangerPageModule)
  },
  {
    path: 'notification',
    loadChildren: () => import('./notification/notification.module').then( m => m.NotificationPageModule)
  }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

