import {  Component, Input, OnInit } from '@angular/core';
import { IngredientService } from '../../services/ingredient/ingredient.service';
import { Ingredient } from '../../models/ingredient.model';
import { NzTablePaginationPosition, NzTablePaginationType, NzTableSize } from 'ng-zorro-antd/table';

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
  checked = false;
  ingredientData: Ingredient[] = [];
  listOfCurrentPageData: readonly Ingredient[] = [];

  categoryList = [
    'Dairy',
    'Vegetable',
    'Meat',
    'Seafood',
    'Fruit',
    'Beverage',
    'Bread',
    'Spice',
    'Flour',
    'Oil',
    'Sauce',
  ];

  unitList = ['ml', 'gm', 'piece', 'bottle', 'packet', 'kg', 'litre', 'pound'];
  temperatureUnitList = ['Celsius', 'Fahrenheit'];
  perishableList = ['Yes', 'No'];

  onCurrentPageDataChange(listOfCurrentPageData: readonly Ingredient[]): void {
    this.listOfCurrentPageData = listOfCurrentPageData;
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

  constructor(private ingredientService: IngredientService) {}

  @Input() restaurantId: number = 1;

  ngOnInit(): void {
    this.loadSupplierss(1);
  }

  private loadSupplierss(restaurantId: number) {
    this.ingredientService.getIngredients(restaurantId).subscribe({
      next: (data) => {
        this.ingredientData = data.map(ingredient => ({
          ...ingredient,
          updatedAt: new Date(ingredient.updatedAt).toLocaleString('en-US', {
            dateStyle: 'medium',
            timeStyle: 'medium',
          })
        }));
        console.log('Ingredient data loaded', this.ingredientData);
      },
      error: (error) => {
        console.error('Error fetching ingredient data', error);
      },
    });
  }

  createIngredient() {
    //Have to make restaurantId and categoryId come dynamacially
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

    //Service call for Post a ingredient
    this.ingredientService.addIngredient(newItem).subscribe((res) => {
      console.log(res);
    });
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

  submitForm() {
    this.createIngredient();
    this.visible = false;
  }
  
  open(): void {
    this.visible = true;
    this.refreshFields();
  }

  close(): void {
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

}
