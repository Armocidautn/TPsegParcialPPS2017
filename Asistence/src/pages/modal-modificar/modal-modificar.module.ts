import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalModificar } from './modal-modificar';

@NgModule({
  declarations: [
    ModalModificar,
  ],
  imports: [
    IonicPageModule.forChild(ModalModificar),
  ],
  exports: [
    ModalModificar
  ]
})
export class ModalModificarModule {}
