import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import {  UserListPage } from '../user/user-list/user-list';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public navCtrl: NavController/*, public navParams: NavParams*/) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login() {
    this.navCtrl.push(UserListPage);
  }
}
