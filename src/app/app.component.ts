import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from './services/localStorage/local-storage.service';
import { VendorService } from './services/vendor/vendor.service';
import { VendorDataService } from './services/Vendor-data/vendor-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isCollapsed = false;
  vendors: any[];

  constructor(private vendorsService: VendorService, private vendorDataService: VendorDataService) { 
    this.vendors = [];
  }

  ngOnInit(): void {
    this.loadAllVendors();
  }

  private loadAllVendors() {
    this.vendorsService.getSuppliers().subscribe({
      next: (data) => {
        this.vendorDataService.updateVendors(data);
      },
      error: (error) => {
        console.error('Error fetching vendor data', error);
      },
    });
  }
  
  logout () {
    localStorage.removeItem('accessToken');
    LocalStorageService.logout();
    window.location.href = 'https://getbento.vercel.app/logout';
  }

}
