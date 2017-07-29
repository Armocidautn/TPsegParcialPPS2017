import { Component } from '@angular/core';
import { NavController,ModalController,AlertController } from 'ionic-angular';
import { JwtHelper} from 'angular2-jwt';
import {Registro} from'../../pages/registro/registro';
import {AbmCursos} from'../../pages/abm-cursos/abm-cursos';
import {AbmComisiones} from'../../pages/abm-comisiones/abm-comisiones';
import {AmbUsuariosCursos} from'../../pages/amb-usuarios-cursos/amb-usuarios-cursos';
import {AsignarComisiones} from'../../pages/asignar-comisiones/asignar-comisiones';
import {AsignarAlumnos} from'../../pages/asignar-alumnos/asignar-alumnos';
import {AbmUsuarios} from'../../pages/abm-usuarios/abm-usuarios';
import {Encuesta} from'../../pages/encuesta/encuesta';
import {Asistencia} from'../../pages/asistencia/asistencia';
import {Estadisticas} from'../../pages/estadisticas/estadisticas';
import {Login} from'../../pages/login/login';
import { Observable } from 'rxjs/Observable';
import {webService} from'../../servicios/ws/webService';
import {trigger,state,style,transition,animate,keyframes} from '@angular/animations';
import {ModalUbicacion} from'../../pages/modal-ubicacion/modal-ubicacion';
import { File } from '@ionic-native/file';
import {VerAsistencia} from'../../pages/ver-asistencia/ver-asistencia';
import {MiPerfil} from'../../pages/mi-perfil/mi-perfil';





  export class User{
    id_user:number;
    nombre:string;
    apellido:string;
    mail:string;
    clave:string;
    perfil:string;
    constructor(nombre,perfil,apellido,mail,id_user,clave){
      if(nombre==null){
        console.log("ERROR TOKEN");
      }
      else{
        console.log("exito");
        this.apellido=apellido;
        this.clave=clave;
        this.mail=mail;
        this.id_user=id_user;
      this.nombre=nombre;
      this.perfil=perfil;
      }  
  }
  }


@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
 animations: [
  trigger('flyInOut', [
    state('in', style({opacity:'1',height:'*' })),
      state('out', style({opacity:'0',height:'0px'})),
    transition('in => out', [
      animate(2000)
    ]),
    transition('out => in', [
      animate(2000)
    ])
  ])
]

})
export class HomePage {
   jwtHelper: JwtHelper = new JwtHelper();
   Admin:any;
   Administrativo:any;
   Profesor:any;
   state:any;
   Alumno:any;
   p:any;
   Cursos=[];
   Respuestas=[];
usuario:User=new User(null,null,null,null,null,null);
  constructor(public navCtrl: NavController,public alertCtrl:AlertController,public file:File,public ws:webService,public modalCtrl: ModalController) {
      this.state='in';
     var token = localStorage.getItem('token');
      var decoded=this.jwtHelper.decodeToken(token);
      console.log(decoded);
       this.usuario = new User(decoded.usuario[0].nombre,decoded.usuario[0].perfil,decoded.usuario[0].apellido,decoded.usuario[0].email,decoded.usuario[0].id_user,decoded.usuario[0].password);
   console.log(this.usuario);
       this.perfiles(this.usuario.perfil);
  }
  ionViewDidLeave(){
    this.state='in';
  }
  logOut(){
    localStorage.setItem('token',null);
    this.navCtrl.setRoot(Login);
  }
  miPerfil(){
    this.navCtrl.push(MiPerfil,{perfil:this.usuario.perfil,nombre:this.usuario.nombre,apellido:this.usuario.apellido,mail:this.usuario.mail,clave:this.usuario.clave,idUser:this.usuario.id_user});
  }
  abmUsuarios(){
    this.state=(this.state === 'out' ? 'in' : 'out');
      setTimeout(() => {
    this.navCtrl.push(AbmUsuarios);
  }, 3000);
}
verAsistencias(){
      this.state=(this.state === 'out' ? 'in' : 'out');
      setTimeout(() => {
     this.navCtrl.push(VerAsistencia);
  }, 3000);
   } 

   crearEncuesta(){
        this.state=(this.state === 'out' ? 'in' : 'out');
      setTimeout(() => {
     this.navCtrl.push(Encuesta,{nombreP:this.usuario.nombre});
  }, 3000);
   }
   Asistencia(){
         this.state=(this.state === 'out' ? 'in' : 'out');
      setTimeout(() => {
      this.navCtrl.push(Asistencia,{id_user:this.usuario.id_user});
  }, 3000);
   }
   Aestadisticas(){
         this.state=(this.state === 'out' ? 'in' : 'out');
      setTimeout(() => {
this.navCtrl.push(Estadisticas);
  }, 3000);
   }
  
  
  
    abmCursos(){
               this.state=(this.state === 'out' ? 'in' : 'out');
      setTimeout(() => {
      this.navCtrl.push(AbmCursos);
  }, 3000);
  }
    abmComisiones(){
               this.state=(this.state === 'out' ? 'in' : 'out');
      setTimeout(() => {
      this.navCtrl.push(AbmComisiones);
  }, 3000);
  }
  asignarComision(){
             this.state=(this.state === 'out' ? 'in' : 'out');
      setTimeout(() => {
      this.navCtrl.push(AsignarComisiones);
  }, 3000);

  }
  Ubicacion(){
   let modal = this.modalCtrl.create(ModalUbicacion);
    modal.present();
  }
  abmUsuariosCursos(){
                this.state=(this.state === 'out' ? 'in' : 'out');
      setTimeout(() => {
  this.navCtrl.push(AsignarAlumnos);
  }, 3000);
    
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
       if(perfil=="Profesor"){
        this.Admin=false;
        this.Administrativo=false;
        this.Profesor=true;
        this.Alumno=false;

      }
          if(perfil=="Alumno"){
        this.Admin=false;
        this.Administrativo=false;
        this.Profesor=false;
        this.Alumno=true;
        this.traerdatosCursos();

      }
    }
    generarTxt(){
 //this.file.createFile(this.file.externalDataDirectory,"Respuestas.txt",true);

      this.traerTodasLasRespuestas();
      
    }
     traerTodasLasRespuestas(){
      this.ws.traerRespuestas().subscribe(resp=>{
      console.log(resp);
     let arrayJSON=JSON.stringify(resp);
  //   this.file.writeExistingFile(this.file.externalDataDirectory,"Respuestas.txt",arrayJSON).then(resp_=>console.log("EXITO"+resp)).catch(err=>this.showAlert(err));  
    console.log(arrayJSON);
       });
     }
        traerdatosCursos(){
      this.ws.traerdatosCursos().subscribe(resp=>{
        let objeto =resp.json();
        this.Cursos=objeto[0];
    console.log("aca estoy"+this.Cursos[0].descripcion_curso);
         


    }) 

  }
  showAlert(err){
    let alert = this.alertCtrl.create({
      title: err,
      subTitle: 'vuelva a intentarlo',
      buttons: ['OK']
    });
    alert.present();
  }
  

}
