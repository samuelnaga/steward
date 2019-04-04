import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

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
  public hidden;
  public deleting;
  public checked;

  public user = {
    nombre: "Nombre completo",
    nick: "Nombre de Usuario"
  }; //yo, user actual de la sesion

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              private _provider: CountryProvider,
              private alertCtrl: AlertController,
              private viewCtrl: ViewController) {
    //this.countries = ["Spain", "France", "Portugal", "England", "Belgium"];
    this.countries = [];
    this.countriesBackUp = [];
    this.deleting = false;
    this.checked = [];
  }

  ionViewWillEnter() {
    this.viewCtrl.showBackButton(false);
    this.hidden = false;
  }

  ionViewDidLoad() {
    this._provider.getCountries()
      .subscribe(response => {
        for (let i in response) {
          console.log(response[i].name);
          this.countries.push(response[i]);
          this.checked.push(false);
        }
        this.countriesBackUp = this.countries;
      },
      error => {
        console.log(error);
        //this.errorMsg = error;
    });
    this.hidden = true;
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

  deleteCheck(i) {
    if(this.checked[i])
      this.checked[i] = false;
    else
      this.checked[i] = true;
  }

  goToCountry(countryName, i) {
    if(!this.deleting){
      this.navCtrl.push(CountryPage, countryName);
    }
    else {
      this.deleteCheck(i);
    }
  }

  goToNewCountry() {
    this.navCtrl.push(CountryPage, "");
  }

  deleteCountry(countryID) {
    // this._provider.deleteCountry(countryID).subscribe(
    //   response => {
    //     this.ionViewDidLoad();
    //   },
    //   error => {
    //     console.log(error);
    //   });
    
  }

  presentConfirm(country) {
    let alert = this.alertCtrl.create({
      title: 'Deleting ' + country.name,
      message: 'Do you want to delete this country?',
      buttons: [  
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Delete',
          handler: () => {
            console.log('Deleting ' + country.name);
            this.deleteCountry(country.id);
          }
        }
      ]
    });
    alert.present();
  }

  deleteCountries(booleano) {
    this.deleting = booleano;
  }
}
