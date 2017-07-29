import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';
import {webService} from'../../servicios/ws/webService';
import {HomePage} from '../../pages/home/home';

/**
 * Generated class for the MiPerfil page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-mi-perfil',
  templateUrl: 'mi-perfil.html',
})
export class MiPerfil {
   perfil:any;
   nombre:any;
   Administrador:any;
   Administrativo:any;
   Profesor:any;
   Alumno:any;
   nombrePerfil:any;
   apellidoPerfil:any;
   mailPerfil:any;
   clavePerfil:any;
   idUser:any;
   clave:any;
   apellido:any;
   mail:any;
  constructor(public navCtrl: NavController,public toastCtrl:ToastController,public ws:webService, public navParams: NavParams) {
    this.perfil=this.navParams.get('perfil');
    this.nombre=this.navParams.get('nombre');
    this.clave=this.navParams.get('clave');
    this.apellido=this.navParams.get('apellido');
    this.mail=this.navParams.get('mail');
    this.idUser=this.navParams.get('idUser');

      this.nombrePerfil=this.nombre;
    this.apellidoPerfil=this.apellido;
    this.mailPerfil=this.mail;
    this.clavePerfil=this.clave;
    console.log(this.mail);
    this.perfiles(this.perfil);
  }
    
  presentToastExito(){
       let toast = this.toastCtrl.create({
      message: 'CONTRAÑENA MODIFICADA CON EXITO!!!',
      duration: 3000
    });
    toast.present();
  }

 perfiles(perfil){
      if(perfil=="Administrador"){
        this.Administrador=true;
        this.Administrativo=false;
        this.Profesor=false;
        this.Alumno=false;
  

      }
   if(perfil=="Administrativo"){
        this.Administrador=false;
        this.Administrativo=true;
        this.Profesor=false;
        this.Alumno=false;

      }
       if(perfil=="Profesor"){
        this.Administrador=false;
        this.Administrativo=false;
        this.Profesor=true;
        this.Alumno=false;

      }
          if(perfil=="Alumno"){
        this.Administrador=false;
        this.Administrativo=false;
        this.Profesor=false;
        this.Alumno=true;

      }
    }
    cambiarPassword(){
      console.log("aca estoy"+this.idUser);
      console.log("aca estoy"+this.clavePerfil);
      
      this.ws.CambiarPassword(this.clavePerfil,this.idUser).subscribe(resp=>{
        console.log(resp);
        if(resp==true){
 this.presentToastExito();
 this.navCtrl.setRoot(HomePage);
        }
      });

    }
  ionViewDidLoad() {
    console.log('ionViewDidLoad MiPerfil');
  }

}
