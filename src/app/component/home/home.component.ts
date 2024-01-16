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
  cartItems: any[] = [];

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
        this.vendorProducts = [];
        this.selectedVendorId = '';
        this.vendorsService.searchVendorsByNameAndProducts(this.query).subscribe((vendors) => {
          this.vendors = vendors;
          console.log('Vendors:', vendors);
        });
      }, 1000); 
    }
  }

  selectVendor(vendorId: string) {
    this.vendors = [];
    this.selectedVendorId = vendorId;
    this.vendorsService.getVendorByIdWithProducts(vendorId).subscribe((vendorDetails) => {
      this.vendorProducts = vendorDetails.products;
      console.log('Vendor details:', vendorDetails);
      console.log('Vendor details:', this.vendorProducts);
    });
  }

  getSelectedProducts(): any[] {
    this.cartItems = this.vendorProducts ? this.vendorProducts.filter(product => product.selected) : [];
    return this.cartItems;
  }

  calculateTotalPrice(): number {
    return this.cartItems.reduce((total, product) => total + (product.price * product.qty), 0);
  }

  incrementQuantity(product: any): void {
    product.qty++;
  }

  decrementQuantity(product: any): void {
    product.qty--;
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

  visible = false;
  
  onAdd(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }

  submitForm() {
    // this.createUpdateIngredient();
    this.placeOrder();
    this.visible = false;
  }

}
