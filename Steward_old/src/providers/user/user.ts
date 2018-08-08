import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable()
export class UserProvider {

  private url: string; 

  constructor(public http: HttpClient) {
    this.url = "https://jdsam.ovh/rest/empleado/";
  }


  getUsers(){
    return this.http.get(this.url);
  }
}
