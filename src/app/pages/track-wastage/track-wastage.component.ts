import { Component, Input, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import {
  NzTablePaginationPosition,
  NzTablePaginationType,
  NzTableSize,
} from 'ng-zorro-antd/table';

import { WastageLogService } from '../../services/wastage-log/wastage-log.service';
import { WasteLog } from '../../models/waste-log.model';
import { sortByCreatedAt } from '../../utils/sortUtils';
import { formatDateToString } from '../../utils/formatDateUtils';

@Component({
  selector: 'app-track-wastage',
  templateUrl: './track-wastage.component.html',
  styleUrl: './track-wastage.component.css',
})
export class TrackWastageComponent implements OnInit {
  listOfWasteLog: WasteLog[] = [];

  constructor(
    private wastageLogService: WastageLogService,
    private message: NzMessageService
  ) {}

  //Have to make the restaurant id dynamic
  @Input() restaurantId: number = 1;

  ngOnInit(): void {
    this.subscribeToIngredientChanges();
    this.loadAllWasteLogs(this.restaurantId);
  }

  private subscribeToIngredientChanges() {
    this.wastageLogService.refreshNeeded$.subscribe(() => {
      this.loadAllWasteLogs(this.restaurantId);
    });
  }

  private loadAllWasteLogs(restaurantId: number) {
    this.wastageLogService.getAllWasteLogs(restaurantId).subscribe({
      next: (data) => {
        this.listOfWasteLog = data.map((wastageLog) => ({
          ...wastageLog,
          purchaseQuantity: wastageLog.unitOfStock === "gm" ? 
          (wastageLog.totalQuantity / 1000) : wastageLog.unitOfStock === "ml" ? (wastageLog.totalQuantity / 1000) : wastageLog.totalQuantity,
          unitOfStock: wastageLog.unitOfStock === "gm" ? "kg" : wastageLog.unitOfStock === "ml" ? "litre" : wastageLog.unitOfStock,
          totalCost: Number((wastageLog.totalCost / 100).toFixed(2)),
          costPerUnit: Number((wastageLog.totalCost / 100).toFixed(2)) / wastageLog.totalQuantity,
          shelfLifeInDays: (new Date(wastageLog.createdAt)).getDay() - (new Date(wastageLog.boughtAt)).getDay(),
          boughtAt: formatDateToString(new Date(wastageLog.boughtAt)),
          expirationDate: formatDateToString(new Date(wastageLog.createdAt)),
        }));

        sortByCreatedAt(this.listOfWasteLog);
        console.log('WasteLog data loaded', this.listOfWasteLog);
        
      },
      error: (error) => {
        console.error('Error fetching wastageLog data', error);
        this.message.error('Failed to fetch wastageLog data. Please try again.');
      },
    });
  }

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

  tableTitle = 'Current Wastage Overview';
  tableFooter = '';
  noResult = 'No Data Present';
  showQuickJumper = true;
  hidePaginationOnSinglePage = true;
}
