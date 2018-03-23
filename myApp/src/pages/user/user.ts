import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';



@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})
export class UserPage {

  public nombre: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.nombre = this.navParams.get('nombre');
  }

  ionViewDidLoad() {
    
  }

}
