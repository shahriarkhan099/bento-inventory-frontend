import { Component, Input, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzTablePaginationPosition, NzTablePaginationType, NzTableSize } from 'ng-zorro-antd/table';

import { IngredientService } from '../../services/ingredient/ingredient.service';
import { Ingredient } from '../../models/ingredient.model';
import { sortByCreatedAt } from '../../utils/sortUtils';
import { formatDateToString } from '../../utils/formatDateUtils';
import { CategoryService } from '../../services/category/category.service';
import { GlobalCatgory } from '../../models/globalCategory.model';
import { GlobalIngredient } from '../../models/globalIngredient,model';

@Component({
  selector: 'app-inventory-ingredients',
  templateUrl: './inventory-ingredients.component.html',
  styleUrl: './inventory-ingredients.component.css'
})

export class InventoryIngredientsComponent implements OnInit {
  createdIngredients: Ingredient[] = []; 
  categoryList: GlobalCatgory[] = []; 
  ingredientList: GlobalIngredient[] = [];

  constructor(private ingredientService: IngredientService, private categoryService: CategoryService, private message: NzMessageService) {
  }

  //Have to make the restaurant id dynamic
  @Input() restaurantId: number = 1;

  ngOnInit() {
    this.subscribeToIngredientChanges();
    this.loadCategoriesFromAssests();
    this.loadIngredientsFromAssests();
    this.loadAllIngredients(this.restaurantId);
  }

  private subscribeToIngredientChanges() {
    this.ingredientService.refreshNeeded$.subscribe(() => {
      this.loadAllIngredients(this.restaurantId);
    });
  }

  private loadAllIngredients(restaurantId: number) {
    this.ingredientService.getIngredients(restaurantId).subscribe({
      next: (data) => {
        this.createdIngredients = data.map(ingredient => ({
          ...ingredient,
          currentStockQuantity: Number((ingredient.currentStockQuantity/1000).toFixed(2)),
          unitOfStock: ingredient.unitOfStock === "gm" ? "kg" : ingredient.unitOfStock === "ml" ? "litre" : ingredient.unitOfStock,
          costPerUnit: ingredient.costPerUnit ? Number(ingredient.costPerUnit.toFixed(2)) : 0,
          updatedAt: formatDateToString(new Date(ingredient.updatedAt)),
        }));

        sortByCreatedAt(this.createdIngredients);
        console.log('Ingredient data loaded', this.createdIngredients);
      },
      error: (error) => {
        console.error('Error fetching ingredient data', error);
        this.message.error('Failed to fetch ingredient data. Please try again.');
      },
    });
  }

  createCategory() {
    this.categoryService.getCategoryByName(this.restaurantId, this.categoryName).subscribe((category) => {
      if (!category) {
        const newCategory = {
          restaurantId: this.restaurantId,
          categoryName: this.categoryName,
          uniqueCategoryId: this.categoryService.getCategoryMappings()[this.categoryName],
        };
  
        this.categoryService.addCategory(newCategory).subscribe({
          next: (res) => {
            console.log(res);
            this.createUpdateIngredient();
          },
          error: (error) => {
            console.error('Error updating ingredient:', error);
          }
        });
      } else {
        this.createUpdateIngredient();
      }
    });
  }
  
  async createUpdateIngredient() {

    if (!this.validateInput()) {
      return;
    }

    let uniqueIngredientId = this.ingredientService.getIngredientMappings()[this.ingredientName];
    console.log('uniqueIngredientId', uniqueIngredientId);

    // let isIngredientExit = await this.ingredientService.getIngredientByIngredientUniqueId(this.restaurantId, uniqueIngredientId).subscribe((ingredient) => {
    //   if (ingredient) {
    //     console.log('Ingredient already exists:', ingredient);
    //     return true;
    //   }
    //   return false;
    // });

    // if (!isIngredientExit) {
    //   this.message.error('Ingredient already exists. Please try again.');
    //   return;
    // }
    
    const newIngredient = {
      uniqueIngredientId: this.ingredientService.getIngredientMappings()[this.ingredientName],
      ingredientName: this.ingredientName,
      liquid: this.liquid,
      unitOfStock: this.unitOfStock,
      caloriesPerUnit: this.caloriesPerUnit,
      reorderPoint: this.reorderPoint,
      perishable: this.perishable,
      description: this.description,
      idealStoringTemperature: this.idealStoringTemperature,
      restaurantId: this.restaurantId,
      categoryId: 0,
    };
  
    this.categoryService.getCategoryByName(this.restaurantId, this.categoryName).subscribe((category) => {
      if (category) {
        console.log('Category already exists:', category);
        newIngredient.categoryId = category.id;
      }
  
      if (this.isEdit) {
        this.ingredientService.editIngredient(this.id, newIngredient).subscribe({
          next: (res) => {
            console.log(res);
            this.message.success('Ingredient Updated successfully.');
          },
          error: (error) => {
            console.error('Error updating ingredient:', error);
            this.message.error('Error updating ingredient. Please try again.');
          }
        });
      } else {
        this.ingredientService.addIngredient(newIngredient).subscribe({
          next: (res) => {
            console.log(res);
            this.message.success('Ingredient Added successfully.');
          },
          error: (error) => {
            console.error('Error adding ingredient:', error);
            this.message.error('Error adding ingredient. Please try again.');
          }
        });
      }
    });

    this.visible = false;
  }
  

