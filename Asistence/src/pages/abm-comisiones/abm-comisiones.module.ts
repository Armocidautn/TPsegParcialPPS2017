import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AbmComisiones } from './abm-comisiones';

@NgModule({
  declarations: [
    AbmComisiones,
  ],
  imports: [
    IonicPageModule.forChild(AbmComisiones),
  ],
  exports: [
    AbmComisiones
  ]
})
export class AbmComisionesModule {}
