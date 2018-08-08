import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CityPage } from '../city/city';


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

  enableEdition(value) {
    this.countryNameEdit = value;
    if(!value) {
      this.countryName = this.finalCountryName;
    }
  }

  saveName() {
    this.finalCountryName = this.countryName;
    this.countryNameEdit = false;
    this.savedName = true;
  }


  goToCity(cityName) {
    this.navCtrl.push(CityPage, cityName);
  }

  goToNewCity() {
    this.navCtrl.push(CityPage, "");
  }

}
