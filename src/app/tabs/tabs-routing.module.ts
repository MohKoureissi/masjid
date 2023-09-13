import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
//import { ProfiladminPage } from '../profiluser/profiladmin.page';
import { ProfiladminPageModule } from '../profiluser/profiladmin.module';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full'
  },
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        children:[
          {
            path:'',
            loadChildren: () => import('../home/home.module').then(m => m.HomePageModule)
          },
          {
            path: 'mosquee',
            children:[
              {
                path:'',
                 loadChildren: () => import('../mosquee/mosquee.module').then( m => m.MosqueePageModule)
              },
              {
                path: 'mosquee-details',
                children:[
                  {
                    path:'',
                    loadChildren: () => import('../mosquee-details/mosquee-details.module').then( m => m.MosqueeDetailsPageModule)
                  },
                  {
                    path: 'infos-horaires',
                    loadChildren: () => import('../infos-horaires/infos-horaires.module').then( m => m.InfosHorairesPageModule)
                  },
                  {
                    path: 'list-programmes',
                    loadChildren: () => import('../list-programmes/list-programmes.module').then( m => m.ListProgrammesPageModule)
                  },
                  {
                    path: 'dons',
                    loadChildren: () => import('../dons/dons.module').then( m => m.DonsPageModule)
                  },
                  {
                    path: 'annonces',
                    loadChildren: () => import('../annonces/annonces.module').then( m => m.AnnoncesPageModule)
                  },
                ]
               
              },
              {
                path: 'edit-mosquee',
                loadChildren: () => import('../edit-mosquee/edit-mosquee.module').then( m => m.EditMosqueePageModule)
              }
            ]
          },
          {
            path: 'calendar',
            loadChildren: () => import('../calendar/calendar.module').then( m => m.CalendarPageModule)
          },
          {
            path: 'preche',
            children:[
              {
                path:'',
                 loadChildren: () => import('../preche/preche.module').then( m => m.PrechePageModule)
              },
              {
                path: 'list-preche',
                children:[
                  {
                    path:'',
                    loadChildren: () => import('../list-preche/list-preche.module').then( m => m.ListPrechePageModule)
                  },
                  {
                    path: 'p-player',
                    loadChildren: () => import('../p-player/p-player.module').then( m => m.PPlayerPageModule)
                  }
                ]
              }
            ]
           
          },{
            path: 'radio',
            loadChildren: () => import('../radio/radio.module').then( m => m.RadioPageModule)
          },
          {
            path: 'annonces',
            loadChildren: () => import('../annonces/annonces.module').then( m => m.AnnoncesPageModule)
          },
          {
            path: 'coran',
            children:[
              {
                path:'',
                loadChildren: () => import('../coran/coran.module').then( m => m.CoranPageModule)
              },
              {
                path: 'list-coran',
                children:[
                  {
                    path:'',
                    loadChildren: () => import('../list-coran/list-coran.module').then( m => m.ListCoranPageModule)
                  },
                  {
                    path: 'player',
                    children:[
                      {
                        path:'',
                        loadChildren: () => import('../player/player.module').then( m => m.PlayerPageModule)
                      },
                      
                      {
                        path: 'coran-display',
                        loadChildren: () => import('../coran-display/coran-display.module').then( m => m.CoranDisplayPageModule)
                      }
                    ]
                    
                  }
                ]
                
              }
            ]
          },
          {
            path: 'names',
            loadChildren: () => import('../names/names.module').then( m => m.NamesPageModule)
          }
        ]
      },
      
      {
        path: 'names',
        loadChildren: () => import('../names/names.module').then( m => m.NamesPageModule)
      },
      {
        path:"profile",
        loadChildren: () => import('../profiluser/profiladmin.module').then(m => ProfiladminPageModule)
      },
      {
        path: 'coran',
        loadChildren: () => import('../coran/coran.module').then( m => m.CoranPageModule)
      },
      {
        path: 'player',
        loadChildren: () => import('../player/player.module').then( m => m.PlayerPageModule)
      },
      {
        path: 'coran-display',
        loadChildren: () => import('../coran-display/coran-display.module').then( m => m.CoranDisplayPageModule)
      },
      {
        path: 'infos-horaires',
        loadChildren: () => import('../infos-horaires/infos-horaires.module').then( m => m.InfosHorairesPageModule)
      },
      {
        path: 'list-programmes',
        loadChildren: () => import('../list-programmes/list-programmes.module').then( m => m.ListProgrammesPageModule)
      },
      {
        path: 'dons',
        loadChildren: () => import('../dons/dons.module').then( m => m.DonsPageModule)
      },
      {
        path: 'calendar',
        loadChildren: () => import('../calendar/calendar.module').then(m => m.CalendarPageModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('../calendar/calendar.module').then(m => m.CalendarPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
