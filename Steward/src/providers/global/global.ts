import { Injectable } from '@angular/core';

@Injectable()
export class GlobalProvider {
  
  private rolSession = 0;
  private user;

  constructor() {
  }

  getRolSession(){
    return this.rolSession;
  }

  getCurrentUser()
  {
    return this.user;
  }

  setRolSession(rol) {
    this.rolSession = rol;
  }

  setCurrentUser(usr)
  {
    this.user = usr;
  }
}
