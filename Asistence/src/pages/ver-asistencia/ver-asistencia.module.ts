import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VerAsistencia } from './ver-asistencia';

@NgModule({
  declarations: [
    VerAsistencia,
  ],
  imports: [
    IonicPageModule.forChild(VerAsistencia),
  ],
  exports: [
    VerAsistencia
  ]
})
export class VerAsistenciaModule {}
