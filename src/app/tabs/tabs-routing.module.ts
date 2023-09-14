import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'mosquee',
        loadChildren: () => import('../mosquee/mosquee.module').then(m => m.MosqueePageModule)
      },
      {
        path: 'calendar',
        loadChildren: () => import('../calendar/calendar.module').then(m => m.CalendarPageModule)
      },
      {
        path: 'preche',
        loadChildren: () => import('../preche/preche.module').then(m => m.PrechePageModule)
      },
      {
        path: 'radio',
        loadChildren: () => import('../radio/radio.module').then(m => m.RadioPageModule)
      },
      {
        path: 'annonces',
        loadChildren: () => import('../annonces/annonces.module').then(m => m.AnnoncesPageModule)
      },
      {
        path: 'coran',
        loadChildren: () => import('../coran/coran.module').then(m => m.CoranPageModule)
      },
      {
        path: 'names',
        loadChildren: () => import('../names/names.module').then(m => m.NamesPageModule)
      },
      {
        path: 'demarrage',
        loadChildren: () => import('../demarrage/demarrage.module').then(m => m.DemarragePageModule)
      },
      {
        path: 'profil',
        loadChildren: () => import('../profiluser/profiladmin.module').then(m => m.ProfiladminPageModule)
      },
      {
        path: 'motdepasse',
        loadChildren: () => import('../motdepasse/motdepasse.module').then(m => m.MotdepassePageModule)
      },
      {
        path: 'new',
        loadChildren: () => import('../nouveau-mot-de-passe/nouveau-mot-de-passe.module').then(m => m.NouveauMotDePassePageModule)
      },
      {
        path: 'inscription',
        loadChildren: () => import('../inscriptionuser/inscriptionuser.module').then(m => m.InscriptionuserPageModule)
      },
      {
        path: 'changer',
        loadChildren: () => import('../changer/changer.module').then(m => m.ChangerPageModule)
      },
    
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
