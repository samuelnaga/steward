import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { UserProfilePage } from '../../user/user-profile/user-profile'
import { CountryPage } from '../country/country';
import { CountryProvider } from '../../../providers/country/country';

@Component({
  selector: 'page-countries',
  templateUrl: 'countries.html'
})
export class CountriesPage {

  public countries: Array<any>;// = ["Spain", "France", "Portugal", "England", "Belgium"];
  public user = {
    nombre: "Nombre completo",
    nick: "Nombre de Usuario"
  }; //yo, user actual de la sesion

  constructor(public navCtrl: NavController, public navParams: NavParams, private _provider: CountryProvider) {
    this.countries = ["Spain", "France", "Portugal", "England", "Belgium"];
  }

  ionViewDidLoad() {
    // this._provider.getCountries()
    //   .subscribe(response => {
    //     this.countries = response;
    //   },
    //   error => {console.log(error);
    //     //this.errorMsg = error;
    //   });
  }

  searchCountries(event: any) {
   // const val = event.target.value;
    
  }

  goToProfile() {
    this.navCtrl.push(UserProfilePage, this.user);
  }

  goToCountry(countryName) {
    this.navCtrl.push(CountryPage, countryName);
  }

  goToNewCountry() {
    this.navCtrl.push(CountryPage, "");
  }


}
