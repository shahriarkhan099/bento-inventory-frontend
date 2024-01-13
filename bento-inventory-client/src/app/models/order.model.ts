export interface Order {
  id: number;
  totalPrice: number;
  status: string;
  orderDate: Date;
  deliveryDate: Date;
  supplierId: number;
  restaurantId: number;
  createdAt: string;
  updatedAt: string;
}
