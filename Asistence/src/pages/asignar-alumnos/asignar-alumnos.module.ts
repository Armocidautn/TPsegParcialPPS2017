import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AsignarAlumnos } from './asignar-alumnos';

@NgModule({
  declarations: [
    AsignarAlumnos,
  ],
  imports: [
    IonicPageModule.forChild(AsignarAlumnos),
  ],
  exports: [
    AsignarAlumnos
  ]
})
export class AsignarAlumnosModule {}
