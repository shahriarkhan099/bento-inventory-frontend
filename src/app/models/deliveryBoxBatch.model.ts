export interface IDeliveryBoxBatch {
    id: number;
    boxName: string;
    currentStockQuantity: number;
    purchaseQuantity: number;
    unitOfPrice: string;
    purchasePrice: number;
    costPerUnit: number;
    receivedAt: Date;
    supplierId: number;
    deliveryBoxId: number;
    orderId: number;
    restaurantId: number;
  }
  