  onDelete(id: number): void {
    this.ingredientService.deleteIngredient(id).subscribe({
      next: () => {
        this.createdIngredients = this.createdIngredients.filter(
          (ingredient) => ingredient.id !== id
        );
        this.message.success('Ingredient deleted successfully.');
      },
      error: (error) => {
        console.error(`Error deleting ingredient with ID ${id}`, error);
        this.message.success('Error deleting ingredient, please try again.');
      },
    });
  }

  onEdit(ingredient: any): void {
    this.visible = true;
    this.isEdit = true;

    this.id = ingredient.id;
    this.ingredientName = ingredient.ingredientName;
    this.liquid = ingredient.liquid;
    this.unitOfStock = ingredient.unitOfStock;
    this.caloriesPerUnit = ingredient.caloriesPerUnit;
    this.reorderPoint = ingredient.reorderPoint;
    this.idealStoringTemperature = ingredient.idealStoringTemperature;
    this.perishable = ingredient.perishable;
    this.description = ingredient.description;
    this.categoryId = ingredient.categoryId;
    this.categoryName = ingredient.category.categoryName;
  }

  async loadIngredientsFromAssests(): Promise<void> {
    try {
      const ingredients = await this.ingredientService.loadIngredients().toPromise();
      if (ingredients) {
        this.ingredientList = ingredients;
      }
    } catch (error) {
      console.error('Error fetching categories', error);
    }
  }

  async loadCategoriesFromAssests(): Promise<void> {
    try {
      const categories = await this.categoryService.loadCategories().toPromise();
      if (categories) {
        this.categoryList = categories;
      }
    } catch (error) {
      console.error('Error fetching categories', error);
    }
  }

  onSelectSetCaloriesPerUnit() {
    let uniqueIngredientId = this.ingredientService.getIngredientMappings()[this.ingredientName];
    this.caloriesPerUnit = this.ingredientList[(uniqueIngredientId - 1)].caloriesPerUnit;
  }
  
  unitOfQuantityOptions = ['kg', 'gm', 'piece', 'can', 'packet', 'litre', 'ml', 'bottle',];
  booleanList = ['Yes', 'No'];

  onLiquidChange(value: string): void {
    this.liquid = value;
    
    if (this.liquid === 'Yes') {
      this.unitOfQuantityOptions = ['litre', 'ml', 'bottle', 'can', 'packet'];
    } else if(this.liquid === 'No') {
      this.unitOfQuantityOptions = ['kg', 'gm', 'piece', 'can', 'packet'];
    }
  }

  visible = false;
  isEdit = false;
  
  onAdd(): void {
    this.visible = true;
    this.isEdit = false;
    this.refreshFields();
  }

  close(): void {
    this.visible = false;
  }

  submitForm() {
    this.createCategory();
  }

  refreshFields(): void {
    this.id = '';
    this.ingredientName = '';
    this.liquid = '';
    this.unitOfStock = '';
    this.caloriesPerUnit = '';
    this.reorderPoint = '';
    this.perishable = '';
    this.description = '';
    this.categoryId = '';
    this.categoryName = '';
    this.idealStoringTemperature = '';
  }

  id!: number | any;
  ingredientName!: string;
  liquid!: string; 
  unitOfStock!: string;
  categoryId!: number | any;
  caloriesPerUnit!: number | any;
  reorderPoint!: number | any;
  idealStoringTemperature!: number | any;
  perishable!: string;
  description!: string;
  categoryName!: string;

  totalNumberOfData = 0;
  pageIndex = 1;
  pageSize = 10;

  frontPagination = true;
  showPagination = true;
  paginationPosition: NzTablePaginationPosition = 'bottom';
  paginationType: NzTablePaginationType = 'small';
  showBorder = true;
  outerBordered = true;
  sizeOfTable: NzTableSize = 'small';
  loadingStatus = false;

  tableTitle = 'Current Ingredients';
  tableFooter = '';
  noResult = 'No Ingredient Present';
  showQuickJumper = true;
  hidePaginationOnSinglePage = true;

  showDeleteButton = true;
  showEditButton = true;
  showAddButton = true;

  validateInput() {
    if (!this.isInputDigit(this.caloriesPerUnit) || this.caloriesPerUnit < 0) {
      this.message.error('Please provide a valid calories per unit.');
      return false;
    }
    if (this.reorderPoint === '') {
      this.reorderPoint = Number(0);
    }
    if (!this.isInputDigit(this.reorderPoint) || this.reorderPoint < 0) {
      this.message.error('Please provide a valid reorder point.');
      return false;
    }
    if (!this.isInputDigit(this.idealStoringTemperature)) {
      this.message.error('Please provide a valid ideal storing temperature.');
      return false;
    }
    return true;
  }

  isInputDigit(input: string): boolean {
    return /^\d+$/.test(input);
  }
  
}