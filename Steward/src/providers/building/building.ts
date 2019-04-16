import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable()
export class BuildingProvider {

  private url;

  constructor(public http: HttpClient) {
    this.url = "buildings/";
  }

  getFloors(id) {
    return this.http.get(this.url + id + "/floors");
  }
}
