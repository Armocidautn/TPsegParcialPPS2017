import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import {webService} from'../../servicios/ws/webService';
import {Login} from'../../pages/login/login';

/**
 * Generated class for the Encuesta page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
export class encuesta{
  pregunta:string;
  opcional:any;
  idcurso:any;
  nombreProfesor:string;
constructor(pregunta,opcional,idcurso,nombreProfesor){
  this.pregunta=pregunta;
  this.opcional=opcional;
  this.idcurso=idcurso;
  this.nombreProfesor=nombreProfesor;
}
}


@Component({
  selector: 'page-encuesta',
  templateUrl: 'encuesta.html',
})
export class Encuesta {
 
 Cursos=[];
CursosSeleccionados:any;
idcurso:any;
 pregunta:any;
 Opcional:any;
 encuesta:encuesta=new encuesta("","",0,"");
 nombrProfesor:any;
  constructor(public navCtrl: NavController,public ws:webService, public toastCtrl:ToastController,public navParams: NavParams) {
       this.nombrProfesor=this.navParams.get('nombreP');
      this.traerdatosCursos();  
  }

   traerdatosCursos(){
      this.ws.traerdatosCursos().subscribe(resp=>{
        let objeto =resp.json();
        this.Cursos=objeto[0];
    console.log("aca estoy"+this.Cursos[0].descripcion_curso);
    }) 

  } 
  onChangeCurso(){
   this.idcurso=this.CursosSeleccionados;
  }
onChange(Opcional){
  this.Opcional=Opcional;
console.log(Opcional);
}
  ionViewDidLoad() {
    console.log('ionViewDidLoad Encuesta');
  }
    logOut(){
    localStorage.setItem('token',null);
    this.navCtrl.setRoot(Login);
  }
     presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Encuesta Agregada Satisfactoriamente',
      duration: 3000
    });
    toast.present();
  }
  GuardarCuestionario(){
     this.encuesta.pregunta=this.pregunta;
     this.encuesta.opcional=this.Opcional;
     this.encuesta.idcurso=this.idcurso;
     this.encuesta.nombreProfesor=this.nombrProfesor;
      this.ws.GuardarEncuesta(this.encuesta).subscribe(resp=>{
          if(resp==true){
             this.pregunta="";
             this.CursosSeleccionados=null;
             this.Opcional=null;
             this.presentToast();
          }
        console.log(resp)});
    console.log("pregunta"+this.encuesta.pregunta);
    console.log("pregunta"+this.encuesta.idcurso);
    console.log("pregunta"+this.encuesta.opcional);
  }
}
