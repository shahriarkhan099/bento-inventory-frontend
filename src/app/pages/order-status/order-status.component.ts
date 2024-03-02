import { Component, Input, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzTablePaginationPosition, NzTablePaginationType, NzTableSize } from 'ng-zorro-antd/table';
import { sortByCreatedAt } from '../../utils/sortUtils';
import { formatDateToString } from '../../utils/formatDateUtils';
import { VendorService } from '../../services/vendor/vendor.service';
import { LocalStorageService } from '../../services/localStorage/local-storage.service';

@Component({
  selector: 'app-order-status',
  templateUrl: './order-status.component.html',
  styleUrl: './order-status.component.css',
})
export class OrderStatusComponent implements OnInit {
  listOfProductOrders: any[] = []; 
  listOfProductBatches: any[] = [];
  // restaurantId: number = 1 if not entering from Bento
  restaurantId: number = 1;

  constructor(private vendorOrderService: VendorService, private message: NzMessageService) {}

  ngOnInit(): void {
    if (LocalStorageService.getRestaurantId()) {
      this.restaurantId = Number(LocalStorageService.getRestaurantId());
      this.loadAllOrders(this.restaurantId);
    } else {
      this.loadAllOrders(this.restaurantId);
    }
    setInterval(() => this.calculateRemainingTime(this.listOfProductOrders), 1000);
  }

  private loadAllOrders(restaurantId: number) {
    this.vendorOrderService.getAllOrdersOfRestaurant(restaurantId).subscribe({
      next: (data) => {
        const currentDateTime = new Date();

        this.listOfProductOrders = data
          .filter((order) => new Date(order.deliveryDate) > currentDateTime)
          .map((order) => ({
            ...order,
            status: 'Preparing',
            totalPrice: Number(order.totalPrice.toFixed(2)),
            orderDate: formatDateToString(new Date(order.orderDate)),
            deliveryDate: formatDateToString(new Date(order.deliveryDate)),
          }));

        sortByCreatedAt(this.listOfProductOrders);
        console.log('Order data loaded', this.listOfProductOrders);
        if (this.listOfProductOrders.length > 0) {
          this.totalNumberOfData = this.listOfProductOrders.length;
          this.loadingStatus = false;
        } else {
          this.noResult = 'No data found';
          this.loadingStatus = false;
        }

      },
      error: (error) => {
        console.error('Error fetching order data', error);
        this.message.error('Failed to fetch order data. Please try again.');
      },
    });
  }

  totalNumberOfData = 0;
  pageIndex = 1;
  pageSize = 10;

  frontPagination = true;
  showPagination = true;
  paginationPosition: NzTablePaginationPosition = 'bottom';
  paginationType: NzTablePaginationType = 'small';
  showBorder = true;
  outerBordered = true;
  sizeOfTable: NzTableSize = 'small';
  loadingStatus = true;

  tableTitle = 'Current Order Status';
  tableFooter = '';
  noResult = 'Loading...';
  showQuickJumper = true;
  hidePaginationOnSinglePage = true;

  showDetailsButton = true;

  visible = false;

  onDetails(productOrder: any): void {
    this.visible = true;
    this.listOfProductBatches = productOrder.productBatches.map((productBatch: any) => ({
      ...productBatch,
      purchasePrice: productBatch.purchasePrice,
      purchaseQuantity: productBatch.purchaseQuantity,
      expirationDate: formatDateToString(new Date(productBatch.expirationDate)),
    }));
    console.log(this.listOfProductBatches);
  }

  onBack(): void {
    this.visible = false;
  }

  calculateRemainingTime(order: any) {
    if (order && order.deliveryDate) {
      const deliveryDate = new Date(order.deliveryDate);
      const currentDate = new Date();
      const timeDifference = deliveryDate.getTime() - currentDate.getTime();
  
      if (timeDifference > 0) {
        const hours = Math.floor(timeDifference / (1000 * 60 * 60));
        const minutes = Math.floor(
          (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
        );
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