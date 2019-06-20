import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CityPage } from '../city/city';
import { UserProfilePage } from '../../user/user-profile/user-profile'
import { UserListPage } from '../../user/user-list/user-list'
import { CountryProvider } from '../../../providers/country/country';

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
  private country;
  public cities: Array<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private _countryProv: CountryProvider) {
    this.newCountry = this.navParams.data == "" ? true : false;
    this.countryNameEdit = this.newCountry;
    this.countryName = this.newCountry ?  "" : this.navParams.data.name;
    this.savedName = this.newCountry ? false : true;
    this.finalCountryName = this.countryName;
    this.cities = [];
    this.country = this.navParams.data;
  }

  ionViewDidLoad() {
    if (!this.newCountry) {//cargar ciudades
      this._countryProv.getCitiesFromCountry(this.country.id).subscribe(
        res => {
          for (let i in res) {
            this.cities.push(res[i]);
          }
          this.cities.sort(function(obj1, obj2) {
            return obj1.id - obj2.id;
          });
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  ionViewWillLeave() {
    
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
    this._countryProv.createCountry(this.finalCountryName)
      .subscribe(response => {
        console.log(response);
      },
      error => {
        console.log(error);
    });
  }

  goToCity(cityName) {
    let data = {
      city: cityName,
      country: this.country
    }
    this.navCtrl.push(CityPage, data);
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
