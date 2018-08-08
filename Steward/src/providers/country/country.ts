import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class CountryProvider {

  private url: string; 
  
  constructor(public http: HttpClient) {
  
    this.url = "http://localhost:8080/countries";
  }
  getCountries() {
    return this.http.get(this.url)
      .catch(this.errorHandler);
  }

  errorHandler(error: HttpErrorResponse) {
    return Observable.throw(error.message || 'Server error');
  }
}
