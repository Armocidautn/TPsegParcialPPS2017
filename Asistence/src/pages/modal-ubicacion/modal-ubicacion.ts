import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';
import {HomePage} from '../../pages/home/home';
import { Geolocation } from '@ionic-native/geolocation';


/**
 * Generated class for the ModalUbicacion page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
declare var google;
 
@IonicPage()
@Component({
  selector: 'page-modal-ubicacion',
  templateUrl: 'modal-ubicacion.html',
})
export class ModalUbicacion {
    lat: number;
    lng: number;

    latUtn: number=-34.662460;
    longUtn:number=-58.364813;
    geo:Geolocation;
  constructor(public navCtrl: NavController , public navParams: NavParams,public geolocation:Geolocation,public viewCtrl: ViewController) {
  this.geo=geolocation;
 this.cargarMapa();
  }

 ionViewDidLoad(){
  }
  cargarMapa(){
    
       this.geo.getCurrentPosition().then((resp) => {
    
    console.info(resp['coords']['latitude']);
    this.lat=resp['coords']['latitude'];
    console.info(resp['coords']['longitude']);
    this.lng=resp['coords']['longitude'];
    this.latUtn=-34.662460;
    this.longUtn=-58.364813;
    }).catch((error) => {
      console.log('Error getting location', error);
    });

    let watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {
      console.info(data);
 
    });
  }

goBack(){
   this.viewCtrl.dismiss();
}
}
