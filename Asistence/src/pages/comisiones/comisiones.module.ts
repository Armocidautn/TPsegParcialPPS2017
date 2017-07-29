import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Comisiones } from './comisiones';

@NgModule({
  declarations: [
    Comisiones,
  ],
  imports: [
    IonicPageModule.forChild(Comisiones),
  ],
  exports: [
    Comisiones
  ]
})
export class ComisionesModule {}
