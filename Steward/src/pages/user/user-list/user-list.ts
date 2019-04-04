import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { UserProvider } from '../../../providers/user/user';

import { UserViewPage } from '../user-view/user-view';
import { UserProfilePage } from '../user-profile/user-profile';
import { CountriesPage } from '../../admin/countries/countries';
import { GlobalProvider } from '../../../providers/global/global';

@Component({
  selector: 'page-user-list',
  templateUrl: 'user-list.html'
})
export class UserListPage {

  public users;
  public rolNow = 0;
  private currentUser;
  public hidden;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController,
              public _userProvider: UserProvider,
              private _globalP: GlobalProvider) {

    this.currentUser = navParams.data;
    this.users = [];
  }

  ionViewDidLoad() {
    this.rolNow = this._globalP.getRolSession();
    this.getUsers();
    this.hidden = true;
  }

  ionViewWillEnter() {
    this.viewCtrl.showBackButton(false);
    this.hidden = false;
  }

  getUsers() {
    //this.users = this._userProvider.getUsers();
    this._userProvider.getUsers().subscribe(
      res => {
        this.users = res;
      },
      error => {
        console.log(error);
      }
    );
  }

  searchUsers(event: any) {
    const val = event.target.value;
    
    if (val && val.trim() != '') {
      this.users = this.users.filter((user) => {
        return (user.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
    }
    else {
      this.getUsers();
    }
  }

  goToUser(user) {
    this.navCtrl.push(UserViewPage, user);
  }

  goToProfile() {
    this.navCtrl.push(UserProfilePage, this.currentUser);
  }

  goToAdmin() {
    this.navCtrl.push(CountriesPage);
  }
}
