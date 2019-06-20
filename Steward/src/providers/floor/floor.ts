import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the FloorProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FloorProvider {

  private url;

  constructor(public http: HttpClient) {
    this.url = "floors/";
  }

  getWorkplaces(id) {
    return this.http.get(this.url + id + "/workplaces");
  }

  setQrCode(id, qr: number)
  {
    return this.http.put("workplaces/qrcode/" + id, {qrcode: qr}, {headers: {'Content-Type': 'application/json'}})
  }

}
