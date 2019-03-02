import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { Router } from '@angular/router';
import { AuthHttp,AuthConfig } from 'angular2-jwt';
import {HttpModule, Http, RequestOptions } from '@angular/http';

import {AbmUsuarios} from'../pages/abm-usuarios/abm-usuarios';
import { ChartsModule } from 'ng2-charts';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { Registro } from '../pages/registro/registro';
import { AbmCursos } from '../pages/abm-cursos/abm-cursos';
import { AbmComisiones } from '../pages/abm-comisiones/abm-comisiones';
import { Comisiones } from '../pages/comisiones/comisiones';
import {AmbUsuariosCursos} from'../pages/amb-usuarios-cursos/amb-usuarios-cursos';
import {AsignarComisiones} from'../pages/asignar-comisiones/asignar-comisiones';
import {AsignarAlumnos} from'../pages/asignar-alumnos/asignar-alumnos';
import {ModalModificar} from'../pages/modal-modificar/modal-modificar';
import {Encuesta} from'../pages/encuesta/encuesta';
import {ModalUbicacion} from'../pages/modal-ubicacion/modal-ubicacion';

import {Asistencia} from'../pages/asistencia/asistencia';
import { DatePipe } from '@angular/common';
import {Estadisticas} from'../pages/estadisticas/estadisticas';
import { ChartModule } from 'angular2-highcharts';
import * as highcharts from 'Highcharts';
import {Settings} from '../providers/settings';

 

import { ListPage } from '../pages/list/list';
import { Login } from '../pages/login/login';
import { PaginaPrincipal } from '../pages/pagina-principal/pagina-principal';
import { AlumnoEncuesta } from '../pages/alumno-encuesta/alumno-encuesta';

import {webService} from'../servicios/ws/webService'
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AgmCoreModule } from '@agm/core';
import { Geolocation } from '@ionic-native/geolocation';
import { Vibration } from '@ionic-native/vibration';
import { File } from '@ionic-native/file';
import {VerAsistencia} from'../pages/ver-asistencia/ver-asistencia';

import {MiPerfil} from'../pages/mi-perfil/mi-perfil';


export function getAuthHttp(http,options:RequestOptions) {
  return new AuthHttp(new AuthConfig({
    headerName: 'Authorization',
    headerPrefix: 'Bearer',
    tokenName: "token",
    noJwtError: true,
    globalHeaders: [{'Accept': 'application/json'}],
    tokenGetter: (() => localStorage.getItem('token')),
  }), http,options);
}
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    Login,
    Asistencia,
    Registro,
    AbmComisiones,
    AbmCursos,
    Comisiones,
    PaginaPrincipal,
    AmbUsuariosCursos,
    AsignarComisiones,
    AsignarAlumnos,
    AbmUsuarios,
    ModalModificar,
    Encuesta,
    AlumnoEncuesta,
    Estadisticas,
    ModalUbicacion,
    VerAsistencia,
    MiPerfil
  ],
  imports: [
    BrowserModule,
    HttpModule,
    BrowserAnimationsModule,
    ChartsModule,
       AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBMBeRrVMrqw5amtV2WCXgBcQB4c_9kU30'
    }),
 
    IonicModule.forRoot(MyApp),ChartModule.forRoot(highcharts)

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    Login,
    Registro,
     AbmComisiones,
    AbmCursos,
    Comisiones,
    Asistencia,
    PaginaPrincipal,
    AmbUsuariosCursos,
    AsignarComisiones,
    AsignarAlumnos,
    AbmUsuarios,
    ModalModificar,
    Encuesta,
    AlumnoEncuesta,
    Estadisticas,
    ModalUbicacion,
    VerAsistencia,
    MiPerfil

  ],
  providers: [
    StatusBar,
    webService,
    SplashScreen,
    DatePipe,
    Geolocation,
    Vibration,
    File,
   {provide: AuthHttp,
    useFactory: getAuthHttp,
    deps: [Http]},
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Settings
  ]
})
export class AppModule {}
