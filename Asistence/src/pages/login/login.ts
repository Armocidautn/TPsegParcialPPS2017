import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,LoadingController,AlertController} from 'ionic-angular';
import {webService} from'../../servicios/ws/webService';
import {Registro} from'../../pages/registro/registro';
import {HomePage} from'../../pages/home/home';
import {PaginaPrincipal} from'../../pages/pagina-principal/pagina-principal';
import { ActionSheetController } from 'ionic-angular';
import { Vibration } from '@ionic-native/vibration';
import { Http, Response, RequestOptions, Headers, RequestMethod } from '@angular/http';

import { Observable } from 'rxjs/Observable';

/**
 * Generated class for the Login page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
export class User {
  public email: string = '';
  public clave: string = '';

  constructor( email: string, clave: string)
  {
    this.email = email;
    this.clave = clave;
 
 }
}
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})

export class Login {
    user: User = new User('','');

   
  constructor(public navCtrl: NavController,public http:Http,public vibration:Vibration,public alertCtrl:AlertController,public loadCtrl:LoadingController,public actionshet:ActionSheetController, public navParams: NavParams, private ws:webService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Login');
  }

  cargarUsuario(){
    let actionSheet = this.actionshet.create({
            title: 'CREDENCIALES DE ACCESO',
            cssClass:'title',
            buttons: [
                {
                    text: 'Administrador',
                           role: 'destructive',

                    handler: () => {
                        this.datosUser('Administrador');
                    }
                },
                {
                    text: 'Administrativo',
                    handler: () => {
                        this.datosUser('Administrativo');
                    }
                },
                {
                    text: 'Profesor',
                    handler: () => {
                        this.datosUser('Profesor');
                    }
                },
                {
                    text: 'Alumno',
                    handler: () => {
                        this.datosUser('Alumno');
                    }
                },
                {
                    text: 'Cancelar',
                    role: 'cancel'
                }
            ]
        });

        actionSheet.present();

  }
   datosUser(perfil){
   if(perfil=="Administrador"){
         this.user.email="pedro@mail.com";
    this.user.clave="pedromail";
   }
   if(perfil=="Administrativo"){
         this.user.email="jose@mail.com";
    this.user.clave="joseomail";
   }
   if(perfil=="Profesor"){
         this.user.email="octavio@mail.com";
    this.user.clave="octaviomail";
   }
   if(perfil=="Alumno"){
       this.user.email="alejandro@mail.com";
    this.user.clave="alejandromail";
   }

   }
 presentLoadingDefault(){
     let loading = this.loadCtrl.create({
    content: 'INICIANDO SESION...'
  });

  loading.present();

  setTimeout(() => {
    loading.dismiss();
  }, 3000);

   }
     showAlert(error) {
    let alert = this.alertCtrl.create({
      title: error,
      subTitle: 'Vuelva a escribir sus credenciales de acceso',
      buttons: ['OK']
    });
    alert.present();
  }
  login(){
    this.presentLoadingDefault();
 
         setTimeout(() => {

   this.ws.signIn(this.user).subscribe(resp=>{
       console.log("respondio"+resp);
           if(resp['token']!=undefined){
              localStorage.setItem('token', resp['token']);     
              this.navCtrl.setRoot(HomePage);
           }
           else{
             this.vibration.vibrate(2000);
             this.showAlert(resp['err']);
             console.log("ERROR"+resp);
           }
   });
  }, 3000);


  }
   aRegistro(){
     this.navCtrl.push(Registro);

   }
}
