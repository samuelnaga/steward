import { Component } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';

import {  UserListPage } from '../user/user-list/user-list';
import { ToastController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { GlobalProvider } from '../../providers/global/global';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  private user : FormGroup;
  private loggedUser;

  constructor(public navCtrl: NavController, public _userProvider: UserProvider, private viewCtrl: ViewController,
              private formBuilder: FormBuilder,
              private toastCtrl: ToastController,
              private _globalP: GlobalProvider) {
    this.user = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ionViewWillEnter() {
    this.viewCtrl.showBackButton(false);
  }

  login() {
    this._userProvider.login(this.user.value.username, this.user.value.password).subscribe(res => {
      if(res) {
        this.loggedUser = res;
        this._globalP.setRolSession(this.loggedUser.rol);
        this.navCtrl.push(UserListPage, this.loggedUser);
      }
      else {
        let toast = this.toastCtrl.create({
          message: "Invalid Login or Password",
          duration: 3000,
          position: 'bottom'
        });
        toast.present();
      }
      
    },
    error => {
      console.log(error);
    });
  }
}
