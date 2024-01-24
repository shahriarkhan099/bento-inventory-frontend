import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  // private inventoryApiUrl = 'http://localhost:4000'; // Local Api
  private inventoryApiUrl = 'https://inventory-server-klzl.onrender.com'; // Deployed Api

  // private vendorApiUrl = 'http://localhost:5000'; // Local Api
  private vendorApiUrl = 'https://bento-vendor.onrender.com'; // Deployed Api

  constructor() { }

  getInventoryApiUrl(): string {
    return this.inventoryApiUrl;
  }

  getVendorApiUrl(): string {
    return this.vendorApiUrl;
  }

}
