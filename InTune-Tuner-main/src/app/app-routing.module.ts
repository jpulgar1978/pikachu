import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo:'menuprincipal',
    pathMatch: 'full'
  },
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'gameone',
    loadChildren: () => import('./pages/gameone/gameone.module').then( m => m.GameonePageModule)
  },
  {
    path: 'menuprincipal',
    loadChildren: () => import('./pages/menuprincipal/menuprincipal.module').then( m => m.MenuprincipalPageModule)
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
