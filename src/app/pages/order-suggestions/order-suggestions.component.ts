import { Component, OnInit } from '@angular/core';
import {
  NzTablePaginationPosition,
  NzTablePaginationType,
  NzTableSize,
} from 'ng-zorro-antd/table';
import { Ingredient } from '../../models/ingredient.model';
import { LocalStorageService } from '../../services/localStorage/local-storage.service';
import { AutopilotService } from '../../services/autopilot/autopilot.service';
import { autopilot } from '../../models/autopilot.model';

@Component({
  selector: 'app-order-suggestions',
  templateUrl: './order-suggestions.component.html',
  styleUrl: './order-suggestions.component.css',
})
export class OrderSuggestionsComponent implements OnInit {
  orderedIngredients: Ingredient[] = []; 
  autopilotStatus!: autopilot;

  // restaurantId: number = 1 if not entering from Bento
  restaurantId: number = 1;

  constructor(private autopilotService: AutopilotService) {
  }

  ngOnInit() {
    if (LocalStorageService.getRestaurantId()) {
      this.restaurantId = Number(LocalStorageService.getRestaurantId());
      this.loadAutopilotStatus();
    } else {
      this.loadAutopilotStatus();
    }
  }

  loadAutopilotStatus() {
    this.autopilotService.getAutopilotDataOfRestaurant(this.restaurantId).subscribe((response: any) => {
      this.autopilotStatus = response;
      console.log("this.autopilotStatus: ", this.autopilotStatus);
      if (this.autopilotStatus === null) {
        this.createAutopilotStatus(this.restaurantId);
      }
    });

  }

  private createAutopilotStatus(restaurantId: number) {
    this.autopilotService.createAutopilotStatus(restaurantId, false).subscribe(() => {
      this.loadAutopilotStatus();
    });
  }

  private updateAutopilotStatus(restaurantId: number) {
    if (this.autopilotStatus) {
      let currentStatus = this.autopilotStatus.autoPilotSwitch === true ? false : true;
      this.autopilotService.updateAutopilotStatus(restaurantId, currentStatus).subscribe(() => {
      });
      this.autopilotStatus.autoPilotSwitch = currentStatus;
    }
  }

  switchClicked() {
    this.updateAutopilotStatus(this.restaurantId);
  }

  id!: number | any;
  ingredientName!: string;
  unitOfStock!: string;
  categoryId!: number | any;
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

  tableTitle = 'Ordered By Autopilot';
  tableFooter = '';
  noResult = 'No data found';
  showQuickJumper = true;
  hidePaginationOnSinglePage = true;

  showDeleteButton = true;
  showEditButton = true;
  showAddButton = true;
  
}