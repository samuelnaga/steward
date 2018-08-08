
import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';


@Injectable()
export class ToastServiceProvider {

  constructor(private toastCtrl: ToastController) { }


  show(Message: string) {
    let toast = this.toastCtrl.create({
      message: Message,
      duration: 3000,
      position: 'top'
    });

    // toast.onDidDismiss(() => {
    //   console.log('Dismissed toast');
    // });
    toast.present();
  }


}
