import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { BuildingPage } from '../building/building';
import { UserProfilePage } from '../../user/user-profile/user-profile'
import { UserListPage } from '../../user/user-list/user-list'
import { CityProvider } from '../../../providers/city/city';

@Component({
  selector: 'page-city',
  templateUrl: 'city.html',
})
export class CityPage {

  public cityNameEdit: Boolean;
  public cityName: String;
  public savedName: Boolean;
  private finalCityName: String;
  public newCity: Boolean;
  private city;
  public buildings: Array<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private _cityP: CityProvider) {
    this.newCity = this.navParams.data == "" ? true : false;
    this.cityNameEdit = this.newCity;
    this.cityName = this.newCity ?  "" : this.navParams.data.name;
    this.savedName = this.newCity ? false : true;
    this.finalCityName = this.cityName;
    this.buildings = [];  
    this.city = this.navParams.data;
  }

  ionViewDidLoad() {console.log("nuevo: " + this.newCity);
    if (this.navParams.data) {
      this._cityP.getBuildings(this.city.id).subscribe(
        res => {
          for (let i in res) {
            this.buildings.push(res[i]);
          }
          this.buildings.sort(function(obj1, obj2) {
            return obj1.id - obj2.id;
          });
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  enableEdition(value) {
    this.cityNameEdit = value;
    if(!value) {
      this.cityName = this.finalCityName;
    }
  }

  saveName() {
    if (this.cityName != "") {
      this.finalCityName = this.cityName;
      this.cityNameEdit = false;
      this.savedName = true;
      if (this.newCity)  {
        this.createCity();
        this.newCity = false;
      }
    }
  }

  createCity() {
    
  }

  goToBuilding(buildingName) {
    this.navCtrl.push(BuildingPage, buildingName);
  }

  goToNewBuilding() {
    this.navCtrl.push(BuildingPage, "");
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
