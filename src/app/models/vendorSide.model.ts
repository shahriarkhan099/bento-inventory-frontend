export interface ISupplierVendorSide {
  id: number;
  name: string;
  email: string;
  logo: string;
  address: string;
  contactNumber: string;
  vendorType: string;
  workingDays: string[];
  openingHours: {
    startTime: string;
    endTime: string;
  };
  orderProcessingTime: number;
  bookedTimeSlots: String[];
  createdAt: string;
  updatedAt: string;
}

export interface IOrderVendorSide {
  id: number;
  totalPrice: number;
  status: string;
  orderDate: Date;
  deliveryDate: Date;
  vendorId: number;
  restaurantId: number;
  vendorSide: ISupplierVendorSide;
  productBatches: IProductBatchVendorSide[];
  createdAt: string;
  updatedAt: string;
}

export interface IProductBatchVendorSide {
  id: number;
  uniqueIngredientId: number;
  productName: string;
  purchaseQuantity: number;
  unitOfStock: string;
  purchasePrice: number;
  receivedAt: string;
  expirationDate: string;
  vendorId: number;
  productId: number;
  orderId: number;
  restaurantId: number;
  createdAt: string;
  updatedAt: string;
}