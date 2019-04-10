import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { UserProfilePage } from '../../user/user-profile/user-profile'
import { UserListPage } from '../../user/user-list/user-list'

@IonicPage()
@Component({
  selector: 'page-country-modal',
  templateUrl: 'country-modal.html',
})
export class CountryModalPage {

  public user = {
    nombre: "Nombre completo",
    nick: "Nombre de Usuario"
  }; //yo, user actual de la sesion

  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController) {
  }

  ionViewWillLoad() {
    const data = this.navParams.get('data');
    //this.message = data.message;
  }

  closeModal(act) {
    const data = {
      action: act
    }
    this.viewCtrl.dismiss(data);
  }

  goToProfile() {
    this.navCtrl.push(UserProfilePage, this.user);
  }

  goToUser() {
    this.navCtrl.push(UserListPage);
  }
}
