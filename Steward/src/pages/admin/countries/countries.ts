import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { UserProfilePage } from '../../user/user-profile/user-profile'
import { CountryPage } from '../country/country';
import { UserListPage } from '../../user/user-list/user-list'
import { CountryProvider } from '../../../providers/country/country';

@Component({
  selector: 'page-countries',
  templateUrl: 'countries.html'
})
export class CountriesPage {

  public countries;// = ["Spain", "France", "Portugal", "England", "Belgium"];
  private countriesBackUp;

  public user = {
    nombre: "Nombre completo",
    nick: "Nombre de Usuario"
  }; //yo, user actual de la sesion

  constructor(public navCtrl: NavController, public navParams: NavParams, private _provider: CountryProvider) {
    //this.countries = ["Spain", "France", "Portugal", "England", "Belgium"];
    this.countries = [];
    this.countriesBackUp = [];
  }

  ionViewDidLoad() {
    this._provider.getCountries()
      .subscribe(response => {
        for (let i in response) {
          console.log(response[i].name);
          this.countries.push(response[i].name); 
        }
        this.countriesBackUp = this.countries;
      },
      error => {
        console.log(error);
        //this.errorMsg = error;
      });
  }

  searchCountries(event: any) {
    const val = event.target.value;
    if (val && val.trim() != '') {
      this.countries = this.countriesBackUp.filter((item) => {
        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
    }
    else {
      this.countries = this.countriesBackUp;
    }
  }

  goToProfile() {
    this.navCtrl.push(UserProfilePage, this.user);
  }

  goToUser() {
    this.navCtrl.push(UserListPage);
  }

  goToCountry(countryName) {
    this.navCtrl.push(CountryPage, countryName);
  }

  goToNewCountry() {
    this.navCtrl.push(CountryPage, "");
  }


}
