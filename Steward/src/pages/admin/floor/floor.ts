import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UserProfilePage } from '../../user/user-profile/user-profile'
import { UserListPage } from '../../user/user-list/user-list'

@Component({
  selector: 'page-floor',
  templateUrl: 'floor.html',
})
export class FloorPage {

  public floorNameEdit: Boolean;
  public floorName: String;
  public savedName: Boolean;
  private finalFloorName: String;

  public workplaces: Array<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.floorNameEdit = false;
    this.floorName = "Floor " + this.navParams.data;
    this.savedName = true;
    this.finalFloorName = this.floorName;
    this.workplaces = [];  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FloorPage');
  }

  enableEdition(value) {
    this.floorNameEdit = value;
    if(!value) {
      this.floorName = this.finalFloorName;
    }
  }

  saveName() {
    if (this.floorName != "") {
      this.finalFloorName = this.floorName;
      this.floorNameEdit = false;
      this.savedName = true;
      this.updateFloorName();
    }
  }

  updateFloorName() {

  }

  goToProfile() {
    this.navCtrl.push(UserProfilePage/*, this.user*/);
  }

  goToUser() {
    this.navCtrl.push(UserListPage);
  }
}
