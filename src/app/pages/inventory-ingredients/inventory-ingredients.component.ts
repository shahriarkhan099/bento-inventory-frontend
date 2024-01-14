import { Component, Input, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzTablePaginationPosition, NzTablePaginationType, NzTableSize } from 'ng-zorro-antd/table';

import { IngredientService } from '../../services/ingredient/ingredient.service';
import { Ingredient } from '../../models/ingredient.model';
import { sortByCreatedAt } from '../../utils/sortUtils';
import { formatDateToString } from '../../utils/formatDateUtils';

@Component({
  selector: 'app-inventory-ingredients',
  templateUrl: './inventory-ingredients.component.html',
  styleUrl: './inventory-ingredients.component.css'
})

export class InventoryIngredientsComponent implements OnInit {
  listOfIngredients: Ingredient[] = []; 

  categoryList = [ 'Dairy', 'Vegetable', 'Meat', 'Seafood', 'Fruit', 'Beverage', 'Bread', 'Spice', 'Flour', 'Oil', 'Sauce'];
  unitList = ['ml', 'gm', 'piece', 'bottle', 'packet', 'kg', 'litre', 'pound'];
  temperatureUnitList = ['Celsius', 'Fahrenheit'];
  perishableList = ['Yes', 'No'];

  constructor(private ingredientService: IngredientService, private message: NzMessageService) {}

  //Have to make the restaurant id dynamic
  @Input() restaurantId: number = 1;

  ngOnInit(): void {
    this.subscribeToIngredientChanges();
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
        this.listOfIngredients = data.map(ingredient => ({
          ...ingredient,
          costPerUnit: ingredient.costPerUnit ? Number(ingredient.costPerUnit.toFixed(2)) : 0,
          updatedAt: formatDateToString(new Date(ingredient.updatedAt)),
        }));

        sortByCreatedAt(this.listOfIngredients);
        console.log('Ingredient data loaded', this.listOfIngredients);
      },
      error: (error) => {
        console.error('Error fetching ingredient data', error);
        this.message.error('Failed to fetch ingredient data. Please try again.');
      },
    });
  }

  createUpdateIngredient() {
    const newIngredient = {
      restaurantId: 1,
      categoryId: 1,
      ingredientName: this.ingredientName,
      unitOfStock: this.unitOfStock,
      caloriesPerUnit: this.caloriesPerUnit,
      reorderPoint: this.reorderPoint,
      perishable: this.perishable,
      description: this.description,
      unitOfIdealStoringTemperature: this.unitOfIdealStoringTemperature,
      idealStoringTemperature: this.idealStoringTemperature,
    };

    console.log(newIngredient);

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
  }

  onDelete(id: number): void {
    this.ingredientService.deleteIngredient(id).subscribe({
      next: () => {
        this.listOfIngredients = this.listOfIngredients.filter(
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
    this.unitOfStock = ingredient.unitOfStock;
    this.caloriesPerUnit = ingredient.caloriesPerUnit;
    this.reorderPoint = ingredient.reorderPoint;
    this.idealStoringTemperature = ingredient.idealStoringTemperature;
    this.unitOfIdealStoringTemperature = ingredient.unitOfIdealStoringTemperature;
    this.perishable = ingredient.perishable;
    this.description = ingredient.description;
    this.categoryId = ingredient.categoryId;
    this.categoryName = ingredient.category.categoryName;
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
    this.createUpdateIngredient();
    this.visible = false;
  }

  refreshFields(): void {
    this.id = '';
    this.ingredientName = '';
    this.unitOfStock = '';
    this.caloriesPerUnit = '';
    this.reorderPoint = '';
    this.idealStoringTemperature = '';
    this.unitOfIdealStoringTemperature = '';
    this.perishable = '';
    this.description = '';
    this.categoryId = '';
    this.categoryName = '';
  }

  id!: number | any;
  ingredientName!: string;
  unitOfStock!: string;
  categoryId!: number | any;
  caloriesPerUnit!: number | any;
  reorderPoint!: number | any;
  idealStoringTemperature!: number | any;
  unitOfIdealStoringTemperature!: string;
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

}