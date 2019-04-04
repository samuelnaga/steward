import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html',
})
export class ModalPage {

  public message;

  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController) {
    this.message = "";
  }

  ionViewWillLoad() {
    const data = this.navParams.get('data');
    this.message = data.message;
  }

  closeModal(act) {
    const data = {
      action: act
    }
    this.viewCtrl.dismiss(data);
  }

}
