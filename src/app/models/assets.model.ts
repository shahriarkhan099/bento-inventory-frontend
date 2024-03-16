export interface ICategoryAsset {
  uniqueCategoryId: number;
  categoryName: string;
}

export interface IDeliveryBoxAsset {
  uniqueBoxId: number;
  boxName: string;
  dimensions: string;
}

export interface IIngredientAsset {
  uniqueIngredientId: number;
  ingredientName: string;
  caloriesPerUnit: string;
}
