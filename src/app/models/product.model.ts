export interface IProduct {
  id: number;
  name: string;
  price: number;
  qty: number;
  minimumOrderAmount: number;
  unitOfStock: string;
  selected: boolean;
  createdAt: string;
  updatedAt: string;
  expiryDate: string;
  image: string;
  uniqueIngredientId: number;
  vendorId: number;
  volumeDiscount: number;
}
