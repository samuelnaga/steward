import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { GlobalProvider } from '../../../providers/global/global';
import { LoginPage } from '../../../pages/login/login'
import { UserProvider } from '../../../providers/user/user';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

@Component({
  selector: 'page-user-profile',
  templateUrl: 'user-profile.html',
})
export class UserProfilePage {

  public user;
  public editMode;
  public location;
  public fake = false;

  public count = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    private _global: GlobalProvider, private _user: UserProvider, 
    private barcodeScanner: BarcodeScanner,
    private alertCtrl: AlertController) {
    this.user = _global.getCurrentUser();
    this.editMode = false;
    this.location = {
      country: "",
      city: "",
      building: "",
      floor: "",
      workplace: "",
      created: false
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
                        this.location.created = true;
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
    // const myModalOptions: ModalOptions = {
    //   showBackdrop: false,
    //   enableBackdropDismiss: false
    // };

    // const myData = {
    //   message: "Do you really want to log out?"
    // };
    // const myModal: Modal = this.modal.create('ModalPage', {data: myData}, myModalOptions);

    // myModal.present();

    // myModal.onWillDismiss((data) => {
    //   if(data.action == 1) {
    //     this.logOut();
    //   }
    // });
    let alert = this.alertCtrl.create({
      title: 'You are about to log out!',
      message: "Do you really want to log out?" ,
      buttons: [  
        {
          text: 'Cancel',
          role: 'Cancel',
          handler: () => {
            console.log('cancel clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            this.logOut();
          }
        }
      ]
    });
    alert.present();
  }

  logOut() {
    this._global.setRolSession(0);
    this.navCtrl.push(LoginPage);
  }



  presentAlert(number) {
    this.count = true;
    let alert = this.alertCtrl.create({
      title: 'New workplace',
      message: "Workplace nº " + number + " assigned successfully",
      buttons: [  
        {
          text: 'OK',
          role: 'ok',
          handler: () => {
            console.log('ok clicked');
          }
        }
      ]
    });
    
    alert.present();
    
  }

  scanner() {
    console.log(this.user);
    if(this.location.created) {
        this.presentWarning();
    }
    else {
      this.scanning(false);
    }

  }

  scanning(b)
  {
    this.barcodeScanner.scan().then((barcodeData) => {
      if(!barcodeData.cancelled)
      {console.log("registrando qr: " + barcodeData.text);
        console.log("para el user: " + this.user.id);
        if(b == false)
          this._user.setNewWorkplace(this.user.id, parseInt(barcodeData.text)).subscribe(
            res => {
              this.ionViewDidLoad();
              console.log(res);
              this.presentAlert(res);
            },
            error => {
              console.log(error);
            }
          );
        else{
          this.presentAlert(1);
          this.fake = true;
        }
        
      }
      else console.log("scan canceled");
     }, (err) => {
         console.log('Error', err);
     });
  }

  
  presentWarning() {
    let alert = this.alertCtrl.create({
      title: 'You already have assigned the workplace ' + this.location.workplace.number,
      message: "Would you like to be assigned in a new one?" ,
      buttons: [  
        {
          text: 'Cancel',
          role: 'Cancel',
          handler: () => {
            console.log('cancel clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            this.scanning(true);
          }
        }
      ]
    });
    alert.present();
  }
}
