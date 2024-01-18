import { Component, OnInit } from '@angular/core';
import { VendorService } from '../../services/vendor/vendor.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-place-orders',
  templateUrl: './place-orders.component.html',
  styleUrl: './place-orders.component.css',
})
export class PlaceOrdersComponent implements OnInit {
  searchTerm: string;
  vendors: any[];
  selectedVendorId: string;
  selectedVendor: any;
  vendorProducts: any[];
  cartItems: any[];

  constructor(private vendorsService: VendorService, private message: NzMessageService) {
    this.searchTerm = '';
    this.vendors = [];
    this.selectedVendorId = '';
    this.selectedVendor = '';
    this.vendorProducts = [];
    this.cartItems = []
  }

  ngOnInit() {}

  searchVendors() {
    if (this.searchTerm.trim() === '') {
      this.vendors = [];
      return;
    } else {
      setTimeout(() => {
        this.vendorProducts = [];
        this.selectedVendorId = '';
        this.vendorsService.searchVendorsByNameAndProducts(this.searchTerm).subscribe((vendors) => {
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
      this.selectedVendor = vendorDetails;
      this.vendorProducts = vendorDetails.products;
      console.log('Vendor details:', vendorDetails);
      console.log('Vendor details:', this.vendorProducts);
    });
  }

  getSelectedProducts(): any[] {
    this.cartItems = this.vendorProducts ? this.vendorProducts.filter(product => product.selected) : [];
    console.log('Cart items:', this.cartItems);
    return this.cartItems;
  }

  calculateTotalPrice(): number {
    let total = 0;
    for (let i = 0; i < this.cartItems.length; i++) {
      const product = this.cartItems[i];
      total += product.price * product.qty;
    }
    return Number(total.toFixed(2));
  }

  incrementQuantity(product: any): void {
    product.qty++;
  }

  decrementQuantity(product: any): void {
    product.qty--;
  }

  placeOrder() {
    if (!this.selectedVendorId || this.cartItems.length === 0) {
      this.message.error('Please select a vendor and at least one product before placing an order.');
      return;
    }

    const productBatches = this.transformProductsToBatches(this.cartItems);
    const orderData = {
      totalPrice: this.calculateTotalPrice(),
      deliveryDate: new Date(),
      vendorId: this.selectedVendorId,
      restaurantId: 1,
      productBatches: productBatches
    };

    console.log(orderData);

    this.vendorsService.placeOrder(orderData).subscribe((orderResponse) => {
      console.log('Order placed successfully:', orderResponse);
      this.message.success('Order placed successfully.');
      this.message.success('Your order will be arrive within ' + this.selectedVendor.orderProcessingTime + ' hours.');
    });

    this.close();
  }

  transformProductsToBatches(selectedProducts: any[]) {
    return selectedProducts.map(product => {
      const productBatch: any = {
        uniqueIngredientId: product.uniqueIngredientId,
        productName: product.name,
        purchaseQuantity: (product.minimumOrderAmount * product.qty),
        unitOfStock: product.unitOfStock,
        purchasePrice: product.price,
        expirationDate: product.expiryDate,
        productId: product.id,
      };
      return productBatch;
    });
  }

  visible = false;

  close() {
    this.visible = false;
  }

  directToShoppingCart() {
    this.visible = true;
  }

  disabledDate = (current: Date): boolean => {
    return current < new Date();
  };

}
