import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';



@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})
export class UserPage {

  public nombre: string;

  constructor(public navParams: NavParams) {

    this.nombre = this.navParams.get('nombre');
  }

  ionViewDidLoad() {//oninit
    
  }

}
