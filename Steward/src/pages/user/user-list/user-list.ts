import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UserProvider } from '../../../providers/user/user';

import { UserViewPage } from '../user-view/user-view';
import { UserProfilePage } from '../user-profile/user-profile';
import { CountriesPage } from '../../admin/countries/countries';

@Component({
  selector: 'page-user-list',
  templateUrl: 'user-list.html'
})
export class UserListPage {

  public users;

  public user = {
    nombre: "Nombre completo",
    nick: "Nombre de Usuario"
  }; //yo, user actual de la sesion

  constructor(public navCtrl: NavController,
              //public navParams: NavParams,
              public _userProvider: UserProvider) {

    this.users = [];
  }

  ionViewDidLoad() {
    this.getUsers();
  }

  getUsers() {
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
        return (user.nombre.toLowerCase().indexOf(val.toLowerCase()) > -1);
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
    this.navCtrl.push(UserProfilePage, this.user);
  }

  goToAdmin() {
    this.navCtrl.push(CountriesPage);
  }
}
