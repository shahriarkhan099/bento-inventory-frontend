import { Component, Input, OnInit } from '@angular/core';
import { ConsumptionLog } from '../../models/consumptionLog.model';
import { ConsumptionLogService } from '../../services/consumption-log/consumption-log.service';
import { NzTablePaginationPosition, NzTablePaginationType, NzTableSize } from 'ng-zorro-antd/table';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrl: './order-history.component.css',
})

export class OrderHistoryComponent implements OnInit {

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
  ingredientData: ConsumptionLog[] = [];
  listOfCurrentPageData: readonly ConsumptionLog[] = [];

  disabledDate = (current: Date): boolean => {
    return current < new Date();
  };

  onCurrentPageDataChange(listOfCurrentPageData: readonly ConsumptionLog[]): void {
    this.listOfCurrentPageData = listOfCurrentPageData;
  }

  constructor(private consumptionLogService: ConsumptionLogService) {}

  @Input() restaurantId: number = 1;

  ngOnInit(): void {
    this.loadIngredients(1);
  }

  private loadIngredients(restaurantId: number) {
    this.consumptionLogService.getConsumptionLog(restaurantId).subscribe({
      next: (data) => {
        this.ingredientData = data.map(ingredient => ({
          ...ingredient,
          consumedAt: new Date(ingredient.consumedAt).toLocaleString('en-US', {
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

  // createIngredient() {
  //   const ingredients = this.includeIngredients();
  //   console.log(ingredients);
  //   console.log('Ingredient Name: ' + this.ingredientName);

  //   let newItem = {
  //     restaurantId: 1,
  //     categoryId: 1,
  //     ingredientName: this.ingredientName,
  //     unitOfStock: this.unitOfStock,
  //     caloriesPerUnit: this.caloriesPerUnit,
  //     reorderPoint: this.reorderPoint,
  //     perishable: this.perishable,
  //     description: this.description,
  //     unitOfIdealStoringTemperature: this.unitOfIdealStoringTemperature,
  //     idealStoringTemperature: this.idealStoringTemperature,
  //   };

  //   // this.postIngredient(newItem);
  //   console.log(newItem);

  //   //Service call for Post a ingredient
  //   this.ingredientService.addIngredient(newItem).subscribe((res) => {
  //     console.log(res);
  //   });
  // }

  // includeIngredients() {
  //   return this.createIngredient();
  // }

  submitForm() {
    // this.includeIngredients();
    this.visible = false;
  }

  visible = false;
  
  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }

  onDelete(id: number): void {
    // this.ingredientService.deleteIngredient(id).subscribe({
    //   next: () => {
    //     this.ingredientData = this.ingredientData.filter(
    //       (ingredient) => ingredient.id !== id
    //     );
    //     console.log(`Ingredient with ID ${id} deleted successfully.`);
    //   },
    //   error: (error) => {
    //     console.error(`Error deleting ingredient with ID ${id}`, error);
    //   },
    // });
  }

  onEdit(data: any): void {
    console.log(data);
    this.visible = true;
  }

}
