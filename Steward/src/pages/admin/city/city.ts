import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-city',
  templateUrl: 'city.html',
})
export class CityPage {

  public cityNameEdit: Boolean;
  public cityName: String;
  private finalCityName: String;

  public buildings: Array<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.cityNameEdit = this.navParams.data ? false : true;
    this.cityName = this.navParams.data ? this.navParams.data : "";
    this.finalCityName = this.cityName;
    this.buildings = [];  
  }

  ionViewDidLoad() {console.log("recibo " + this.navParams.data);
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
    this.finalCityName = this.cityName;
    this.cityNameEdit = false;
  }

  goToBuilding(buildingName) {
    //this.navCtrl.push(CityPage, cityName);
  }

  goToNewBuilding() {
    //this.navCtrl.push(CityPage);
  }
}
