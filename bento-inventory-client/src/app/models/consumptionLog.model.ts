export interface ConsumptionLog {
  id: number;
  ingredientName: string;
  unitOfStock: string;
  quantity: number;
  orderType: string;
  costPerUnit: number;
  consumedAt: string;
//   ingredientId: number;
//   restaurantId: number;
  disabled: boolean;
}
