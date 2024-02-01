import { Injectable } from '@angular/core';

const ID = "id";

@Injectable({
  providedIn: 'root'
})

export class LocalStorageService {

  constructor() { }

  static setRestaurantId(id: number) {
    window.localStorage.removeItem(ID);
    window.localStorage.setItem(ID, id.toString());
  }

  static getRestaurantId() {
    console.log("getRestaurantId was called", window.localStorage.getItem(ID));
    
    return window.localStorage.getItem(ID);
  }

  static logout() {
    window.localStorage.removeItem(ID);
  }

}
