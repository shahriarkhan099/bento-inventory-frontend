import { Component, Input, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import {
  NzTablePaginationPosition,
  NzTablePaginationType,
  NzTableSize,
} from 'ng-zorro-antd/table';
import { sortByCreatedAt } from '../../utils/sortUtils';
import { formatDateToString } from '../../utils/formatDateUtils';
import { DeliveryBox } from '../../models/delivery-box.model';
import { DeliveryBoxService } from '../../services/delivery-box/delivery-box.service';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-delivery-boxes',
  templateUrl: './delivery-boxes.component.html',
  styleUrl: './delivery-boxes.component.css',
})
export class DeliveryBoxesComponent implements OnInit {
  listOfBoxes: DeliveryBox[] = [];
  unitOfDimentionList = ['cm', 'inches'];
  waterproofList = ['Yes', 'No'];
  // restaurantId: number = 1 if not entering from Bento
  restaurantId: number = 1;

  constructor(private deliveryBoxService: DeliveryBoxService, private message: NzMessageService, private authService: AuthService) {}

  ngOnInit(): void {
    this.getRestaurantId();
    this.subscribeToDeliveyBoxChanges();
    // this.loadAllDeliveryBoxes(this.restaurantId);
  }

  private subscribeToDeliveyBoxChanges() {
    this.deliveryBoxService.refreshNeeded$.subscribe(() => {
      this.loadAllDeliveryBoxes(this.restaurantId);
    });
  }

  private getRestaurantId() {
    this.authService.getRestaurantId().subscribe({
      next: (data) => {
        console.log('resId', data)
        this.restaurantId = data.message;
        this.loadAllDeliveryBoxes(this.restaurantId);
      },
      error: (error) => {
        console.error('Error fetching restaurant id', error);
        this.message.error('Failed to fetch restaurant id. Please try again.');
      },
    });
  }

  private loadAllDeliveryBoxes(restaurantId: number) {
    this.deliveryBoxService.getDeliveryBoxes(restaurantId).subscribe({
      next: (data) => {
        this.listOfBoxes = data.map((ingredient) => ({
          ...ingredient,
          costPerUnit: ingredient.costPerUnit
            ? Number(ingredient.costPerUnit.toFixed(2))
            : 0,
          updatedAt: formatDateToString(new Date(ingredient.updatedAt)),
        }));

        sortByCreatedAt(this.listOfBoxes);
        console.log('Ingredient data loaded', this.listOfBoxes);
      },
      error: (error) => {
        console.error('Error fetching ingredient data', error);
        this.message.error(
          'Failed to fetch ingredient data. Please try again.'
        );
      },
    });
  }

  createUpdateIngredient() {
    const newBox = {
      restaurantId: this.restaurantId,
      boxName: this.boxName,
      currentStockQuantity: this.currentStockQuantity,
      reorderPoint: this.reorderPoint,
      dimensions: this.dimensions,
      weightLimit: this.weightLimit,
      temperatureLimit: this.temperatureLimit,
      waterproof: this.waterproof,
    };

    console.log(newBox);

    if (this.isEdit) {
      this.deliveryBoxService.editDeliveryBox(this.id, newBox).subscribe({
        next: (res) => {
          console.log(res);
          this.message.success('Box Updated successfully.');
        },
        error: (error) => {
          console.error('Error updating Box:', error);
          this.message.error('Error updating Box. Please try again.');
        },
      });
    } else {
      this.deliveryBoxService.addDeliveryBox(newBox).subscribe({
        next: (res) => {
          console.log(res);
          this.message.success('Box Added successfully.');
        },
        error: (error) => {
          console.error('Error adding Box:', error);
          this.message.error('Error adding Box. Please try again.');
        },
      });
    }
  }

  onDelete(id: number): void {
    this.deliveryBoxService.deleteDeliveryBox(id).subscribe({
      next: () => {
        this.listOfBoxes = this.listOfBoxes.filter(
          (deliveryBox) => deliveryBox.id !== id
        );
        this.message.success('Box deleted successfully.');
      },
      error: (error) => {
        console.error(`Error deleting Box with ID ${id}`, error);
        this.message.success('Error deleting Box, please try again.');
      },
    });
  }

  onEdit(deliveryBox: any): void {
    this.visible = true;
    this.isEdit = true;

    this.id = deliveryBox.id;
    this.boxName = deliveryBox.boxName;
    this.currentStockQuantity = deliveryBox.currentStockQuantity;
    this.reorderPoint = deliveryBox.reorderPoint;
    this.dimensions = deliveryBox.dimensions;
    this.unitOfDimentions = deliveryBox.unitOfDimentions;
    this.weightLimit = deliveryBox.weightLimit;
    this.temperatureLimit = deliveryBox.temperatureLimit;
    this.waterproof = deliveryBox.waterproof;
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
    this.boxName = '';
    this.currentStockQuantity = '';
    this.reorderPoint = '';
    this.dimensions = '';
    this.unitOfDimentions = '';
    this.weightLimit = '';
    this.temperatureLimit = '';
    this.waterproof = '';
  }

  id!: number | any;
  boxName!: string;
  currentStockQuantity!: number | any;
  reorderPoint!: number | any;
  dimensions!: string;
  unitOfDimentions!: string;
  weightLimit!: number | any;
  temperatureLimit!: number | any;
  waterproof!: string;

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

  tableTitle = 'Current Delivery Boxes';
  tableFooter = '';
  noResult = 'No Delivery Box Present';
  showQuickJumper = true;
  hidePaginationOnSinglePage = true;

  showDeleteButton = true;
  showEditButton = true;
  showAddButton = true;
}
