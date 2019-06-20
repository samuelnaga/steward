import { Component } from '@angular/core';
import { NavController, NavParams, AlertController  } from 'ionic-angular';
//import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';
import { UserProfilePage } from '../../user/user-profile/user-profile'
import { UserListPage } from '../../user/user-list/user-list'
//import { ToastServiceProvider } from '../../../providers/toast-service/toast-service';
import { FloorProvider } from '../../../providers/floor/floor';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

@Component({
  selector: 'page-floor',
  templateUrl: 'floor.html',
})
export class FloorPage {

  public floorNameEdit: Boolean;
  public floorName: String;
  public savedName: Boolean;
  private finalFloorName: String;
  private floor;
  public workplaces: Array<any>;
  public country;
  public city;
  public building;
  public toADD;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private barcodeScanner: BarcodeScanner,
              private _floorP: FloorProvider,
              private alertCtrl: AlertController) {
    this.floorNameEdit = false;
    this.floorName = "Floor " + this.navParams.data.floor.number;
    this.savedName = true;
    this.finalFloorName = this.floorName;
    this.workplaces = [];  
    this.floor = this.navParams.data.floor;
    this.country = this.navParams.data.country;
    this.city = this.navParams.data.city;
    this.building = this.navParams.data.building;
    this.toADD = 1;
  }

  ionViewDidLoad() {
   this._floorP.getWorkplaces(this.floor.id).subscribe(
    res => {
      for (let i in res) {
        this.workplaces.push(res[i]);
      }
      this.workplaces.sort(function(obj1, obj2) {
        return obj1.id - obj2.id;
      });
    },
    error => {
      console.log(error);
    }
   );
  }

  createWorkplace() {
    for(var i = 0; i < this.toADD; i++) {
      let newWork = {
        number: this.workplaces.length + 1
      }
      this.workplaces.push(newWork);
    }
  }

  enableEdition(value) {
    this.floorNameEdit = value;
    if(!value) {
      this.floorName = this.finalFloorName;
    }
  }

  saveName() {
    if (this.floorName != "") {
      this.finalFloorName = this.floorName;
      this.floorNameEdit = false;
      this.savedName = true;
      this.updateFloorName();
    }
  }

  updateFloorName() {

  }

  goToProfile() {
    this.navCtrl.push(UserProfilePage/*, this.user*/);
  }

  goToUser() {
    this.navCtrl.push(UserListPage);
  }

  presentAlert(number) {
    let alert = this.alertCtrl.create({
      title: 'QR Code Registered',
      message: "Saved in workplace nº " + number ,
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

  scanner(workplace) {
    console.log(workplace);


    if(workplace.qrcode) {
        this.presentWarning(workplace);
    }
    else {
      this.scanning(workplace);
    }

  }

  scanning(workplace)
  {
    this.barcodeScanner.scan().then((barcodeData) => {
      console.log('Barcode data', barcodeData);
      console.log(barcodeData.text)
      console.log(workplace.id)
      if(!barcodeData.cancelled)
      {
        this._floorP.setQrCode(workplace.id, parseInt(barcodeData.text)).subscribe(
          res => {
            console.log(res);
            this.presentAlert(workplace.number);
            workplace.qrcode = barcodeData.text;
          },
          error => {
            console.log(error);
          }
        );
      }
      else console.log("scan canceled");
     }, (err) => {
         console.log('Error', err);
     });
  }

  
  presentWarning(workplace) {
    let alert = this.alertCtrl.create({
      title: 'This workplace has a QR code registered yet',
      message: "¿Do you really want to overwrite it?" ,
      buttons: [  
        {
          text: 'Cancel',
          role: 'Cancel',
          handler: () => {
            console.log('ok clicked');
          }
        },
        {
          text: 'Overwrite',
          handler: () => {
            this.scanning(workplace);
          }
        }
      ]
    });
    alert.present();
  }

}
