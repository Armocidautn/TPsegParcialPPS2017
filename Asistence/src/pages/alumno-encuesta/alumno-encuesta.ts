import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { JwtHelper} from 'angular2-jwt';
import { Observable } from 'rxjs/Observable';
import {webService} from'../../servicios/ws/webService';
import {Login} from '../../pages/login/login';
import {HomePage} from '../../pages/home/home';

/**
 * Generated class for the AlumnoEncuesta page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
export class respuesta{
   pregunta:any;
   respuesta:any;
   id_usuario:any;
   id_cuestionario:any;
   id_curso:any;

  constructor(pregunta,respuesta,id_usuario,id_cuestionario,id_curso){
    this.pregunta=pregunta;
    this.respuesta=respuesta;
    this.id_usuario=id_usuario;
    this.id_cuestionario=id_cuestionario;
    this.id_curso=id_curso;
  }
}
 export class User{
    id_user:number;
    nombre:string;
    perfil:string;
    constructor(nombre,perfil,id_user){
      if(nombre==null){
        console.log("ERROR TOKEN");
      }
      else{
        console.log("exito");
        this.id_user=id_user;
      this.nombre=nombre;
      this.perfil=perfil;
      }  
  }
  }
@Component({
  selector: 'page-alumno-encuesta',
  templateUrl: 'alumno-encuesta.html',
})
export class AlumnoEncuesta {
  nohayencuestas:any;
   jwtHelper: JwtHelper = new JwtHelper();
   usuario:User=new User(null,null,null);
   Arespuesta:respuesta=new respuesta(null,null,null,null,null);
   p:any;
   Admin:any;
   Administrativo:any;
   Profesor:any;
   Alumno:any;
   idCurso:number;
   Encuestas=[];
   texto:any;
   opcional:any;
   respuesta:any;
   opElegida:any;
   id_cuestionario:any;
   pregunta:any;
   MostrarEncuestas:any;
   respuestasPorUsuario=[];
   flag=0;
   Pendientes=false;
  constructor(public navCtrl: NavController,public ws:webService, public navParams: NavParams,public alertCtrl:AlertController) {
          this.MostrarEncuestas=true;
      var token = localStorage.getItem('token');
      var decoded=this.jwtHelper.decodeToken(token);
      this.usuario = new User(decoded.usuario[0].nombre,decoded.usuario[0].perfil,decoded.usuario[0].id_user);
      console.log(this.usuario);
          this.perfiles(this.usuario.perfil);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AlumnoEncuesta');
  }
     perfiles(perfil){
      if(perfil=="Administrador"){
        this.Admin=true;
        this.Administrativo=false;
        this.Profesor=false;
        this.Alumno=false;

        this.p=perfil;
        this.AreaRestringida();

      }
   if(perfil=="Administrativo"){
        this.Admin=false;
        this.Administrativo=true;
        this.Profesor=false;
        this.Alumno=false;
        this.AreaRestringida();
        
      }
       if(perfil=="Profesor"){
        this.Admin=false;
        this.Administrativo=false;
        this.Profesor=true;
        this.Alumno=false;
                this.CargarTodasEncuestas();


      }
             if(perfil=="Alumno"){
        this.Admin=false;
        this.Administrativo=false;
        this.Profesor=false;
        this.Alumno=true;
        this.cargarEncuestas();

      }
    }
    CargarTodasEncuestas(){
      this.ws.traerEncuestas().subscribe(resp=>{
               console.log("encuestas");
               this.Encuestas=resp;

      });
    }
    traerRespuestas(Idusuario){
    this.ws.traerRespuestasPorUsuario(Idusuario).subscribe(resp=>{
      console.log(resp);
      for(var i=0;i<resp.length;i++){
          this.respuestasPorUsuario.push(resp[i].id_cuestionario);
      console.log("ID RESPONDIDOS"+this.respuestasPorUsuario[i]);
  
    }
    });  
  
   
    }
cargarEncuestas(){
  this.traerRespuestas(this.usuario.id_user);
     this.ws.traerIdCursoUsuario(this.usuario.id_user).subscribe(resp=>{
      console.log(resp[0].id_curso2);
      console.log("ID CURSO"+this.idCurso);
        for(var i=0;i<resp.length;i++){
             this.idCurso=resp[i].id_curso2;
   this.ws.traerEncuestasPorCurso(this.idCurso).subscribe(resp=>{
      
            console.log(resp)
                   var indice=[];
                  for(var i=0;i<resp.length;i++){
                   var idCues=resp[i].id_cuestionario;
                      if(this.respuestasPorUsuario.indexOf(idCues)>-1){
                        console.log("igual");
                       
                      }
                       else{
                    
                     indice.push(resp[i]);  
                     console.log(indice);
                     this.Encuestas.push(resp[i]);
                        
                      }
                    
                }
         // for(var i=0;i<resp.length;i++){
          // resp.splice(indice[i],1);  
     // }
          

        });

      }

     });
                                                   

}
AreaRestringida(){
    let alert = this.alertCtrl.create({
      title: 'AREA RESTRINGIDA',
      subTitle: 'Solo profesores y alumnos pueden acceder a esta seccion',
      buttons: ['OK']
    });
    alert.present();
    this.navCtrl.setRoot(HomePage);

}
showAlert(){
    let alert = this.alertCtrl.create({
      title: 'error',
      subTitle: 'Vuelva a escribir sus credenciales de acceso',
      buttons: ['OK']
    });
    alert.present();
    this.navCtrl.setRoot(HomePage);
}
Modificar(encuesta){
   

    let prompt = this.alertCtrl.create({
      title: 'MODIFICAR ENCUESTA',
      message: "Enter a name for this new album you're so keen on adding",
      inputs: [
        { 
          name: 'pregunta',
          placeholder:encuesta.pregunta,
          
        },
          { 
          name: 'tipo_respuesta',
          placeholder:encuesta.tipo_respuesta
          
        },
      
      ],
      buttons: [
   
        {
          text: 'Save',
          handler: data => {
               if(data.tipo_respuesta==""){
                   data.tipo_respuesta=encuesta.tipo_respuesta;
               }
                if(data.tipo_respuesta=="texto" || data.tipo_respuesta=="opcional"){
                  data.tipo_respuesta=data.tipo_respuesta;
               }
               else{
                   data.tipo_respuesta=encuesta.tipo_respuesta;
                 
               }
              
                
      
      this.ws.modificarPregunta(encuesta.id_cuestionario,data.tipo_respuesta).subscribe(resp=>{
    console.log(resp);
     this.CargarTodasEncuestas();
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
goBack(){
  this.navCtrl.setRoot(HomePage);
}
guardarRespuestaOpcional(){
  this.Arespuesta.id_cuestionario=this.id_cuestionario;
  this.Arespuesta.id_usuario=this.usuario.id_user;
   this.Arespuesta.pregunta=this.pregunta;
   this.Arespuesta.respuesta=this.opElegida;
   this.Arespuesta.id_curso=this.idCurso;
  console.log("pregunta"+this.Arespuesta.pregunta);
  console.log("respuiesta"+this.Arespuesta.respuesta);
  console.log("id_cuestionario"+this.Arespuesta.id_cuestionario);
  console.log("id_user"+this.Arespuesta.id_usuario);
  
  this.ws.guardarRespuesta(this.Arespuesta).subscribe(resp=>{
    console.log(resp);
  });
      this.actualizarEncuestas(this.Arespuesta.id_cuestionario);

}  logOut(){
    localStorage.setItem('token',null);
    this.navCtrl.setRoot(Login);
  }
guardarRespuesta(){
  this.Arespuesta.id_cuestionario=this.id_cuestionario;
  this.Arespuesta.id_usuario=this.usuario.id_user;
   this.Arespuesta.pregunta=this.pregunta;
   this.Arespuesta.respuesta=this.respuesta;
      this.Arespuesta.id_curso=this.idCurso;


  
  this.ws.guardarRespuesta(this.Arespuesta).subscribe(resp=>{
    console.log(resp);
  });
    this.actualizarEncuestas(this.Arespuesta.id_cuestionario);
  
}
actualizarEncuestas(id_cuestionario){
  var indice;
     for(var i=0;i<this.Encuestas.length;i++){
       if(this.Encuestas[i].id_cuestionario==id_cuestionario){
         indice=i;
       }
     }
this.Encuestas.splice(indice,1);
  this.opcional=false;
  this.texto=false;
  this.MostrarEncuestas=true;
}
Responder(tipoRespuesta,pregunta,idCuestionario,idcurso){
  this.id_cuestionario=idCuestionario;
  this.idCurso=idcurso;
  this.pregunta=pregunta;
     if(tipoRespuesta=="texto"){
      this.texto=true;
      this.MostrarEncuestas=false;

       }
    if(tipoRespuesta=="opcional"){
      this.opcional=true;
this.MostrarEncuestas=false;

    }
}
onChange(opcionElegida){
   this.opElegida=opcionElegida;
  
}
Borrar(idBorrar){
console.log(idBorrar);
       this.ws.borrarEncuesta(idBorrar).subscribe(resp=>{
     resp
  this.CargarTodasEncuestas();
      });

 
}



}
