import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UserProfilePage } from '../user-profile/user-profile';

@Component({
  selector: 'page-user-view',
  templateUrl: 'user-view.html',
})
export class UserViewPage {
  public userName: string;
  public user;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams) {
      this.userName = this.navParams.get('nombre');
      this.user = this.navParams.data;
  }

  ionViewDidLoad() {
    console.log(this.user);
  }

  goToProfile() {
    this.navCtrl.push(UserProfilePage, this.user);
  }
}
