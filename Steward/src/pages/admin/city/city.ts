import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { BuildingPage } from '../building/building';
import { UserProfilePage } from '../../user/user-profile/user-profile'
import { UserListPage } from '../../user/user-list/user-list'

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

  public buildings: Array<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.newCity = this.navParams.data == "" ? true : false;
    this.cityNameEdit = this.newCity;
    this.cityName = this.newCity ?  "" : this.navParams.data;
    this.savedName = this.newCity ? false : true;
    this.finalCityName = this.cityName;
    this.buildings = [];  
  }

  ionViewDidLoad() {console.log("nuevo: " + this.newCity);
    if (this.navParams.data) {
      this.buildings = ["OscarEspla", "SanJuanPlaya", "Edificio", "Edificio 2", "Edificio 3"];
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
