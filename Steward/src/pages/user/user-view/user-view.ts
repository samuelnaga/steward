import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UserProfilePage } from '../user-profile/user-profile';
import { UserProvider } from '../../../providers/user/user';

@Component({
  selector: 'page-user-view',
  templateUrl: 'user-view.html',
})
export class UserViewPage {
  public userName: string;
  public user;
  public location;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private _user: UserProvider) {
      this.userName = this.navParams.get('nombre');
      this.user = this.navParams.data;
      this.location = {
        country: "",
        city: "",
        building: "",
        floor: "",
        workplace: ""
      }
  }

  ionViewDidLoad() {
    var country, city, building, floor, workplace;

    this._user.getLocationWorkplace(this.user.id).subscribe(
      res => {
        workplace = res;
        this.location.workplace = workplace.number;
        this._user.getLocationFloor(workplace.id).subscribe(
          res2 => {
            floor = res2;
            this.location.floor = floor.number;
            this._user.getLocationBuilding(floor.id).subscribe(
              res3 => {
                building = res3;
                this.location.building = building.name;
                this._user.getLocationCity(building.id).subscribe(
                  res4 => {
                    city = res4;
                    this.location.city = city.name;
                    this._user.getLocationCountry(city.id).subscribe(
                      res5 => {
                        country = res5;
                        this.location.country = country.name;
                      },
                      error5 => {
                        console.log(error5);
                      }
                    )
                  },
                  error4 => {
                    console.log(error4);
                  }
                )
              },
              error3 =>{
                console.log(error3);
              }
            );
          },
          error2 => {
            console.log(error2);
          }
        );
      },
      error => {
        console.log(error);
      }
    );
  }

  goToProfile() {
    this.navCtrl.push(UserProfilePage, this.user);
  }
}
