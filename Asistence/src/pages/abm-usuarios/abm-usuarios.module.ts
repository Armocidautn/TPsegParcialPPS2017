import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AbmUsuarios } from './abm-usuarios';

@NgModule({
  declarations: [
    AbmUsuarios,
  ],
  imports: [
    IonicPageModule.forChild(AbmUsuarios),
  ],
  exports: [
    AbmUsuarios
  ]
})
export class AbmUsuariosModule {}
