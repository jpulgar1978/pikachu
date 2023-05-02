import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GameonePageRoutingModule } from './gameone-routing.module';

import { GameonePage } from './gameone.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GameonePageRoutingModule
  ],
  declarations: [GameonePage]
})
export class GameonePageModule {}
