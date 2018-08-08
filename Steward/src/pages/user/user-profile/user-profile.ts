import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-user-profile',
  templateUrl: 'user-profile.html',
})
export class UserProfilePage {

  public user;
  public editMode;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.user = this.navParams.data;
    this.editMode = false;
  }

  ionViewDidLoad() {
    
  }

  setEditMode(value: boolean) {
    this.editMode = value;

    if (!value) {
      this.saveProfile();
    }
  }

  saveProfile(){
    console.log("Saved!");
  }
}
