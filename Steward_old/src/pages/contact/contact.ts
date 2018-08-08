import { Component } from '@angular/core';   
import { ToastController } from 'ionic-angular';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  public username = "Samuel";

  constructor(public toastCtrl: ToastController) {}

 
  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Floor saved successfully',
      duration: 1500,
      position: 'middle'
    });
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
    toast.present();
  }

}
