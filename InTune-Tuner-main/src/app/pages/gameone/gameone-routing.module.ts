import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GameonePage } from './gameone.page';

const routes: Routes = [
  {
    path: '',
    component: GameonePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GameonePageRoutingModule {}
