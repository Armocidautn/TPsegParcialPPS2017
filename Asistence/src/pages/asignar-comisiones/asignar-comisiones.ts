import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import {webService} from'../../servicios/ws/webService';
import {Login} from'../../pages/login/login';
import {HomePage} from'../../pages/home/home';

/**
 * Generated class for the AsignarComisiones page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
export class Com {
  public id_curso: number = 0;
  public id_comision: number=0;

  constructor( id_curso: number,id_comision:number)
  {
    this.id_curso =id_curso ;  
    this.id_comision =id_comision ;
 
 }
}
@Component({
  selector: 'page-asignar-comisiones',
  templateUrl: 'asignar-comisiones.html',
})
export class AsignarComisiones {
  comisionesId=[];
  comisionesD=[];
  comisionesSeleccionadas=[
  ];
  relacion:Com=new Com(0,0);
  idCurso:number;
  nombreCurso:any;
  CursosId=[];
  constructor(public navCtrl: NavController,public ws:webService, public navParams: NavParams) {
         this.traerDatos();
        this.nombreCurso=navParams.get('nombreC');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AsignarComisiones');
  }
    onChange(){
          for(var i=0;i<this.comisionesSeleccionadas.length;i++){
      this.relacion.id_comision=this.comisionesSeleccionadas[i]; 
          }
      this.insertarRelacionCursosComisiones();
  }
  insertarRelacionCursosComisiones(){
    for(var i=0;i<this.comisionesSeleccionadas.length;i++){
       this.relacion.id_comision=this.comisionesSeleccionadas[i];
       this.relacion.id_comision=+this.relacion.id_comision;
       
    this.ws.relacionCursoComisiones(this.relacion).subscribe(resp=>{
     console.log("devolvio"+ resp);
      this.navCtrl.setRoot(HomePage);
   });
}
  }
    logOut(){
    localStorage.setItem('token',null);
    this.navCtrl.setRoot(Login);
  }
  traerDatos(){
   this.ws.traerdatos().subscribe(resp=>{
        let objeto =resp.json();
     
        this.comisionesId=objeto[2];
         this.CursosId=objeto[0];
     for(var i=0;i<this.CursosId.length;i++){
    console.log("cursos"+this.CursosId[i].id_curso); 
     this.relacion.id_curso=this.CursosId[i].id_curso;  
   }

      //   var ultimo=this.CursosId.pop();
        // console.log("ULTIMOOOOO"+objeto[0][1].id_curso);
        
         console.log("ULTIMOOOOO"+this.relacion.id_curso);
  //   for(var i=0;i<objeto[0].length;i++){
    //     this.CursosId=objeto[0][i].id_curso+1;

     //}
    // this.relacion.id_curso=this.CursosId;
    // console.log(this.CursosId);
      //    console.log(this.relacion.id_curso);
         
      // let ultimoIndice=objeto[0].length+1;

         // this.relacion.idcurso=this.idCurso;
          

    })
    
  }

}
