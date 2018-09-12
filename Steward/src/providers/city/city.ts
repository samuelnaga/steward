import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class CityProvider {

  private _url: string;

  constructor(public http: HttpClient) {
    
  }

}
