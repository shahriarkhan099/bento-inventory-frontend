export interface IngredientBatch {
  id: number;
  ingredientName: string;
  unitOfStock: string;
  currentStockQuantity: number;
  purchaseQuantity: number;
  unitOfPrice: string;
  purchasePrice: number;
  costPerUnit: number;
  receivedAt: Date;
  expirationDate: string;
  supplierId: number;
  ingredientId: number;
  orderId: number;
  restaurantId: number;
  createdAt: string;
  updatedAt: string;
}
