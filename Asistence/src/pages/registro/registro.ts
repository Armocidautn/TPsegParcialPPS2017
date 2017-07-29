import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController  } from 'ionic-angular';
import {webService} from'../../servicios/ws/webService';
import { Observable } from 'rxjs/Observable';
import { JwtHelper} from 'angular2-jwt';
import {Login} from '../../pages/login/login';

/**
 * Generated class for the Registro page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-registro',
  templateUrl: 'registro.html',
})
export class Registro {
      p:any;
      isenabled:any;
      selectPerfil:any;
  usuario={
      perfil:''
  };
   perf:any;
     jwtHelper: JwtHelper = new JwtHelper();

  constructor(public navCtrl: NavController, public toastCtrl:ToastController,public navParams: NavParams,private ws:webService) {
      try{
      var token = localStorage.getItem('token');
      var decoded=this.jwtHelper.decodeToken(token);
         if(decoded.usuario[0].perfil=="Administrador" ||decoded.usuario[0].perfil=="Administrativo" ){
            this.selectPerfil=true; 
         }
         else{
             this.selectPerfil=false;
         }  
       }
       catch(error){
         console.log(error);
       }
}

  ionViewDidLoad() {
    console.log("USUARIO"+this.usuario);
  }
   onChange(c){
      console.log(c);
      this.usuario.perfil=c;
   }
    presentToast() {
    let toast = this.toastCtrl.create({
      message: 'User was added successfully',
      duration: 3000
    });
    toast.present();
  }
  presentToastValidar(){
       let toast = this.toastCtrl.create({
      message: 'RELLENAR CAMPOS VACIOS!!!',
      duration: 3000
    });
    toast.present();
  }
  reg(usuario){
       if(usuario.nombre=="" || usuario.apellido=="" || usuario.email=="" || usuario.password=="" || usuario.perfil==""){
         this.presentToastValidar();
       }else{
  
    if(this.selectPerfil==true){
     this.ws.registrar(usuario).subscribe(resp=>{
     console.log(resp);
     this.presentToast();
    });
    }
    else{
      this.usuario.perfil="Alumno";
         this.ws.registrar(usuario).subscribe(resp=>{
           console.log(resp);
     this.presentToast();
    });
       this.navCtrl.push(Login);
    } 
 }
  }
}

