import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class CityProvider {

  private _url: string;

  constructor(public http: HttpClient) {
    this._url = "cities/";
  }

  getBuildings(id) {
    return this.http.get(this._url + id + "/buildings");
  }
}
