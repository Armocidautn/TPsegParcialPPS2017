import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AbmCursos } from './abm-cursos';

@NgModule({
  declarations: [
    AbmCursos,
  ],
  imports: [
    IonicPageModule.forChild(AbmCursos),
  ],
  exports: [
    AbmCursos
  ]
})
export class AbmCursosModule {}
