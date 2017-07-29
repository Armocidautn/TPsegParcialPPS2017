import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController ,ToastController} from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import {webService} from'../../servicios/ws/webService';
import {Login} from'../../pages/login/login';

/**
 * Generated class for the AsignarAlumnos page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
export class RelAlu {
  public id_curso2: number = 0;
  public id_usuarios2: number=0;

  constructor( id_curso2: number,id_usuarios2:number)
  {
    this.id_curso2 =id_curso2 ;  
   this.id_usuarios2 =id_usuarios2 ;
 
 }
}
export class RelAluCom {
  public id_usuarios1: number = 0;
  public id_comision2: number=0;

  constructor( id_usuarios1: number,id_comision2:number)
  {
    this.id_usuarios1 =id_usuarios1 ;  
   this.id_comision2 =id_comision2 ;
 
 }
}
@Component({
  selector: 'page-asignar-alumnos',
  templateUrl: 'asignar-alumnos.html',
})
export class AsignarAlumnos {
 alumnos=[];
 nombreCurso:any;
 Cursos=[];
 ComisionesSeleccionadas=[];
 idUsuariosCurso=[];
 relacionconAluCom:RelAluCom=new RelAluCom(0,0);
 relacion:RelAlu=new RelAlu(0,0);
 idAlumnoS:number;
 alumnoSeleccionado:any;
 idCursosS=[];
 alumnosTraidos=[];
 CursosSeleccionados:any;
 array=[];
 ComisionesXcurso=[];
 isenabled:any;
 ocultar:any;
  mostrarComisionesDeCurso:any;
  constructor(public navCtrl: NavController,public ws:webService,public toastCtrl:ToastController, public navParams: NavParams,public alertCtrl:AlertController) {
     this.traerCursosAlumnos();  
     this.isenabled=false;
    this.ocultar=true;
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad AsignarAlumnos');
  }
    onChangeCurso(){
      if(this.idAlumnoS!=null){
          this.isenabled=true;
          
      } 
    
      this.idCursosS=this.CursosSeleccionados;
         this.relacion.id_curso2=this.CursosSeleccionados;
      console.log(this.idCursosS);
  }
  IngresarAlumnosAcursos(){
      var repetido=false;

           this.ws.buscarRepetido(this.idAlumnoS,this.idCursosS).subscribe(resp=>{

             console.log(resp);
              if(resp==true){
            console.log("EL USUARIO YA SE ENCUENTRA EN EL CURSO");
            this.mostrarComisionesDeCurso=false; 
            this.showAlert();
                   this.ocultar=true;

           }
              else{
                    this.ocultar=false;

                this.mostrarComisionesDeCurso=true;
             this.ws.relacionAlumnoCurso(this.relacion).subscribe(resp=>{
     console.log("devolvio"+ resp);
          
   });
         
          for(var i=0;i<this.CursosSeleccionados.length;i++){
    this.ws.traerIdComisionesPorCurso(this.relacion.id_curso2).subscribe(resp=>{
         
                
                  console.log(resp);
                  this.ComisionesXcurso=resp;
                  console.log(this.ComisionesXcurso);                  
             
              
         
   });
          }

              } 
           });         
          
   
    


  }
       showAlert() {
    let alert = this.alertCtrl.create({
      title:'USUARIO REPETIDO',
      subTitle: 'El usuario ya se encuentra asignado a este curso/Seleccione otro curso',
      buttons: ['OK']
    });
    alert.present();
  }
       showAlertOk() {
    let alert = this.alertCtrl.create({
      title:'USUARIO INGRESADO SATISFACTORIAMENTE',

      buttons: ['OK']
    });
    alert.present();
  }  
     onChangeComision(){
       console.log(this.ComisionesSeleccionadas.length);
            for(var i=0;i<this.ComisionesSeleccionadas.length;i++){
       this.relacionconAluCom.id_comision2=this.ComisionesSeleccionadas[i];
                this.ws.relacionAlumnoComision(this.relacionconAluCom).subscribe(resp=>{
     console.log("devolvio"+ resp);
           if(resp==false){
              this.ComisionesSeleccionadas=null;
             this.ocultar=true;
             this.mostrarComisionesDeCurso=false;
           }
   });

      
    }
  }
     
    logOut(){
    localStorage.setItem('token',null);
    this.navCtrl.setRoot(Login);
  }
  onChange(){
    if(this.idCursosS!=null){
       this.isenabled=true;
      }
      this.idAlumnoS=this.alumnoSeleccionado;
          var indice=this.alumnos.indexOf(this.idAlumnoS.toString());
           console.log(indice);
     
      this.relacion.id_usuarios2=this.idAlumnoS; 
      this.relacionconAluCom.id_usuarios1=this.idAlumnoS;
      console.log(this.alumnoSeleccionado);
  }
  
  traerCursosAlumnos(){
   this.ws.traerCA().subscribe(resp=>{
        let objeto =resp.json();
        this.alumnos=objeto[2];
        this.Cursos=objeto[0];
        this.idUsuariosCurso=objeto[3];
      
  

     
   
    
         


    }) 
    
  }

}
