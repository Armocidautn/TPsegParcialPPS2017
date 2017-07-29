import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AsignarComisiones } from './asignar-comisiones';

@NgModule({
  declarations: [
    AsignarComisiones,
  ],
  imports: [
    IonicPageModule.forChild(AsignarComisiones),
  ],
  exports: [
    AsignarComisiones
  ]
})
export class AsignarComisionesModule {}
