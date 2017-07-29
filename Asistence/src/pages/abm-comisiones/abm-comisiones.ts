import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import {webService} from'../../servicios/ws/webService';
import {Login} from'../../pages/login/login';
import {HomePage} from'../../pages/home/home';

/**
 * Generated class for the AbmComisiones page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
export class Com {
  public descripcion: string = '';


  constructor( descripcion: string)
  {
    this.descripcion =descripcion ;
 
 }
}
@Component({
  selector: 'page-abm-comisiones',
  templateUrl: 'abm-comisiones.html',
})
export class AbmComisiones {
comision:Com=new Com("");

  constructor(public navCtrl: NavController,public ws:webService, public navParams: NavParams) {
  }
  altaComision(comision){
      this.ws.altaCom(this.comision).subscribe(resp=>{
       resp
       this.navCtrl.setRoot(HomePage);
   });

   }
  ionViewDidLoad() {
    console.log('ionViewDidLoad AbmComisiones');
  }
    logOut(){
    localStorage.setItem('token',null);
    this.navCtrl.setRoot(Login);
  }

}
