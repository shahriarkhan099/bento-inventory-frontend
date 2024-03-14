export interface IConsumptionLog {
  id: number;
  ingredientName: string;
  unitOfStock: string;
  quantity: number;
  orderType: string;
  costPerUnit: number;
  consumedAt: Date;
  ingredientId: number;
  restaurantId: number;
  createdAt: string;
  updatedAt: string;
}
