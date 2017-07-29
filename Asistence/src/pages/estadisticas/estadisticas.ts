import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import {webService} from'../../servicios/ws/webService';
import {Login} from'../../pages/login/login';

/**
 * Generated class for the Estadisticas page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-estadisticas',
  templateUrl: 'estadisticas.html',
   styles: [`
    chart {
        display: block;
        width: auto;
    }
`]
})
export class Estadisticas {
   Cursos=[];

  arrayRes=[];
   ArrayDatos=[0,0,0];
   options:any;
  constructor(public navCtrl: NavController,public ws:webService, public navParams: NavParams) {
     this.traerdatosCursos();
  //  this.CargarGrafico();
  
  }
  logOut(){
    localStorage.setItem('token',null);
    this.navCtrl.setRoot(Login);
  }
   traerdatosCursos(){
      this.ws.traerdatosCursos().subscribe(resp=>{
        let objeto =resp.json();
        this.Cursos=objeto[0];
    console.log("aca estoy"+this.Cursos[0].descripcion_curso);
    }); 

  } 
estadisticasDelCurso(idCurso){
   this.CargarGrafico(idCurso);
}
CargarGrafico(idCurso){
   this.ws.traerRespuestasPorCurso(idCurso).subscribe(resp=>{
      var bueno=0;
      var malo=0;
      var regular=0;
      var curso;
     console.log("RESPUESTAS"+resp);
       this.arrayRes.push(resp);
       
       for(var i=0;i<resp.length;i++){
         console.log(resp[i]);
           if(resp[i].respuesta=="bueno"){
          bueno=bueno+10;
           }
           if(resp[i].respuesta=="malo"){ 
          malo=malo+10;
           }
           if(resp[i].respuesta=="regular"){
          regular=regular+10; 
          }
       }
      this.ArrayDatos=[bueno,malo,regular];

          this.options={
     
          chart: {
            type: 'bar'
        },
        title: {
            text: 'VALORAICON DE CONTENIDOS DEL CURSO'
        },
        xAxis: {
            categories: ['BUENO', 'MALO', 'REGULAR']
        },
        yAxis: {
            title: {
                text: 'VALORACIONES'
            }
        },
        series: [ {
            name: 'John',
            data: this.ArrayDatos
        }]
        


   }


  });
    
   
   
     

          for(var i=0;i<this.ArrayDatos.length;i++){
    console.log("ARRAY DATOS"+this.ArrayDatos[i]);
       
         }
//  this.setGrafico(this.ArrayDatos);


}
 setGrafico(datos){

   this.options={
     
          chart: {
            type: 'bar'
        },
        title: {
            text: 'Fruit Consumption'
        },
        xAxis: {
            categories: ['BUENO', 'MALO', 'REGULAR']
        },
        yAxis: {
            title: {
                text: 'Fruit eaten'
            }
        },
        series: [{
            name: 'Jane',
            data: [2, 5]
        }, {
            name: 'John',
            data: datos
        }]


   }

 }
  ionViewDidLoad() {
    console.log('ionViewDidLoad Estadisticas');
  }

}
