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
  public orderForm: FormGroup;

  constructor(private _fb: FormBuilder, private orderService: OrderService) {
    this.orderForm = this._fb.group({
      deliveryDate: [''],
      scheduleTime: [''],
      supplierId: [''],
      ingredientBatches: this._fb.array([this.createIngredientBatch()]),
      deliveryBoxBatches: this._fb.array([this.createDeliveryBoxBatch()]),
    });
  }

  ngOnInit(): void {
  }

  private createIngredientBatch(): FormGroup {
    return this._fb.group({
      ingredientId: [''],
      ingredientName: [''],
      unitOfStock: [''],
      purchaseQuantity: [''],
      unitOfPrice: [''],
      purchasePrice: [''],
      expirationDate: [''],
      restaurantId: [''],
      supplierId: [''],
    });
  }

  private createDeliveryBoxBatch(): FormGroup {
    return this._fb.group({
      deliveryBoxId: [''],
      boxName: [''],
      purchaseQuantity: [''],
      unitOfPrice: [''],
      purchasePrice: [''],
      supplierId: [''],
      restaurantId: [''],
    });
  }

  get ingredientBatchesArray(): FormArray {
    return <FormArray>this.orderForm.get('ingredientBatches');
  }

  get deliveryBoxBatchesArray(): FormArray {
    return <FormArray>this.orderForm.get('deliveryBoxBatches');
  }

  addIngredientBatch(): void {
    this.ingredientBatchesArray.push(this.createIngredientBatch());
  }

  removeIngredientBatch(index: number): void {
    this.ingredientBatchesArray.removeAt(index);
  }

  addDeliveryBoxBatch(): void {
    this.deliveryBoxBatchesArray.push(this.createDeliveryBoxBatch());
  }

  removeDeliveryBoxBatch(index: number): void {
    this.deliveryBoxBatchesArray.removeAt(index);
  }

  submitForm(): void {
    if (this.orderForm.valid) {
      const formData = this.orderForm.value;

      console.log(formData);

      this.orderService.addOrder(formData).subscribe({
        next: (response) => {
          console.log('Post successful', response);
        },
        error: (error) => {
          console.error('Error in post', error);
        },
      });
    } else {
      console.error('Form invalid');
    }
  }
}
