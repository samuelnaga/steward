import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FloorPage } from '../floor/floor';
import { UserProfilePage } from '../../user/user-profile/user-profile'
import { UserListPage } from '../../user/user-list/user-list'
import { BuildingProvider } from '../../../providers/building/building';

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
  private building;
  public city;
  public country;
  public floors: Array<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private _buildP: BuildingProvider) {
    this.newBuilding = this.navParams.data.building == "" ? true : false;
    this.buildingNameEdit = this.newBuilding;
    this.buildingName = this.newBuilding ?  "" : this.navParams.data.building.name;
    this.savedName = this.newBuilding ? false : true;
    this.finalBuildingName = this.buildingName;
    this.floors = [];  
    this.building = this.navParams.data.building;
    this.country = this.navParams.data.country;
    this.city = this.navParams.data.city;
  }

  ionViewDidLoad() {
    if (this.navParams.data) {
      this._buildP.getFloors(this.building.id).subscribe(
        res => {console.log(res);
          for (let i in res) {
            this.floors.push(res[i]);
          }
          this.floors.sort(function(obj1, obj2) {
            return obj1.id - obj2.id;
          });
        },
        error => {
          console.log(error);
        }
      );
      //this.floors = ["Floor 1", "Floor 2", "Floor 3"];
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
    let newf = {
      number: this.floors.length + 1
    }
    this.floors.push(newf);
  }


  createWorkplaces(button) {
    console.log(button);
  }


  goToFloor(floor) {
    let data = {
      floor: floor,
      building: this.building,
      city: this.city,
      country: this.country
    };
    this.navCtrl.push(FloorPage, data);
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
