import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [


  {
    path: '',
    redirectTo: 'demarrage',
    pathMatch: 'full'
  },
  // {
  //   path: '',
  //   loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  // },
  {
    path: 'mosquee',
    loadChildren: () => import('./mosquee/mosquee.module').then(m => m.MosqueePageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'names',
    loadChildren: () => import('./names/names.module').then(m => m.NamesPageModule)
  },
  {
    path: 'radio',
    loadChildren: () => import('./radio/radio.module').then(m => m.RadioPageModule)
  },
  {
    path: 'calendar',
    loadChildren: () => import('./calendar/calendar.module').then(m => m.CalendarPageModule)
  },
  {
    path: 'preche',
    loadChildren: () => import('./preche/preche.module').then(m => m.PrechePageModule)
  },
  {
    path: 'coran',
    loadChildren: () => import('./coran/coran.module').then(m => m.CoranPageModule)
  },
  {
    path: 'player',
    loadChildren: () => import('./player/player.module').then(m => m.PlayerPageModule)
  },
  {
    path: 'coran-display',
    loadChildren: () => import('./coran-display/coran-display.module').then(m => m.CoranDisplayPageModule)
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
  {
    path: 'connexion',
    loadChildren: () => import('./connexion/connexion.module').then(m => m.ConnexionPageModule)
  },
  // {
  //   path: '',
  //   loadChildren: () => import('./inscriptionuser/inscriptionuser.module').then(m => m.InscriptionuserPageModule)
  // },
  {
    path: 'demarrage',
    loadChildren: () => import('./demarrage/demarrage.module').then(m => m.DemarragePageModule)
  },

  {
    path: 'inscrire',
    loadChildren: () => import('./inscrire/inscrire.module').then(m => m.InscrirePageModule)
  },

  {
    path: 'changer',
    loadChildren: () => import('./changer/changer.module').then(m => m.ChangerPageModule)
  },
  {
    path: 'new',
    loadChildren: () => import('./nouveau-mot-de-passe/nouveau-mot-de-passe.module').then(m => m.NouveauMotDePassePageModule)
  },
  {
    path: 'profil',
    loadChildren: () => import('./profiluser/profiladmin.module').then(m => m.ProfiladminPageModule)
  },
  {
    path: 'inscrire',
    loadChildren: () => import('./inscrire/inscrire.module').then( m => m.InscrirePageModule)
  },
  {
    path: 'oublier',
    loadChildren: () => import('./oublier/oublier.module').then( m => m.OublierPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
