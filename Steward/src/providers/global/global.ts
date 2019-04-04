import { Injectable } from '@angular/core';

@Injectable()
export class GlobalProvider {
  
  private rolSession = 0;

  constructor() {
  }

  getRolSession(){
    return this.rolSession;
  }

  setRolSession(rol) {
    this.rolSession = rol;
  }
}
