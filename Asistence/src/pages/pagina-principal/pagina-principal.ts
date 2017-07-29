import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { JwtHelper} from 'angular2-jwt';
import {Registro} from'../../pages/registro/registro';
import {AbmCursos} from'../../pages/abm-cursos/abm-cursos';
import {AbmComisiones} from'../../pages/abm-comisiones/abm-comisiones';
/**
 * Generated class for the PaginaPrincipal page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()

  export class User{
    nombre:string;
    perfil:string;
    constructor(nombre,perfil){
      if(nombre==null){
        console.log("ERROR TOKEN");
      }
      else{
        console.log("exito");
      this.nombre=nombre;
      this.perfil=perfil;
      }  
  }
  }

@Component({
  selector: 'page-pagina-principal',
  templateUrl: 'pagina-principal.html',
})
export class PaginaPrincipal {
  jwtHelper: JwtHelper = new JwtHelper();
   Admin:any;
   Administrativo:any;
   Profesor:any;
   Alumno:any;
   p:any;
usuario:User=new User(null,null);
  constructor(public navCtrl: NavController, public navParams: NavParams) {
var token = localStorage.getItem('token');
      var decoded=this.jwtHelper.decodeToken(token);
       this.usuario = new User(decoded.usuario[0].nombre,decoded.usuario[0].perfil);
   console.log(this.usuario);
       this.perfiles(this.usuario.perfil); 
 }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PaginaPrincipal');
  }
   ambCursos(){
      this.navCtrl.push(AbmCursos);
  }
    ambComisiones(){
      this.navCtrl.push(AbmComisiones);
  }
    perfiles(perfil){
      if(perfil=="Administrador"){
        this.Admin=true;
        this.Administrativo=false;
        this.Profesor=false;
        this.Alumno=false;

        this.p=perfil;

      }
   if(perfil=="Administrativo"){
        this.Admin=false;
        this.Administrativo=true;
        this.Profesor=false;
        this.Alumno=false;

      }
    }
}
