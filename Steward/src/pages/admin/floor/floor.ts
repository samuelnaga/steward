import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private barcodeScanner: BarcodeScanner,
              private _floorP: FloorProvider) {
    this.floorNameEdit = false;
    this.floorName = "Floor " + this.navParams.data.number;
    this.savedName = true;
    this.finalFloorName = this.floorName;
    this.workplaces = [];  
    this.floor = this.navParams.data;
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
    this.workplaces.push("Workplace " + (this.workplaces.length + 1).toString());
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

  scanner() {
    this.barcodeScanner.scan().then((barcodeData) => {
      console.log('Barcode data', barcodeData);
     }, (err) => {
         console.log('Error', err);
     });
    // this.qrScanner.prepare()
    //   .then((status: QRScannerStatus) => {
    //     if (status.authorized) {
    //       // camera permission was granted

    //       // start scanning
    //       let scanSub = this.qrScanner.scan().subscribe((text: string) => {
    //         console.log('Scanned something', text);

    //         this.qrScanner.hide(); // hide camera preview
    //         scanSub.unsubscribe(); // stop scanning
    //       });

    //     } else if (status.denied) {
    //       this._toast.show('Camera permission was permanently denied.');
    //       // camera permission was permanently denied
    //       // you must use QRScanner.openSettings() method to guide the user to the settings page
    //       // then they can grant the permission from there
    //     } else {
    //       this._toast.show('Permission was denied, try it later.');
    //       // permission was denied, but not permanently. You can ask for permission again at a later time.
    //     }
    //   })
    //   .catch((e: any) => this._toast.show('Error: '+ e));
  }

  
}
