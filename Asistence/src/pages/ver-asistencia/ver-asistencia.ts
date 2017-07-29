import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import {webService} from'../../servicios/ws/webService';
import { Angular2Csv } from 'angular2-csv/Angular2-csv';
import { DatePipe } from '@angular/common';

/**
 * Generated class for the VerAsistencia page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
export class Asistieron{
    fecha:any;
    id_alumno:any;
    nombre_alumno:any;
    presenteAusente:any;
  
  constructor(fecha,id_alumno,nombre_alumno,presenteAusente){
    this.fecha=fecha;
    this.id_alumno=id_alumno;
    this.nombre_alumno=nombre_alumno;
    this.presenteAusente=presenteAusente;
  }
}


@Component({
  selector: 'page-ver-asistencia',
  templateUrl: 'ver-asistencia.html',
     styles: [`
    ion-grid {
        display: block;
        width: auto;
    }
`]
})
export class VerAsistencia {
Cursos=[];
fechaHoy:string;
Asistieron:Asistieron=new Asistieron(null,null,null,null);
array=[{
   id_alumno:0,
   nombre_alumno:"",
   fecha:"",
   presente_ausente:""
}];
ComisionesXcuros=[];
mostrarComisiones:any;
Comisiones=[];
mostrarCursos:any;
IdCurso:any;
idComision:any;
ListaAlumnos=[];
Alumnos=[];
ListaAsistencia=[];
formateada:any;
  constructor(public navCtrl: NavController,public datepipe:DatePipe,public ws:webService, public navParams: NavParams) {
    this.traerdatosCursos();
       this.mostrarCursos=true;

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VerAsistencia');
  }
  traerdatosCursos(){
      this.ws.traerdatosCursos().subscribe(resp=>{
        let objeto =resp.json();
        this.Cursos=objeto[0];
    console.log("aca estoy"+this.Cursos[0].descripcion_curso);
         


    }) 

  }
    AcursoAsistencia(idCurso){
      var array=[];
      this.ListaAsistencia=array;
    this.mostrarCursos=false;
    this.IdCurso=idCurso;
     
      this.ComisionesXcurso(idCurso);

  }
    ListaPorComision(idComision){
      let a=new Date();
      this.fechaHoy=a.toDateString();
      this.formateada=this.datepipe.transform(this.fechaHoy, 'yyyy-MM-dd');
    this.mostrarComisiones=false;
    this.idComision=idComision;
    console.log("ACA ESTOY"+this.formateada);
    // this.mostrarLista=true;
       this.ws.traerListaPorComision(this.IdCurso,idComision).subscribe(resp=>{
          
              this.ListaAlumnos=resp;
             
         this.ws.traerListaAsistenciaPorCursoComision(this.IdCurso,idComision).subscribe(resp=>{
              this.Alumnos=resp;  
              console.info(this.Alumnos);
              var length=this.Alumnos.length;
                if(length>0){   
              for(var i=0;i<this.ListaAlumnos.length;i++){ 
                           
                         if(this.Alumnos[i].id_alumno==this.ListaAlumnos[i].id_user){
                             var a="  ";
                           this.Alumnos[i].id_curso=this.ListaAlumnos[i].nombre.concat(a,this.ListaAlumnos[i].apellido);
                        //   this.arra=this.Alumnos[i].id_alumno;
                          // this.array[i].nombre_alumno=this.ListaAlumnos[i].nombre;
                          // this.array[i].fecha=this.Alumnos[i].fecha;
                         //  this.array[i].presente_ausente=this.Alumnos[i].presente_ausente;
                                  this.ListaAsistencia.push(this.Alumnos[i]);                     
                         }
                       
                           }
                      }
          
          
                                    for(var i=0;i<this.ListaAlumnos.length;i++){ 

                        
                                    }
                                                  for(var i=0;i<this.ListaAlumnos.length;i++){ 

              console.info("LISTA ALUMNOS"+this.ListaAlumnos[i].id_user);
                                                  }
              console.info(this.ListaAsistencia);
             
     
               });
        
       });


  }
  exportarCVS(){
    var options = {
      fieldSeparator: ';',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true,
      showTitle: false,
      useBom: true
    };
    new Angular2Csv(this.ListaAsistencia, 'ListaAsistencia', options);


  }
  ComisionesXcurso(idCurso){
         this.mostrarComisiones=true;
        this.ws.traerIdComisionesPorCurso(idCurso).subscribe(resp=>{
         
                
                  console.log(resp);
                  this.Comisiones=resp;
                  console.log(this.Comisiones);                  
             
              
          
   });
  }
}
