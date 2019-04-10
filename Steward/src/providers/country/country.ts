import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';   

@Injectable()
export class CountryProvider {

  private url: string; 
  
  constructor(public http: HttpClient) {
    this.url = "countries/";
  }
  getCountries() {console.log("estoy accediendo a url: " + this.url);
    return this.http.get(this.url);
  } 

  getCitiesFromCountry(id) {
    return this.http.get(this.url + id + "/cities");
  }

  deleteCountry(id) {
    this.http.delete(this.url + id);
  }

  createCountry(countryname: String) {
    return this.http.post(this.url, {name: countryname}, {headers: {'Content-Type': 'application/json'}});
  }
}
