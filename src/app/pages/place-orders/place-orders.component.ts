import { Component, OnInit } from '@angular/core';
import { VendorService } from '../../services/vendor/vendor.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import {
  generateAvailableTimeSlots,
  bookTimeSlot,
} from '../../utils/timeSlotUtils';
import { getRemainingHours } from '../../utils/timeCalculationUtils';
import { LocalStorageService } from '../../services/localStorage/local-storage.service';
import { VendorDataService } from '../../services/Vendor-data/vendor-data.service';

@Component({
  selector: 'app-place-orders',
  templateUrl: './place-orders.component.html',
  styleUrl: './place-orders.component.css',
})
export class PlaceOrdersComponent implements OnInit {
  searchTerm: string;
  vendors: any[];
  searchedVendors: any[];
  backupVendors: any[];
  selectedVendorId: string;
  selectedVendor: any;
  vendorProducts: any[];
  cartItems: any[];
  selectedTimeSlot: string;
  // restaurantId: number = 1 if not entering from Bento
  restaurantId: number = 1;
  showLoader: boolean = true;

  constructor(
    private vendorsService: VendorService,
    private vendorDataService: VendorDataService,
    private message: NzMessageService,
  ) {
    this.searchTerm = '';
    this.vendors = [];
    this.searchedVendors = [];
    this.backupVendors = [];
    this.selectedVendorId = '';
    this.selectedVendor = '';
    this.vendorProducts = [];
    this.cartItems = [];
    this.selectedTimeSlot = '';
  }

  ngOnInit() {
    this.loadAllVendors();
    if (LocalStorageService.getRestaurantId()) {
      this.restaurantId = Number(LocalStorageService.getRestaurantId());
    }
  }

  private loadAllVendors() {
    this.vendorDataService.vendors$.subscribe({
      next: (data) => {
        this.vendors = data.map((vendor) => ({
          ...vendor,
        }));
        this.backupVendors = [...this.vendors];
        this.showLoader = false;
      },
      error: (error) => {
        console.error('Error fetching order data', error);
        this.message.error('Failed to fetch order data. Please try again.');
      },
    });
  }

  searchVendors() {
    let searchTerm = this.searchTerm.trim();
    if (searchTerm === '') {
      this.vendors = [...this.backupVendors];
      return;
    } else {
      this.vendorProducts = [];
      this.selectedVendorId = '';
      this.vendorsService
        .searchVendorsByNameAndProducts(searchTerm)
        .subscribe((vendors) => {
          this.vendors = vendors;
        });
    }
  }

  selectVendor(vendorId: string) {
    this.vendors = [];
    this.selectedVendorId = vendorId;
    this.vendorsService
      .getVendorByIdWithProducts(vendorId)
      .subscribe((vendorDetails) => {
        this.selectedVendor = vendorDetails;
        this.vendorProducts = vendorDetails.products;
      });
  }

  calculateTotalPrice(): number {
    let total = 0;
    for (let i = 0; i < this.cartItems.length; i++) {
      const product = this.cartItems[i];
      const costPerUnit = product.price / product.minimumOrderAmount;
      total += product.price + product.qty * costPerUnit;
    }
    return Number(total.toFixed(2));
  }

  getSelectedProducts(): any[] {
    this.cartItems = this.vendorProducts
      ? this.vendorProducts.filter((product) => product.selected)
      : [];
    console.log('Cart items:', this.cartItems);
    return this.cartItems;
  }

  incrementQuantity(product: any): void {
    product.qty++;
    product.selected = true;
    this.getSelectedProducts();
  }

  decrementQuantity(product: any): void {
    product.qty--;
  }

  placeOrder() {
    if (!this.selectedVendorId || this.cartItems.length === 0) {
      this.message.error(
        'Please select a vendor and at least one product before placing an order.'
      );
      return;
    }

    if (!this.selectedTimeSlot) {
      this.message.error('Please select a slot to confirm the order.');
      return;
    }

    const productBatches = this.transformProductsToBatches(this.cartItems);

    let calculatedDeliveryDate = new Date();
    calculatedDeliveryDate.setHours(0, 0, 0, 0);
    calculatedDeliveryDate.setHours(
      calculatedDeliveryDate.getHours() +
        Number(this.selectedTimeSlot.split(':')[0])
    );
    calculatedDeliveryDate.setMinutes(
      calculatedDeliveryDate.getMinutes() +
        Number(this.selectedTimeSlot.split(':')[2])
    );

    const orderData = {
      totalPrice: this.calculateTotalPrice(),
      deliveryDate: calculatedDeliveryDate,
      vendorId: this.selectedVendorId,
      restaurantId: this.restaurantId,
      selectedTimeSlot: this.selectedTimeSlot,
      productBatches: productBatches,
    };

    this.vendorsService.placeOrder(orderData).subscribe((orderResponse) => {
      console.log('Order placed successfully:', orderResponse);
      this.message.success('Order placed successfully.');
      this.message.success(
        'Your order will be arrive within ' +
          getRemainingHours(calculatedDeliveryDate) +
          ' hours.'
      );
    });

    this.cartItems.forEach((product) => {
      product.selected = false;
      product.qty = 0;
    });
    this.cartItems = [];
    this.visible = false;
    let TimeSlots = bookTimeSlot(
      this.selectedVendor.bookedTimeSlots,
      this.selectedTimeSlot
    );
    this.selectedVendor.bookedTimeSlots = TimeSlots;

    this.vendorsService
      .updateSupplier(this.selectedVendor)
      .subscribe((vendorResponse) => {
        console.log('Vendor updated successfully:', vendorResponse);
      });
    this.selectedTimeSlot = '';
  }

  transformProductsToBatches(selectedProducts: any[]) {
    return selectedProducts.map((product) => {
      const productBatch: any = {
        uniqueIngredientId: product.uniqueIngredientId,
        productName: product.name,
        purchaseQuantity: product.minimumOrderAmount + product.qty,
        unitOfStock: product.unitOfStock,
        purchasePrice: (
          (product.price / product.minimumOrderAmount) * product.qty +
          product.price
        ).toFixed(2),
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

  getAvailableTimeSlots(): string[] {
    if (this.selectedVendor) {
      return generateAvailableTimeSlots(
        this.selectedVendor.openingHours.start,
        this.selectedVendor.openingHours.end,
        this.selectedVendor.bookedTimeSlots || [],
        15
      );
    }
    return [];
  }

  currentPage = 1;
  productsPerPage = 8;

  pageChanged(pageNumber: number): void {
    this.currentPage = pageNumber;
  }
}
