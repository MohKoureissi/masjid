import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'names-description',
    loadChildren: () => import('./names-description/names-description.module').then( m => m.NamesDescriptionPageModule)
  },
  {
    path: 'test',
    loadChildren: () => import('./test/test.module').then( m => m.TestPageModule)
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
  // {
  //   path: 'admin-program',
  //   loadChildren: () => import('./masjid-admin/admin-program/admin-program.module').then( m => m.AdminProgramPageModule)
  // },
  {
    path: 'list-mosquee',
    loadChildren: () => import('./masjid-admin/list-mosquee/list-mosquee.module').then( m => m.ListMosqueePageModule)
  },
  {
    path: 'admin-program-list',
    loadChildren: () => import('./masjid-admin/admin-program-list/admin-program-list.module').then( m => m.AdminProgramListPageModule)
  },

  {
    path: 'admin-annonce',
    loadChildren: () => import('./masjid-admin/admin-annonce/admin-annonce.module').then( m => m.AdminAnnoncePageModule)
  },
  {
    path: 'lyrcs-player',
    loadChildren: () => import('./lyrcs-player/lyrcs-player.module').then( m => m.LyrcsPlayerPageModule)
  },
  {
    path: 'mosque-form',
    loadChildren: () => import('./masjid-admin/components/mosque-form/mosque-form.module').then( m => m.MosqueFormPageModule)
  },
  {
    path: 'announcement-form',
    loadChildren: () => import('./masjid-admin/components/announcement-form/announcement-form.module').then( m => m.AnnouncementFormPageModule)
  },
  {
    path: 'program-form',
    loadChildren: () => import('./masjid-admin/components/program-form/program-form.module').then( m => m.ProgramFormPageModule)
  },
  {
    path: 'admin-form',
    loadChildren: () => import('./masjid-admin/components/admin-form/admin-form.module').then( m => m.AdminFormPageModule)
  },
  {
    path: 'not-found',
    loadChildren: () => import('./utils/not-found/not-found.module').then( m => m.NotFoundPageModule)
  },


];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
