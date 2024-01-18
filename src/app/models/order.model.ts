import { IngredientBatch } from './ingredient-batch.model';
import { DeliveryBoxBatch } from './delivery-box-batch.model';
import { Supplier } from './supplier.model';

export interface Order {
  id: number;
  totalPrice: number;
  status: string;
  orderDate: string;
  deliveryDate: string;
  scheduleTime: string;
  supplierId: number;
  restaurantId: number;
  createdAt: string;
  updatedAt: string;
  ingredientBatches: IngredientBatch[];
  deliveryBoxBatches: DeliveryBoxBatch[];
  supplier: Supplier;
}
