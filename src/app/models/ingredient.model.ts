import { ICategory } from './category.model';

export interface IIngredient {
  id: number;
  uniqueIngredientId: number;
  ingredientName: string;
  currentStockQuantity: number;
  unitOfStock: string;
  unitOfPrice: string;
  costPerUnit: number | null;
  caloriesPerUnit: number;
  reorderPoint: number;
  liquid: string;
  perishable: string;
  description: string;
  idealStoringTemperature: number;
  unitOfIdealStoringTemperature: string;
  expectedStockForToday: number | null;
  expectedStockForTomorrow: number | null;
  categoryId: number;
  restaurantId: number;
  createdAt: string;
  updatedAt: string;
  category: ICategory;
}

export interface IIngredientCreation {
  uniqueIngredientId: number;
  ingredientName: string;
  liquid: string;
  unitOfStock: string;
  caloriesPerUnit: number;
  reorderPoint: number;
  perishable: string;
  description: string;
  idealStoringTemperature: number;
  restaurantId: number;
  categoryId: number;
}
