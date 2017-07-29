import { Component } from '@angular/core';
import { IonicPage, NavController,AlertController , NavParams,ModalController } from 'ionic-angular';
import {Registro} from'../../pages/registro/registro';
import { Observable } from 'rxjs/Observable';
import {webService} from'../../servicios/ws/webService';
import {ModalModificar} from'../../pages/modal-modificar/modal-modificar';
import {Login} from'../../pages/login/login';



/**
 * Generated class for the AbmUsuarios page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-abm-usuarios',
  templateUrl: 'abm-usuarios.html',
})
export class AbmUsuarios {
mostrarListaUsuarios:any;
usuarioMod={
  id:0,
  nombre:'',
  apellido:'',
  mail:''
};
id:number;
Usuarios=[];
  constructor(public navCtrl: NavController , public alertCtrl:AlertController,public modalctrl:ModalController,public ws:webService, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AbmUsuarios');
  }
RegistrarUsuario(){
  this.navCtrl.push(Registro);
}
ListaUsuarios(){
   this.mostrarListaUsuarios=true;
   this.ws.traerListaUsuarios().subscribe(resp=>{
     console.log("LISTA DE USUARIOS"+resp[0])

       this.Usuarios=resp; 
   
   });
      
}
Modificar(usuario){
    let prompt = this.alertCtrl.create({
      title: 'Login',
      message: "Enter a name for this new album you're so keen on adding",
      inputs: [
        { 
          name: 'nombre',
          placeholder:usuario.nombre
          
        },
         { 
          name: 'apellido',
           placeholder:usuario.apellido
        },
         { 
          name: 'mail',
           placeholder:usuario.email
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
             
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
               if(data.nombre==""){
                   data.nombre=usuario.nombre;
               }
                if(data.apellido==""){
                   data.apellido=usuario.apellido;
               }
                if(data.mail==""){
                   data.mail=usuario.email;
               }
                 this.usuarioMod.id=usuario.id_user;
                 this.usuarioMod.nombre=data.nombre;
                   this.usuarioMod.apellido=data.apellido;
                     this.usuarioMod.mail=data.mail;
            
            console.log("NOMBRE"+this.usuarioMod.nombre);
            console.log("APELLIDO"+this.usuarioMod.apellido);
            console.log("MAIL"+this.usuarioMod.mail);
            console.log("ID"+this.usuarioMod.id);
            
      this.ws.modificarUsuario(this.usuarioMod.id,this.usuarioMod.nombre,this.usuarioMod.apellido,this.usuarioMod.mail).subscribe(resp=>{
    console.log(resp);
  this.ListaUsuarios();

     }); 
           
         }
        }
      ]
    });
    prompt.present();
  
}
  logOut(){
    localStorage.setItem('token',null);
    this.navCtrl.setRoot(Login);
  }
Borrar(idBorrar){
console.log(idBorrar);
    this.ws.borrarUsuarioDeAsistencia(idBorrar).subscribe(resp=>{
  console.log(resp);
    });
       this.ws.borrarUsuario(idBorrar).subscribe(resp=>{
     console.log(resp);
 
  this.ListaUsuarios();

      }); 
 
}

}
