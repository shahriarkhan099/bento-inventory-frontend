import { Component, Input, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  NzTablePaginationPosition,
  NzTablePaginationType,
  NzTableSize,
} from 'ng-zorro-antd/table';
import { sortByCreatedAt } from '../../utils/sortUtils';
import { formatDateToString } from '../../utils/formatDateUtils';
import { OrderService } from '../../services/order/order.service';
import { Order } from '../../models/order.model';

@Component({
  selector: 'app-place-orders',
  templateUrl: './place-orders.component.html',
  styleUrl: './place-orders.component.css',
})
export class PlaceOrdersComponent implements OnInit {
  listOfOrders: Order[] = [];

  unitList = ['ml', 'gm', 'piece', 'bottle', 'packet', 'kg', 'litre', 'pound'];
  perishableList = ['Yes', 'No'];

  orderForm: FormGroup;

  constructor(
    private orderService: OrderService,
    private message: NzMessageService,
    private formBuilder: FormBuilder
  ) {
    this.orderForm = this.formBuilder.group({
      totalPrice: ['', Validators.required],
      status: ['', Validators.required],
      orderDate: ['', Validators.required],
      deliveryDate: ['', Validators.required],
      supplierId: ['', Validators.required],
      restaurantId: ['', Validators.required],
    });
    
  }

  //Have to make the restaurant id dynamic
  @Input() restaurantId: number = 1;

  ngOnInit(): void {
    this.subscribeToIngredientChanges();
    this.loadAllIngredients(this.restaurantId);
  }

  private subscribeToIngredientChanges() {
    this.orderService.refreshNeeded$.subscribe(() => {
      this.loadAllIngredients(this.restaurantId);
    });
  }

  private loadAllIngredients(restaurantId: number) {
    this.orderService.getOrders(restaurantId).subscribe({
      next: (data) => {
        this.listOfOrders = data.map((order) => ({
          ...order,
          deliveryDate: formatDateToString(new Date(order.deliveryDate)),
        }));

        sortByCreatedAt(this.listOfOrders);
        console.log('Ingredient data loaded', this.listOfOrders);
      },
      error: (error) => {
        console.error('Error fetching ingredient data', error);
        this.message.error(
          'Failed to fetch ingredient data. Please try again.'
        );
      },
    });
  }

  createUpdateIngredient() {
    const newOrder = {
      restaurantId: 1,
      supplierId: 1,
    };

    console.log(newOrder);

      this.orderService.addOrder(newOrder).subscribe({
        next: (res) => {
          console.log(res);
          this.message.success('Ingredient Added successfully.');
        },
        error: (error) => {
          console.error('Error adding ingredient:', error);
          this.message.error('Error adding ingredient. Please try again.');
        },
      });
  }

  submitForm() {
    console.log("Value" +this.orderForm.value.totalPrice);
    console.log("Value" +this.orderForm.value.status);
    console.log("Value" +this.orderForm.value.status);
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
  loadingStatus = false;

  tableTitle = 'Your Current Ingredients';
  tableFooter = '';
  noResult = 'No Data Present';
  showQuickJumper = true;
  hidePaginationOnSinglePage = true;

}
