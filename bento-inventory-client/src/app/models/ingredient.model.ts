import { Category } from './category.model';

export interface Ingredient {
  id: number;
  ingredientName: string;
  currentStockQuantity: number;
  unitOfStock: string;
  unitOfPrice: string;
  costPerUnit: number | null;
  caloriesPerUnit: number;
  reorderPoint: number;
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
  category: Category;
}
