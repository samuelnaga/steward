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
    console.log("ionViewWill");
    this.countries = [];
    this.checked = [];
    this._provider.getCountries()
      .subscribe(response => {
        for (let i in response) {
          this.countries.push(response[i]);
          this.checked.push(false);
        }
        this.countriesBackUp = this.countries;
      },
      error => {
        console.log(error);
        //this.errorMsg = error;
    });
  }

  ionViewDidLoad() {
    console.log("ionViewDid");
    
    this.hidden = true;
  }

  searchCountries(event: any) {
    const val = event.target.value;
    if (val && val.trim() != '') {
      this.countries = this.countriesBackUp.filter((item) => {
        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
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
    //this._provider.deleteCountry(countryID);
    //this.ionViewDidLoad();
  }

  presentConfirm() {
    let message1: string;
    console.log(this.checked);
    var u = 0;
    var hay = 0;
    for(var j = 0; j < this.checked.length; j++) {
      if(this.checked[j]) {
        hay++;
        if(u == 0) {
          message1 = this.countries[j].name;
          u++;
        }
        else
          message1 += ", " + this.countries[j].name; 
      }
    }

    if(hay) {
      let alert = this.alertCtrl.create({
        title: 'Do you really want to delete this countries?',
        message: message1,
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
              var x = 0;
              var again = true;
              while(again) {
                again = false;
                for(var j = 0; j < this.checked.length; j++) {
                  if(this.checked[j]) {
                    //this.deleteCountry(this.countries[j].id);
                    this.countries.splice(j, 1);
                    this.checked.splice(j, 1);
                    again = true;
                  }
                }
              }

              this.deleting = false;
            }
          }
        ]
      });
      alert.present();
    }
    
  }

  deleteCountries(booleano) {
    this.deleting = booleano;

    if(!booleano)
      this.clearChecks();
  }

  clearChecks() {
    for(var i = 0; i < this.checked.length; i++) {
      this.checked[i] = false;
    }
  }
}
