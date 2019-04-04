import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, Modal, ModalOptions } from 'ionic-angular';
import { GlobalProvider } from '../../../providers/global/global';
import { LoginPage } from '../../../pages/login/login'
import { UserProvider } from '../../../providers/user/user';

@Component({
  selector: 'page-user-profile',
  templateUrl: 'user-profile.html',
})
export class UserProfilePage {

  public user;
  public editMode;
  public location;

  constructor(public navCtrl: NavController, public navParams: NavParams, private _global: GlobalProvider, private _user: UserProvider, private modal: ModalController) {
    this.user = this.navParams.data;
    this.editMode = false;
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

  setEditMode(value: boolean) {
    console.log(this.location);
    this.editMode = value;

    if (!value) {
      this.saveProfile();
    }
  }

  saveProfile(){
    console.log("Saved!");
  }

  openModal() {
    // showBackdrop?: boolean;
    // enableBackdropDismiss?: boolean;
    // enterAnimation?: string;
    // leaveAnimation?: string;
    // cssClass?: string;
    const myModalOptions: ModalOptions = {
      showBackdrop: false,
      enableBackdropDismiss: false
    };

    const myData = {
      message: "Do you really want to log out?"
    };
    const myModal: Modal = this.modal.create('ModalPage', {data: myData}, myModalOptions);

    myModal.present();

    myModal.onWillDismiss((data) => {
      if(data.action == 1) {
        this.logOut();
      }
    });
  }

  logOut() {
    this._global.setRolSession(0);
    this.navCtrl.push(LoginPage);
  }
}
