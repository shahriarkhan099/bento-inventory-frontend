import { Component, Input, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import {
  NzTablePaginationPosition,
  NzTablePaginationType,
  NzTableSize,
} from 'ng-zorro-antd/table';

import { OrderService } from '../../services/order/order.service';
import { Ingredient } from '../../models/ingredient.model';
import { sortByCreatedAt } from '../../utils/sortUtils';
import { formatDateToString } from '../../utils/formatDateUtils';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Order } from '../../models/order.model';

@Component({
  selector: 'app-on-platform-supplier',
  templateUrl: './on-platform-supplier.component.html',
  styleUrl: './on-platform-supplier.component.css',
})
export class OnPlatformSupplierComponent implements OnInit {
  
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

}
