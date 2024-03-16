import { Component, OnInit } from '@angular/core';
import {
  NzTablePaginationPosition,
  NzTablePaginationType,
  NzTableSize,
} from 'ng-zorro-antd/table';
import { IIngredient } from '../../models/ingredient.model';
import { LocalStorageService } from '../../services/localStorage/local-storage.service';
import { AutopilotService } from '../../services/autopilot/autopilot.service';
import { IAutopilot } from '../../models/autopilot.model';

@Component({
  selector: 'app-order-autopilot',
  templateUrl: './order-autopilot.component.html',
  styleUrl: './order-autopilot.component.css',
})
export class OrderAutopilotComponent implements OnInit {
  orderedIngredients: IIngredient[] = []; 
  autopilotStatus!: IAutopilot;

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
    this.autopilotService.getAutopilotDataOfRestaurant(this.restaurantId).subscribe((response) => {
      this.autopilotStatus = response as IAutopilot;
      console.log("this.autopilotStatus: ", this.autopilotStatus);
      if (this.autopilotStatus === null) {
        this.createAutopilotStatus(this.restaurantId);
      }
    });
    if (this.autopilotStatus) {
      this.loadingStatus = false;
    } else {
      this.noResult = 'No data found';
      this.loadingStatus = false;
    }
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

  id!: number;
  ingredientName!: string;
  unitOfStock!: string;
  categoryId!: number;
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
  loadingStatus = true;

  tableTitle = 'Ordered By Autopilot';
  tableFooter = '';
  noResult = 'Loading...';
  showQuickJumper = true;
  hidePaginationOnSinglePage = true;

  showDeleteButton = true;
  showEditButton = true;
  showAddButton = true;
  
}