import { Http, Response, RequestOptions, Headers, RequestMethod } from '@angular/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { AuthHttp,AuthConfig } from 'angular2-jwt';
@Injectable()
  export class webService{
     objeto:object;
       constructor(private http:Http,authhttp:AuthHttp ){
         console.log("WEB-SERVICE");
       }
      url:string="http://crazypizza.esy.es/Asistente/";
     //  url:string="http://localhost/Asistence/index.php/";
     
     altaC(curso):Observable<any>{
let JsonV=JSON.stringify(curso);            
          
        let headers = new Headers({
              'Content-Type': 'application/json' });
          
        let options = new RequestOptions({ headers: headers }); 
         return this.http.post(this.url+"altacurso",JsonV,options)
          
                         .map(res=>res.json());


     }
     guardarAsistencia(alumno):Observable<any>{
let JsonV=JSON.stringify(alumno);            
          
        let headers = new Headers({
              'Content-Type': 'application/json' });
          
        let options = new RequestOptions({ headers: headers }); 
         return this.http.post(this.url+"guardarasistencia",JsonV,options)
          
                         .map(res=>res.json());


     
}
traerListaAsistenciaPorCursoComision(idCurso,idComision):Observable<any>{
                let JsonV=JSON.stringify(idCurso);            
          
        let headers = new Headers({
              'Content-Type': 'application/json' });
          
        let options = new RequestOptions({ headers: headers }); 
          
         return this.http.post(this.url+"traerListaAsistenciaPorCursoComision/"+JSON.stringify(idCurso)+"/"+JSON.stringify(idComision),JsonV,options)
          
                         .map(res=>res.json());
         }

    traerListaPorComision(idCurso,idComision):Observable<any>{
                let JsonV=JSON.stringify(idCurso);            
          
        let headers = new Headers({
              'Content-Type': 'application/json' });
          
        let options = new RequestOptions({ headers: headers }); 
          
         return this.http.post(this.url+"traerListaPorComision/"+JSON.stringify(idCurso)+"/"+JSON.stringify(idComision),JsonV,options)
          
                         .map(res=>res.json());
         }
      CambiarPassword(clave,idUser):Observable<any>{
            
          
        let headers = new Headers({
              'Content-Type': 'application/json' });
          
        let options = new RequestOptions({ headers: headers }); 
         return this.http.post(this.url+"CambiarPassword/"+JSON.stringify(clave)+"/"+JSON.stringify(idUser),options)
          
                         .map(res=>res.json());


     }
     modificarPregunta(id,tipo_respuesta):Observable<any>{
            
          
        let headers = new Headers({
              'Content-Type': 'application/json' });
          
        let options = new RequestOptions({ headers: headers }); 
         return this.http.post(this.url+"ModificarTipoRespuesta/"+JSON.stringify(id)+"/"+JSON.stringify(tipo_respuesta),options)
          
                         .map(res=>res.json());


     }
     modificarNombreCurso(id,nombre):Observable<any>{
            
          
        let headers = new Headers({
              'Content-Type': 'application/json' });
          
        let options = new RequestOptions({ headers: headers }); 
         return this.http.post(this.url+"ModificarNombreCurso/"+JSON.stringify(id)+"/"+JSON.stringify(nombre),options)
          
                         .map(res=>res.json());


     }
     modificarNombreYcomisionesCurso(relacion):Observable<any>{
let JsonV=JSON.stringify(relacion);            
           console.log("jsonv"+JsonV);
        let headers = new Headers({
              'Content-Type': 'application/json' });
          
        let options = new RequestOptions({ headers: headers }); 
         return this.http.post(this.url+"ModificarRelacionCursoCom",JsonV,options)
          
                         .map(res=>res);


     }
         traerdatos():Observable<any>{
  return this.http.get(this.url+"traerdatosAC")
          
                         .map(res=>res);
         }
                  traerCA():Observable<any>{
  return this.http.get(this.url+"traerdatosCA")
          
                         .map(res=>res);
         }
         traerdatosCursos(){
                 return this.http.get(this.url+"traerdatosCA")
          
                         .map(res=>res);
         }
         traerRespuestas():Observable<any>{
         return this.http.get(this.url+"traerRespuestas")
          
                         .map(res=>res.json());
         }
              traerEncuestas():Observable<any>{
         return this.http.get(this.url+"traerEncuestas")
          
                         .map(res=>res.json());
         }
traerRespuestasPorCurso(idCurso):Observable<any>{
                let JsonV=JSON.stringify(idCurso);            
          
        let headers = new Headers({
              'Content-Type': 'application/json' });
          
        let options = new RequestOptions({ headers: headers }); 
          
         return this.http.post(this.url+"traerRespuestasPorCurso/"+JSON.stringify(idCurso),JsonV,options)
          
                         .map(res=>res.json());
         }

buscarRepetido(idUsuario,idCurso):Observable<any>{
                let JsonV=JSON.stringify(idUsuario);            
          
        let headers = new Headers({
              'Content-Type': 'application/json' });
          
        let options = new RequestOptions({ headers: headers }); 
          
         return this.http.post(this.url+"BuscarRepetido/"+JSON.stringify(idUsuario)+"/"+JSON.stringify(idCurso),JsonV,options)
          
                         .map(res=>res.json());
         }
traerRespuestasPorUsuario(idUsuario):Observable<any>{
                let JsonV=JSON.stringify(idUsuario);            
          
        let headers = new Headers({
              'Content-Type': 'application/json' });
          
        let options = new RequestOptions({ headers: headers }); 
          
         return this.http.post(this.url+"traerRespuestasPorUsuario/"+JSON.stringify(idUsuario),JsonV,options)
          
                         .map(res=>res.json());
         }

         guardarRespuesta(respuesta):Observable<any>{
let JsonV=JSON.stringify(respuesta);            
          
        let headers = new Headers({
              'Content-Type': 'application/json' });
          
        let options = new RequestOptions({ headers: headers }); 
         return this.http.post(this.url+"guardarRespuesta",JsonV,options)
          
                         .map(res=>res.json());


     } 
         GuardarEncuesta(encuesta):Observable<any>{
let JsonV=JSON.stringify(encuesta);            
          
        let headers = new Headers({
              'Content-Type': 'application/json' });
          
        let options = new RequestOptions({ headers: headers }); 
         return this.http.post(this.url+"guardarencuesta",JsonV,options)
          
                         .map(res=>res.json());


     } 
     traerEncuestasPorCurso(idCurso):Observable<any>{
                let JsonV=JSON.stringify(idCurso);            
          
        let headers = new Headers({
              'Content-Type': 'application/json' });
          
        let options = new RequestOptions({ headers: headers }); 
          
         return this.http.post(this.url+"traerEncuestasPorCurso/"+JSON.stringify(idCurso),JsonV,options)
          
                         .map(res=>res.json());
         }
     traerIdCursoUsuario(idUser):Observable<any>{
                let JsonV=JSON.stringify(idUser);            
          
        let headers = new Headers({
              'Content-Type': 'application/json' });
          
        let options = new RequestOptions({ headers: headers }); 
          
         return this.http.post(this.url+"traerIdCursoUsuario/"+JSON.stringify(idUser),JsonV,options)
          
                         .map(res=>res.json());
         }
         traerIdComisionesPorCurso(idCurso):Observable<any>{
                let JsonV=JSON.stringify(idCurso);            
          
        let headers = new Headers({
              'Content-Type': 'application/json' });
          
        let options = new RequestOptions({ headers: headers }); 
          
         return this.http.post(this.url+"traeridcomisionesCurso/"+JSON.stringify(idCurso),JsonV,options)
          
                         .map(res=>res.json());
         }
         traerIdUserComision(id):Observable<any>{
               let JsonV=JSON.stringify(id);            
             console.log(JsonV);
        let headers = new Headers({
              'Content-Type': 'application/json' });
          
        let options = new RequestOptions({ headers: headers }); 
         return this.http.post(this.url+"traeridUserC/"+JSON.stringify(id),JsonV,options)
          
                         .map(res=>res.json());
         }
         borrarRelacionAC(id):Observable<any>{
               let JsonV=JSON.stringify(id);            
             console.log(JsonV);
        let headers = new Headers({
              'Content-Type': 'application/json' });
          
        let options = new RequestOptions({ headers: headers }); 
         return this.http.post(this.url+"borrarRelacionAC/"+JSON.stringify(id),JsonV,options)
          
                         .map(res=>res);
         }
         traerListaUsuarios(){
                 return this.http.get(this.url+"traerUsuarios")
          
                         .map(res=>res.json());
         }
         borrarCursoComision(idCursoComision):Observable<any>{
               let JsonV=JSON.stringify(idCursoComision);            
             console.log(JsonV);
        let headers = new Headers({
              'Content-Type': 'application/json' });
          
        let options = new RequestOptions({ headers: headers }); 
         return this.http.post(this.url+"borrarCC/"+JSON.stringify(idCursoComision),JsonV,options)
          
                         .map(res=>res);
         }
 

         borrarCurso(idCurso):Observable<any>{
               let JsonV=JSON.stringify(idCurso);            
             console.log(JsonV);
        let headers = new Headers({
              'Content-Type': 'application/json' });
          
        let options = new RequestOptions({ headers: headers }); 
         return this.http.post(this.url+"borrarC/"+JSON.stringify(idCurso),JsonV,options)
          
                         .map(res=>res);
         }
     borrarEncuesta(idEncuesta):Observable<any>{
               let JsonV=JSON.stringify(idEncuesta);            
             console.log(JsonV);
        let headers = new Headers({
              'Content-Type': 'application/json' });
          
        let options = new RequestOptions({ headers: headers }); 
         return this.http.post(this.url+"borrarEncuesta/"+JSON.stringify(idEncuesta),JsonV,options)
          
                         .map(res=>res);
         }

borrarUsuarioDeAsistencia(idUsuario):Observable<any>{
               let JsonV=JSON.stringify(idUsuario);            
             console.log(JsonV);
        let headers = new Headers({
              'Content-Type': 'application/json' });
          
        let options = new RequestOptions({ headers: headers }); 
         return this.http.post(this.url+"borrarUsuarioDeAsistencia/"+JSON.stringify(idUsuario),JsonV,options)
          
                         .map(res=>res);
         }

                 borrarUsuario(idUsuario):Observable<any>{
               let JsonV=JSON.stringify(idUsuario);            
             console.log(JsonV);
        let headers = new Headers({
              'Content-Type': 'application/json' });
          
        let options = new RequestOptions({ headers: headers }); 
         return this.http.post(this.url+"borrarU/"+JSON.stringify(idUsuario),JsonV,options)
          
                         .map(res=>res);
         }
                  modificarUsuario(id,nombre,apellido,mail):Observable<any>{
                           
      
        let headers = new Headers({
              'Content-Type': 'application/json' });
          
        let options = new RequestOptions({ headers: headers }); 
         return this.http.post(this.url+"modificarU/"+JSON.stringify(id)+"/"+JSON.stringify(nombre)+"/"+JSON.stringify(apellido)+"/"+JSON.stringify(mail),options)
          
                         .map(res=>res);
         }
          altaCom(comision):Observable<any>{
   let JsonV=JSON.stringify(comision);            
          
        let headers = new Headers({
              'Content-Type': 'application/json' });
          
        let options = new RequestOptions({ headers: headers }); 
         return this.http.post(this.url+"altacomision",JsonV,options)
          
                         .map(res=>res.json());


     }
              relacionCursoComisiones(relacion):Observable<any>{
let JsonV=JSON.stringify(relacion);            
          
        let headers = new Headers({
              'Content-Type': 'application/json' });
          
        let options = new RequestOptions({ headers: headers }); 
         return this.http.post(this.url+"relacionCursoCom",JsonV,options)
          
                         .map(res=>res.json());


     }
                   relacionAlumnoCurso(relacion):Observable<any>{
let JsonV=JSON.stringify(relacion);            
          
        let headers = new Headers({
              'Content-Type': 'application/json' });
          
        let options = new RequestOptions({ headers: headers }); 
         return this.http.post(this.url+"relacionAlumnoCurso",JsonV,options)
          
                         .map(res=>res.json());


     }
       relacionAlumnoComision(relacion):Observable<any>{
let JsonV=JSON.stringify(relacion);            
          
        let headers = new Headers({
              'Content-Type': 'application/json' });
          
        let options = new RequestOptions({ headers: headers }); 
         return this.http.post(this.url+"relacionAlumnoComision",JsonV,options)
          
                         .map(res=>res.json());


     }
    signIn(usuario):Observable<any>{
          
     let JsonV=JSON.stringify(usuario);            
          
        let headers = new Headers({
              'Content-Type': 'application/json' });
          
        let options = new RequestOptions({ headers:headers }); 
          
         return this.http.post(this.url+"logearse",JsonV,options)
          
                         .map(res=>res.json());
    }
   registrar(usuario):Observable<any>{
           let JsonV=JSON.stringify(usuario);            
          
        let headers = new Headers({
              'Content-Type': 'application/json' });
          
        let options = new RequestOptions({ headers: headers }); 
          
        return this.http.post(this.url + "registrar", JsonV, options)
                        .map(res => res);

       
   }

  }