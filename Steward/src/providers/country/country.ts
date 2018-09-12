import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class CountryProvider {

  private url: string; 
  
  constructor(public http: HttpClient) {
    this.url = "http://localhost:8080/countries";
  }
  getCountries() {
    return this.http.get(this.url);
  }

  getCitiesFromCountry(id) {
    return this.http.get(this.url + "/" + id + "/cities");
  }
}
