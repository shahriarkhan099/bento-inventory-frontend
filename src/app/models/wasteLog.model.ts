export interface IWasteLog {
  id: number;
  ingredientName: string;
  unitOfStock: string;
  totalQuantity: number;
  unitOfPrice: string;
  totalCost: number;
  costPerUnit: number;
  boughtAt: string;
  consumptionQuantity: number;
  wastagePercentage: number;
  expirationDate: string;
  shelfLifeInDays: number;
  ingredientId: number;
  restaurantId: number;
  createdAt: string;
  updatedAt: string;
}
