import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PaginaPrincipal } from './pagina-principal';

@NgModule({
  declarations: [
    PaginaPrincipal,
  ],
  imports: [
    IonicPageModule.forChild(PaginaPrincipal),
  ],
  exports: [
    PaginaPrincipal
  ]
})
export class PaginaPrincipalModule {}
