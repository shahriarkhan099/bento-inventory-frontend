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
    return window.localStorage.getItem(ID);
  }

  static logout() {
    window.localStorage.removeItem(ID);
  }

}
