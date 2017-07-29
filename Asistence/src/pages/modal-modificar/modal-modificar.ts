import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ModalModificar page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-modal-modificar',
  templateUrl: 'modal-modificar.html',
})
export class ModalModificar {
   nombreAmod:any;
   apellidoAmod:any;
   mailAmod:any;
   usuario=[];
   usuarioAmod={
     nombre:"",
     apellido:"",
     mail:""
   };
  constructor(public navCtrl: NavController, public navParams: NavParams) {
      this.usuario.push(this.navParams.get('usuariomodal'));
      
      console.log("USUARIO TRAIDO POR GET"+this.navParams.get('usuariomodal'));
   
      this.nombreAmod=this.usuario[0].nombre;
       this.apellidoAmod=this.usuario[0].apellido;
       this.mailAmod=this.usuario[0].email;
      console.log(this.nombreAmod);
      
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalModificar');
  }

}
