import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Asistencia } from './asistencia';

@NgModule({
  declarations: [
    Asistencia,
  ],
  imports: [
    IonicPageModule.forChild(Asistencia),
  ],
  exports: [
    Asistencia
  ]
})
export class AsistenciaModule {}
