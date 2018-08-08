import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FloorPage } from '../floor/floor';
import { UserProfilePage } from '../../user/user-profile/user-profile'
import { UserListPage } from '../../user/user-list/user-list'

@Component({
  selector: 'page-building',
  templateUrl: 'building.html',
})
export class BuildingPage {

  public buildingNameEdit: Boolean;
  public buildingName: String;
  public savedName: Boolean;
  private finalBuildingName: String;
  public newBuilding: Boolean;

  public floors: Array<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.newBuilding = this.navParams.data == "" ? true : false;
    this.buildingNameEdit = this.newBuilding;
    this.buildingName = this.newBuilding ?  "" : this.navParams.data;
    this.savedName = this.newBuilding ? false : true;
    this.finalBuildingName = this.buildingName;
    this.floors = [];  
  }

  ionViewDidLoad() {
    if (this.navParams.data) {
      this.floors = ["Floor 1", "Floor 2", "Floor 3"];
    }
  }

  enableEdition(value) {
    this.buildingNameEdit = value;
    if(!value) {
      this.buildingName = this.finalBuildingName;
    }
  }

  saveName() {
    if (this.buildingName != "") {
      this.finalBuildingName = this.buildingName;
      this.buildingNameEdit = false;
      this.savedName = true;
      if (this.newBuilding)  {
        this.createBuilding();
        this.newBuilding = false;
      }
    }
  }


  createBuilding() {

  }


  newFloor() {
    this.floors.push("Floor " + (this.floors.length + 1).toString());
  }


  createWorkplaces(button) {
    console.log(button);
  }


  goToFloor(floorNumber) {
    this.navCtrl.push(FloorPage, floorNumber);
  }

  goToNewFloor() {
    //this.navCtrl.push(FloorPage);
  }

  back() {
    this.navCtrl.pop();
  }

  goToProfile() {
    this.navCtrl.push(UserProfilePage/*, this.user*/);
  }

  goToUser() {
    this.navCtrl.push(UserListPage);
  }
}
