import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzTablePaginationPosition, NzTablePaginationType, NzTableSize } from 'ng-zorro-antd/table';

import { OrderService } from '../../services/order/order.service';
import { Order } from '../../models/order.model';
import { sortByCreatedAt } from '../../utils/sortUtils';
import { formatDateToString } from '../../utils/formatDateUtils';
import { IngredientBatch } from '../../models/ingredient-batch.model';
import { DeliveryBoxBatch } from '../../models/delivery-box-batch.model';
import { LocalStorageService } from '../../services/localStorage/local-storage.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrl: './order-history.component.css',
})
export class OrderHistoryComponent implements OnInit {
  listOfOrder: Order[] = []; 
  listOfIngredientBatch: IngredientBatch[] = [];
  listOfDeliveryBoxBatch: DeliveryBoxBatch[] = [];
  // restaurantId: number = 1 if not entering from Bento
  restaurantId: number = 1;

  constructor(private orderService: OrderService, private message: NzMessageService) {}

  ngOnInit(): void {
    this.subscribeToIngredientChanges();
    if (LocalStorageService.getRestaurantId()) {
      this.restaurantId = Number(LocalStorageService.getRestaurantId());
      this.loadAllOrders(this.restaurantId);
    } else {
      this.loadAllOrders(this.restaurantId);
    }
  }

  private subscribeToIngredientChanges() {
    this.orderService.refreshNeeded$.subscribe(() => {
      this.loadAllOrders(this.restaurantId);
    });
  }

  private loadAllOrders(restaurantId: number) {
    this.orderService.getOrders(restaurantId).subscribe({
      next: (data) => {
        this.listOfOrder = data.map(order => ({
          ...order,
          status: order.status === "delivered" ? "Received" : order.status === "cancelled" ? "Cancelled" : order.status,
          totalPrice: Number(order.totalPrice.toFixed(2)),
          orderDate: formatDateToString(new Date(order.orderDate)),
          deliveryDate: formatDateToString(new Date(order.deliveryDate)),
        }));

        sortByCreatedAt(this.listOfOrder);
        console.log('Order data loaded', this.listOfOrder);
        if (this.listOfOrder.length > 0) {
          this.totalNumberOfData = this.listOfOrder.length;
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

  tableTitle = 'Order History Overview';
  tableFooter = '';
  noResult = 'Loading...';
  showQuickJumper = true;
  hidePaginationOnSinglePage = true;

  showDetailsButton = true;

  visible = false;

  onDetails(order: Order): void {
    this.visible = true;
    this.listOfIngredientBatch = order.ingredientBatches.map(ingredientBatch => ({
      ...ingredientBatch,
      purchasePrice: (ingredientBatch.purchasePrice / 100),
      unitOfStock: ingredientBatch.unitOfStock === "gm" ? "kg" : ingredientBatch.unitOfStock === "ml" ? "litre" : ingredientBatch.unitOfStock,
      purchaseQuantity: ingredientBatch.unitOfStock === "gm" ? (ingredientBatch.purchaseQuantity / 1000) : ingredientBatch.unitOfStock === "ml" ? (ingredientBatch.purchaseQuantity / 1000) : ingredientBatch.purchaseQuantity,
      expirationDate: formatDateToString(new Date(ingredientBatch.expirationDate)),
      costPerUnit: Number(ingredientBatch.costPerUnit.toFixed(2)),
    }));
    this.listOfDeliveryBoxBatch = order.deliveryBoxBatches;
    console.log(this.listOfIngredientBatch);
  }

  onBack(): void {
    this.visible = false;
  }

}