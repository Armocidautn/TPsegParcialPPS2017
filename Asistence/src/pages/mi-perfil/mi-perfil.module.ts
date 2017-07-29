import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MiPerfil } from './mi-perfil';

@NgModule({
  declarations: [
    MiPerfil,
  ],
  imports: [
    IonicPageModule.forChild(MiPerfil),
  ],
  exports: [
    MiPerfil
  ]
})
export class MiPerfilModule {}
