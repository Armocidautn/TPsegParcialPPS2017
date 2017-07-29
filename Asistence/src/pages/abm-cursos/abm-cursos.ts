import { Component } from '@angular/core';
import { IonicPage, ToastController,NavController, NavParams ,AlertController} from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import {webService} from'../../servicios/ws/webService';
import {AsignarComisiones} from '../../pages/asignar-comisiones/asignar-comisiones';
import {Login} from'../../pages/login/login';

/**
 * Generated class for the AbmCursos page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
export class C {
  public descripcion: string = '';
   public dias:string="";
   public horario:string="";

  constructor( descripcion: string,dias:string,horario:string)
  {
    this.descripcion =descripcion ;
     this.dias=dias;
     this.horario=horario;
 }

}
export class ComC {
  public id_curso: number = 0;
  public id_comision: number=0;

  constructor( id_curso: number,id_comision:number)
  {
    this.id_curso =id_curso ;  
    this.id_comision =id_comision ;
 
 }
}
@Component({
  selector: 'page-abm-cursos',
  templateUrl: 'abm-cursos.html',
})
export class AbmCursos {
curso={
  descripcion:"",
  dias:"",
  horarios:""

}
isenabled:any;
Cursos=[];
ComisionesId=[];
  relacion:ComC=new ComC(0,0);

ComisionesXcurso:any;
  jsn:any;
  public nombre:string;
  constructor(public navCtrl: NavController,public toastCtrl:ToastController,public alertCtrl:AlertController,public ws:webService, public navParams: NavParams) {
    this.traerdatosCursos();
  }
   ionViewDidLeave(){
    this.traerdatosCursos();
  }
  traerdatosCursos(){
      this.ws.traerdatosCursos().subscribe(resp=>{
        let objeto =resp.json();
        this.Cursos=objeto[0];
    console.log("aca estoy");
         


    }) 

  }
      presentToast() {
    let toast = this.toastCtrl.create({
      message: 'RELLENE LOS CAMPOS VACIOS!!!',
      duration: 3000
    });
    toast.present();
  }
   altaCurso(curso){
       if(curso.nombre=="" || curso.dias=="" || curso.horario==""){
         this.presentToast();
       }
       else{
       this.jsn=JSON.stringify(this.curso);
       var parse=JSON.parse(this.jsn);
    this.nombre=parse.nombre;
 console.log("dd"+curso.nombre);
 console.log("dd"+curso.dias);
  console.log("dd"+curso.horario);
   

      this.ws.altaC(curso).subscribe(resp=>{
 console.log("asdasd"+resp.dias);
     this.navCtrl.push(AsignarComisiones,{nombreC:this.nombre});
   });
       }
  }
  //console.info("CURSO"+this.nombre);
Modificar(curso){
          this.ws.traerIdComisionesPorCurso(curso.id_curso).subscribe(resp=>{
         
                
                  console.log(resp);
                  this.ComisionesXcurso=resp;
                  console.log(this.ComisionesXcurso);                  
             
              
         
   });

    let prompt = this.alertCtrl.create({
      title: 'Login',
      message: "Enter a name for this new album you're so keen on adding",
      inputs: [
        { 
          name: 'nombreCurso',
          placeholder:curso.descripcion_curso
          
        },
    
      
      ],
      buttons: [
 
            {
          text: 'ModificarComisiones',
          handler: data => {
                  if(data.nombreCurso==""){
                   data.nombreCurso=curso.descripcion_curso;
               }
               console.log(curso.id_curso);
          this.ModificarComisonesCurso(curso.id_curso,data.nombreCurso);
           
          }
        },
        {
          text: 'Save',
          handler: data => {
               if(data.nombreCurso==""){
                   data.nombreCurso=curso.descripcion_curso;
               }
               
        
      this.ws.modificarNombreCurso(curso.id_curso,data.nombreCurso).subscribe(resp=>{
    console.log(resp);
  this.traerdatosCursos();

     }); 
           
         }
        },
               {
          text: 'Cancel',
          handler: data => {
             
            console.log('Cancel clicked');
          }
        }

        
      ]
    });
    prompt.present();
  
}

ModificarComisonesCurso(id,nombreCurso){
  this.ws.traerdatos().subscribe(resp=>{
        let objeto =resp.json();
     
        this.ComisionesId=objeto[2];
  let alert = this.alertCtrl.create();
    alert.setTitle('Preferred Activities');
    for (let activity of this.ComisionesId) {
      alert.addInput({
        type: 'checkbox',
        label: activity.descripcion,
        value: activity.id_comision,
        checked: activity.checked
      });
    }
    alert.addButton({
     text:'cancel',
 handler: data => {
             
            console.log('Cancel clicked');
          }

    });
    alert.addButton({
      text: 'Ok',
      handler: selected => {
        this.ComisionesId = selected;
        console.log("SELECTED2"+id);
           
             this.ws.modificarNombreCurso(id,nombreCurso).subscribe(resp=>{
    console.log(resp);

  this.traerdatosCursos();

     });  
     this.BorrarCursoComision(id);

          for(var i=0;i<this.ComisionesId.length;i++){
              this.relacion.id_curso=id;
              console.log(id);
              this.relacion.id_comision=this.ComisionesId[i];
              console.log(this.ComisionesId[i]);
               this.ws.relacionCursoComisiones(this.relacion).subscribe(resp=>{
    console.log(resp);
  this.traerdatosCursos();

     });
   }
      }
    });
    alert.present();
    
 })


}
BorrarCursoComision(idBorrar){
console.log(idBorrar);
       this.ws.borrarCursoComision(idBorrar).subscribe(resp=>{
     resp
      }); 

 
}
  logOut(){
    localStorage.setItem('token',null);
    this.navCtrl.setRoot(Login);
  }
Borrar(idBorrar){
console.log(idBorrar);
       this.ws.borrarCurso(idBorrar).subscribe(resp=>{
     resp
  this.traerdatosCursos();
      });
this.borrarRelacionAlumnoComision(idBorrar);

 
}
borrarRelacionAlumnoComision(id){

  this.traeridUser(id);
  this.ws.borrarRelacionAC(id).subscribe(resp=>{
     resp
  this.traerdatosCursos();
      });

}
traeridUser(id){ 
  console.log("ID"+id);
    this.ws.traerIdUserComision(id).subscribe(resp=>{

     console.log("ASD"+resp);
     for(var i=0;i<resp.length;i++){  
  let idUser= resp[i].id_user;
   console.log("RESP DE I"+resp[i].id_user);
  this.borrarRAC(idUser);
     console.log("ID USER"+idUser);
  this.traerdatosCursos();
   }       
      });
    
}

borrarRAC(idUser){
    this.ws.borrarRelacionAC(idUser).subscribe(resp=>{
   console.log("RESPUESTA"+ resp);
      });
}
  ionViewDidLoad() {
    console.log('ionViewDidLoad AbmCursos');
  }

}
