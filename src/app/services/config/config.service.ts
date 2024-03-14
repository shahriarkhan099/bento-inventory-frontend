import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private inventoryApiUrl = environment.inventoryApiUrl;

  private vendorApiUrl = environment.vendorApiUrl;

  constructor() {
    if (!environment.production) {
      console.log('Development mode');
    } else {
      console.log('Production mode');
    }
  }

  getInventoryApiUrl(): string {
    return this.inventoryApiUrl;
  }

  getVendorApiUrl(): string {
    return this.vendorApiUrl;
  }

}
