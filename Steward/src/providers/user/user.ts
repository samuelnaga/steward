import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class UserProvider {

  private url: string; 

  constructor(public http: HttpClient) {
    this.url = "users/";
  }

  login(usrname: string, pass: string) {
    return this.http.get(this.url + "login?username=" + usrname + "&password=" + pass);
  }

  getLocationWorkplace(userId) { 
    return this.http.get(this.url + userId + "/workplace");
  }

  getLocationFloor(workplaceId) { 
    return this.http.get("workplaces/" + workplaceId + "/floor");
  }

  getLocationBuilding(floorId) { 
    return this.http.get("floors/" + floorId + "/building");
  }

  getLocationCity(buildingId) { 
    return this.http.get("buildings/" + buildingId + "/city");
  }

  getLocationCountry(cityId) { 
    return this.http.get("cities/" + cityId + "/country");
  }

  getUsers(){
    // let headers: Headers = new Headers({ 'Content-Type': 'application/json' });
    // headers.append('Authorization', 'Basic ' + btoa("user:password") );
    // headers.append('Access-Control-Allow-Origin' , '*');
    // let usersList  = [
    //   {
    //     name: "Samuel Navarro Garcia",
    //     username: "samuelnaga",
    //     password: "pass1"
    //   },
    //   {
    //     name: "Pablo Garcia Garcia",
    //     username: "pablo123",
    //     password: "pass2"
    //   },
    //   {
    //     name: "Marta Zamora Garcia",
    //     username: "marta123",
    //     password: "pass3"
    //   },
    //   {
    //     name: "Jesus Luna Martinez",
    //     username: "jesus123",
    //     password: "pass4"
    //   },
    //   {
    //     name: "Jorge Perez Garcia",
    //     username: "jorge123",
    //     password: "pass5"
    //   }
    // ]
    //return usersList;
    return this.http.get(this.url);
  }

}
