import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import {webService} from'../../servicios/ws/webService';
import { DatePipe } from '@angular/common';
import {Login} from'../../pages/login/login';

/**
 * Generated class for the Asistencia page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
export class Asistio{
      id_alumno:number;
		  fecha:string;
			presente_ausente:string;
			id_comision:number;
      id_curso:number; 
  constructor(id_alumno:number,fecha:string,presente_ausente:string,id_comision:number,id_curso:number){
   this.id_alumno=id_alumno;
   this.fecha=fecha;
   this.id_curso=id_curso;
   this.presente_ausente=presente_ausente;
   this.id_comision=id_comision;
  }

}
@Component({
  selector: 'page-asistencia',
  templateUrl: 'asistencia.html',
})
export class Asistencia {
mostrarCursos:boolean;
mostrarComisiones:boolean;
mostrarLista:boolean;
presentes=[];
ausentes=[];
alumno:Asistio=new Asistio(0,"","",0,0);
alumnoo=[];
IdCurso:any;
idComision:any;
Cursos=[];
fecha:string;
Alumnos=[];
AlumnosPresentes=[];
Comisiones=[];
id_profesor:any;
  constructor(public navCtrl: NavController,public datepipe:DatePipe,public ws:webService, public navParams: NavParams) {
    this.id_profesor=this.navParams.get('id_user');
    console.log("id profesor"+this.id_profesor);
   this.traerdatosCursos();  
   this.mostrarCursos=true;
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad Asistencia');
  }

    traerdatosCursos(){
      this.ws.traerdatosCursos().subscribe(resp=>{
        let objeto =resp.json();
        this.Cursos=objeto[0];
    console.log("aca estoy"+this.Cursos[0].descripcion_curso);
         


    }) 

  }
  ComisionesXcurso(idCurso){
         this.mostrarComisiones=true;
        this.ws.traerIdComisionesPorCurso(idCurso).subscribe(resp=>{
         
                
                  console.log(resp);
                  this.Comisiones=resp;
                  console.log(this.Comisiones);                  
             
              
          
   });
  }
    logOut(){
    localStorage.setItem('token',null);
    this.navCtrl.setRoot(Login);
  }
  onChangeComision(){
   
    console.log(this.AlumnosPresentes);
         this.presentes=this.AlumnosPresentes;
     
   
  console.log("presentes"+this.presentes);
  
}
guardarAsistencia(){
  this.AlumnosPresentes=null;
  this.mostrarCursos=true;
  this.mostrarLista=false;
   var fecha=new Date();
   var a;
   this.fecha=fecha.toDateString();
    let latest_date =this.datepipe.transform(fecha, 'yyyy-MM-dd');
    this.alumno.id_curso=this.IdCurso;
    this.alumno.id_comision=this.idComision;
    this.alumno.fecha=latest_date;
   console.log("FECHA"+latest_date);
  console.log("FECHA"+this.alumno.fecha);
   
       
    for(var i=0;i<this.Alumnos.length;i++){
       a=this.Alumnos[i].id_user;
        a=a.toString();
           if(this.presentes.indexOf(a)>-1){
              this.alumno.id_alumno=this.Alumnos[i].id_user;
          this.alumno.presente_ausente="P";     
           this.ws.guardarAsistencia(this.alumno).subscribe(resp=>{
               console.log(resp);
           });     
          console.log("Presentes"+this.alumno.id_alumno);
             
      }
        else{
          this.alumno.id_alumno=this.Alumnos[i].id_user;
             this.alumno.presente_ausente="A";
             this.ws.guardarAsistencia(this.alumno).subscribe(resp=>{
               console.log(resp);
           });     
          console.log("ausentes"+this.Alumnos[i].id_user);
        }
      
    }

     



}
    
  AcursoAsistencia(idCurso){
    this.mostrarCursos=false;
    this.IdCurso=idCurso;
     
      this.ComisionesXcurso(idCurso);

  }
  updateCucumber(){}
  ListaPorComision(idComision){
    this.mostrarComisiones=false;
    this.idComision=idComision;
    console.log("ACA ESTOY");
     this.mostrarLista=true;
         this.ws.traerListaPorComision(this.IdCurso,idComision).subscribe(resp=>{
          
              this.Alumnos=resp;
             
         });

  }
}
