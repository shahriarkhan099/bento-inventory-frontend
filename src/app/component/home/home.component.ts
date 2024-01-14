import { Component } from '@angular/core';
import { VendorService } from '../../services/vendor/vendor.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  query: string;
  vendors: any[];
  selectedVendorId: string;
  vendorProducts: any[];

  constructor(private vendorsService: VendorService) {
    this.query = '';
    this.vendors = [];
    this.selectedVendorId = '';
    this.vendorProducts = [];
  }

  searchVendors() {
    if (this.query.trim() === '') {
      this.vendors = [];
      return;
    } else {
      setTimeout(() => {
        this.vendorsService.searchVendorsByNameAndProducts(this.query).subscribe((vendors) => {
          this.vendors = vendors;
          console.log('Vendors:', vendors);
        });
      }, 1000); 
    }
  }


  selectVendor(vendorId: string) {
    this.selectedVendorId = vendorId;
    this.vendorsService.getVendorByIdWithProducts(vendorId).subscribe((vendorDetails) => {
      this.vendorProducts = vendorDetails.products;
      console.log('Vendor details:', vendorDetails);
      console.log('Vendor details:', this.vendorProducts);
    });
  }

  getSelectedProducts(): any[] {
    return this.vendorProducts ? this.vendorProducts.filter(product => product.selected) : [];
  }

  placeOrder() {
    const selectedProducts = this.getSelectedProducts();
    console.log('Selected products:', selectedProducts);
    
    if (!this.selectedVendorId || selectedProducts.length === 0) {
      console.error('Please select a vendor and at least one product before placing an order.');
      return;
    }

    const orderData = {
      vendorId: this.selectedVendorId,
      products: selectedProducts
    };

    console.log(orderData);
    

    this.vendorsService.placeOrder(orderData).subscribe((orderResponse) => {
      console.log('Order placed successfully:', orderResponse);
    });
  }

}
