import {  Component, Input, OnInit } from '@angular/core';
import { IngredientService } from '../../services/ingredient/ingredient.service';
import { Ingredient } from '../../models/ingredient.model';
import { NzTablePaginationPosition, NzTablePaginationType, NzTableSize } from 'ng-zorro-antd/table';
import { NzMessageService } from 'ng-zorro-antd/message';
import { sortByCreatedAt } from '../../utils/sortUtils';
import { formatDateToString } from '../../utils/formatDateUtils';

@Component({
  selector: 'app-inventory-ingredients',
  templateUrl: './inventory-ingredients.component.html',
  styleUrl: './inventory-ingredients.component.css'
})

export class InventoryIngredientsComponent implements OnInit {

  frontPagination = true;
  totalNumberOfData = 0;
  pageIndex = 1;
  pageSize = 10;
  showPagination = true;
  paginationPosition: NzTablePaginationPosition = 'bottom';
  paginationType: NzTablePaginationType = 'small';
  showBorder = true;
  outerBordered = true;
  sizeOfTable: NzTableSize = 'small';
  loadingStatus = false;
  tableTitle = 'Ingredient Table';
  tableFooter = '';
  noResult = 'No Data Present';
  showQuickJumper = true;
  hidePaginationOnSinglePage = true;
  showDeleteButton = true;
  showEditButton = true;
  showAddButton = true;

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
    this.id = 0;
    this.ingredientName = '';
    this.unitOfStock = '';
    this.caloriesPerUnit = '';
    this.reorderPoint = '';
    this.idealStoringTemperature = '';
    this.unitOfIdealStoringTemperature = '';
    this.perishable = '';
    this.description = '';
    this.categoryId = 0;
    this.categoryName = '';
  }

  categoryList = [ 'Dairy', 'Vegetable', 'Meat', 'Seafood', 'Fruit', 'Beverage', 'Bread', 'Spice', 'Flour', 'Oil', 'Sauce'];
  unitList = ['ml', 'gm', 'piece', 'bottle', 'packet', 'kg', 'litre', 'pound'];
  temperatureUnitList = ['Celsius', 'Fahrenheit'];
  perishableList = ['Yes', 'No'];

  ingredientData: Ingredient[] = []; // Array of Ingredient objects

  onCurrentPageDataChange(ingredientData: Ingredient[]): void {
    this.ingredientData = ingredientData;
  }

  id!: number;
  ingredientName!: string;
  unitOfStock!: string;
  categoryId!: number;
  caloriesPerUnit!: number | any;
  reorderPoint!: number | any;
  idealStoringTemperature!: number | any;
  unitOfIdealStoringTemperature!: string;
  perishable!: string;
  description!: string;
  categoryName!: string;

  constructor(private ingredientService: IngredientService, private message: NzMessageService) {}

  //Have to make the restaurant id dynamic
  @Input() restaurantId: number = 1;

  ngOnInit(): void {

    this.ingredientService.refreshNeeded$.subscribe(() => {
      this.loadAllIngredients(1);
    });
    
    this.loadAllIngredients(1);
    
  }

  private loadAllIngredients(restaurantId: number) {
    this.ingredientService.getIngredients(restaurantId).subscribe({
      next: (data) => {
        this.ingredientData = data.map(ingredient => ({
          ...ingredient,
          updatedAt: formatDateToString(new Date(ingredient.updatedAt)),
          costPerUnit: ingredient.costPerUnit ? Number(ingredient.costPerUnit.toFixed(2)) : 0,
        }));

        sortByCreatedAt(this.ingredientData);
        console.log('Ingredient data loaded', this.ingredientData);
      },
      error: (error) => {
        console.error('Error fetching ingredient data', error);
      },
    });
  }

  createUpdateIngredient() {
    let newItem = {
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

    console.log(newItem);

    if (this.isEdit) {
      this.ingredientService.editIngredient(this.id, newItem).subscribe((res) => {
        console.log(res);
      });
    } else {
    this.ingredientService.addIngredient(newItem).subscribe((res) => {
      console.log(res);
    });
    }

  }

  onDelete(id: number): void {
    this.ingredientService.deleteIngredient(id).subscribe({
      next: () => {
        this.ingredientData = this.ingredientData.filter(
          (ingredient) => ingredient.id !== id
        );
        console.log(`Ingredient with ID ${id} deleted successfully.`);
      },
      error: (error) => {
        console.error(`Error deleting ingredient with ID ${id}`, error);
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

}
