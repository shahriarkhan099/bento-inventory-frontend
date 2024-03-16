export interface IDeliveryBox {
  id: number;
  boxName: string;
  currentStockQuantity: number;
  unitOfPrice: string;
  costPerUnit: number;
  reorderPoint: number;
  unitOfDimentions: string;
  dimensions: string;
  weightLimit: number;
  temperatureLimit: number;
  waterproof: string;
  expectedStockForToday: number;
  expectedStockForTomorrow: number;
  restaurantId: number;
  createdAt: string;
  updatedAt: string;
}

export interface IDeliveryBoxWithoutId extends Omit<IDeliveryBox, 'id'> {
  id: number;
}

export interface IDeliveryBoxCreation {
  restaurantId: number;
  boxName: string;
  currentStockQuantity: number;
  reorderPoint: number;
  dimensions: string;
  weightLimit: number;
  temperatureLimit: number;
  waterproof: boolean;
}