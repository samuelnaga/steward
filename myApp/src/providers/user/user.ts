import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {

  private url: string = "https://jdsam.ovh/rest/empleado/";

  constructor(public http: HttpClient) {
   
  }


  getUsers(){
    return this.http.get(this.url);
  }
}
