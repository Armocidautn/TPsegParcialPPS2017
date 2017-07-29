import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AlumnoEncuesta } from './alumno-encuesta';

@NgModule({
  declarations: [
    AlumnoEncuesta,
  ],
  imports: [
    IonicPageModule.forChild(AlumnoEncuesta),
  ],
  exports: [
    AlumnoEncuesta
  ]
})
export class AlumnoEncuestaModule {}
