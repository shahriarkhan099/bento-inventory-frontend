import { Component, OnInit } from '@angular/core';
import { VendorService } from '../../services/vendor/vendor.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  orders: any[] = [];
  loading = true;
  error = false;

  constructor(private orderService: VendorService) {}

  ngOnInit(): void {
    this.fetchOrderData();
    setInterval(() => this.calculateRemainingTime(this.orders), 1000);
  }

  fetchOrderData() {
    const restaurantId = 1; // Replace with the actual restaurant ID
    this.orderService.getAllOrdersOfRestaurant(restaurantId).subscribe(
      (data) => {
        this.orders = data;
        this.loading = false;
      },
      (err) => {
        console.error('Error fetching order data:', err);
        this.loading = false;
        this.error = true;
      }
    );
  }

  calculateRemainingTime(order: any) {
    if (order && order.deliveryDate) {
      const deliveryDate = new Date(order.deliveryDate);
      const currentDate = new Date();
      const timeDifference = deliveryDate.getTime() - currentDate.getTime();

      if (timeDifference > 0) {
        const hours = Math.floor(timeDifference / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

        return `${hours}h ${minutes}m ${seconds}s`;
      } else {
        return 'Delivery Time Expired';
      }
    }

    return '';
  }

  isDeliveryExpired(order: any): boolean {
    if (order && order.deliveryDate) {
      const deliveryDate = new Date(order.deliveryDate);
      const currentDate = new Date();

      return currentDate.getTime() > deliveryDate.getTime();
    }

    return false;
  }

}