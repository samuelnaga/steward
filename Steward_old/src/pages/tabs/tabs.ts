import { Component } from '@angular/core';

import { UserListPage } from '../userList/userList';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = UserListPage;
  tab3Root = ContactPage;

  constructor() {

  }
}
