import { IIngredientBatch } from './ingredientBatch.model';
import { IDeliveryBoxBatch } from './deliveryBoxBatch.model';
import { ISupplier } from './supplier.model';

export interface IOrder {
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
  ingredientBatches: IIngredientBatch[];
  deliveryBoxBatches: IDeliveryBoxBatch[];
  supplier: ISupplier;
}
