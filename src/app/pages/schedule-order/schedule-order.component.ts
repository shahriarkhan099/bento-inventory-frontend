import { Component, Input, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import {
  NzTablePaginationPosition,
  NzTablePaginationType,
  NzTableSize,
} from 'ng-zorro-antd/table';

import { IngredientService } from '../../services/ingredient/ingredient.service';
import { Ingredient } from '../../models/ingredient.model';
import { sortByCreatedAt } from '../../utils/sortUtils';
import { formatDateToString } from '../../utils/formatDateUtils';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-schedule-order',
  templateUrl: './schedule-order.component.html',
  styleUrl: './schedule-order.component.css',
})
export class ScheduleOrderComponent implements OnInit {
  
  scheduleTime: Date = new Date();
  order = {
    name: '',
    quantity: 1,
    price: 0,
  };
  orders: any[] = [];

  constructor(private http: HttpClient) {
    this.getOrders();
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  submitOrder() {
    const orderPayload = {
      ...this.order,
      scheduleTime: this.scheduleTime ? this.scheduleTime.toISOString() : null,
    };

    this.http.post('http://localhost:3000/order', orderPayload).subscribe(() => {
      this.getOrders();
    });
  }

  getOrders() {
    this.http.get('http://localhost:3000/orders').subscribe((orders: any) => {
      this.orders = orders;
    });
  }

  addItem() {
    // Add your logic here to handle adding an item to the order
  }
}