import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage implements OnInit{

  public items;

  constructor(public navCtrl: NavController, private _userProvider: UserProvider){

  }


  ngOnInit(){
    this._userProvider.getUsers().subscribe(res => {
      this.items = res;
    });
  }


  getItems(ev){

  }

  itemSelected(item){

  }
}
