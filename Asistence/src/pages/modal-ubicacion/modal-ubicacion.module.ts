import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalUbicacion } from './modal-ubicacion';

@NgModule({
  declarations: [
    ModalUbicacion,
  ],
  imports: [
    IonicPageModule.forChild(ModalUbicacion),
  ],
  exports: [
    ModalUbicacion
  ]
})
export class ModalUbicacionModule {}
