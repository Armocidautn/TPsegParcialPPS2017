import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AmbUsuariosCursos } from './amb-usuarios-cursos';

@NgModule({
  declarations: [
    AmbUsuariosCursos,
  ],
  imports: [
    IonicPageModule.forChild(AmbUsuariosCursos),
  ],
  exports: [
    AmbUsuariosCursos
  ]
})
export class AmbUsuariosCursosModule {}
