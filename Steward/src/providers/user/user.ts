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
    return this.http.get(this.url);
  }

  setNewWorkplace(userId: number, qr: number)
  {
    return this.http.post(this.url, {user_id: userId, qrcode: qr}, {headers: {'Content-Type': 'application/json'}});
  }

}
