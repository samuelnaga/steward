import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { UserPage } from '../../pages/user/user';


@Component({
  selector: 'page-userList',
  templateUrl: 'userList.html'
})
export class UserListPage{

  public items;

  constructor(public navCtrl: NavController, private _userProvider: UserProvider){

  }

  goToOtherPage(item) {
    //push another page onto the history stack
    //causing the nav controller to animate the new page in
    this.navCtrl.push(UserPage, item);
  }

  ionViewDidLoad(){
    this._userProvider.getUsers().subscribe(res => {
      this.items = res;
    });
  }


  getItems(ev){

  }


}
