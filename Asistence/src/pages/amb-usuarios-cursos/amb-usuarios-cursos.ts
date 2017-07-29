import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import {webService} from'../../servicios/ws/webService';
import {Login} from'../../pages/login/login';


/**
 * Generated class for the AmbUsuariosCursos page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-amb-usuarios-cursos',
  templateUrl: 'amb-usuarios-cursos.html',
})
export class AmbUsuariosCursos {
      p:any;
      selectPerfil:any;
  usuario={
      perfil:''
  };
  constructor(public navCtrl: NavController,public ws: webService, public navParams: NavParams) {
       
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AmbUsuariosCursos');
  }
    logOut(){
    localStorage.setItem('token',null);
    this.navCtrl.setRoot(Login);
  }
  onChange(c){
      console.log(c);
      this.usuario.perfil=c;
   }
}
