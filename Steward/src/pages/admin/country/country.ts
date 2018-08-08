import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CityPage } from '../city/city';
import { UserProfilePage } from '../../user/user-profile/user-profile'
import { UserListPage } from '../../user/user-list/user-list'

@Component({
  selector: 'page-country',
  templateUrl: 'country.html',
})
export class CountryPage {

  public countryNameEdit: Boolean;
  public countryName: String;
  public savedName: boolean;
  private finalCountryName: String;

  public newCountry: Boolean;

  public cities: Array<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.newCountry = this.navParams.data == "" ? true : false;
    this.countryNameEdit = this.newCountry;
    this.countryName = this.newCountry ?  "" : this.navParams.data;
    this.savedName = this.newCountry ? false : true;
    this.finalCountryName = this.countryName;
    this.cities = [];
  }

  ionViewDidLoad() {console.log("recibo en country: " + this.navParams.data);
    if (!this.newCountry) {//cargar ciudades
      this.cities = ["Alicante", "SanJuan", "Valencia", "Madrid", "Barcelona"];
    }
  }

  ionViewWillLeave() {
    console.log("Looks like I'm about to leave :(");
  }

  enableEdition(value) {
    this.countryNameEdit = value;
    if(!value) {
      this.countryName = this.finalCountryName;
    }
  }

  saveName() {
    if (this.countryName != "") {
      this.finalCountryName = this.countryName;
      this.countryNameEdit = false;
      this.savedName = true;
      if (this.newCountry)  {
        this.createCountry();
        this.newCountry = false;
      }
    }
  }

  createCountry() {
    
  }

  goToCity(cityName) {
    this.navCtrl.push(CityPage, cityName);
  }

  goToNewCity() {
    this.navCtrl.push(CityPage, "");
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
