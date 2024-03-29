import { Component, Input, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import {
  NzTablePaginationPosition,
  NzTablePaginationType,
  NzTableSize,
} from 'ng-zorro-antd/table';

import { SupplierListService } from '../../services/supplier-list/supplier-list.service';
import { ISupplier } from '../../models/supplier.model';
import { sortByCreatedAt } from '../../utils/sortUtils';
import { formatDateToString } from '../../utils/formatDateUtils';
import { LocalStorageService } from '../../services/localStorage/local-storage.service';

@Component({
  selector: 'app-supplier-list',
  templateUrl: './supplier-list.component.html',
  styleUrl: './supplier-list.component.css',
})
export class SupplierListComponent implements OnInit {
  listOfSuppliers: ISupplier[] = [];
  id!: number;
  name!: string;
  address!: string;
  contactNumber!: string;
  email!: string;
  label!: string;
  labelList: string[] = ['Premium', 'Preferred', 'Standard', 'Budget', 'New'];
  // restaurantId: number = 1 if not entering from Bento
  restaurantId: number = 1;

  constructor(private supplierListService: SupplierListService, private message: NzMessageService) {}

  ngOnInit(): void {
    this.subscribeToSupplierChanges();
    if (LocalStorageService.getRestaurantId()) {
      this.restaurantId = Number(LocalStorageService.getRestaurantId());
      this.loadAllSuppliers(this.restaurantId);
    } else {
      this.loadAllSuppliers(this.restaurantId);
    }
  }

  private subscribeToSupplierChanges() {
    this.supplierListService.refreshNeeded$.subscribe(() => {
      this.loadAllSuppliers(this.restaurantId);
    });
  }

  private loadAllSuppliers(restaurantId: number) {
    this.supplierListService.getSuppliers(restaurantId).subscribe({
      next: (data) => {
        this.listOfSuppliers = data.map((supplier) => ({
          ...supplier,
          updatedAt: formatDateToString(new Date(supplier.updatedAt)),
        }));

        sortByCreatedAt(this.listOfSuppliers);
        console.log('Supplier data loaded', this.listOfSuppliers);
        if (this.listOfSuppliers.length > 0) {
          this.totalNumberOfData = this.listOfSuppliers.length;
          this.loadingStatus = false;
        } else {
          this.noResult = 'No data found';
          this.loadingStatus = false;
        }

      },
      error: (error) => {
        console.error('Error fetching supplier data', error);
        this.message.error(
          'Failed to fetch supplier data. Please try again.'
        );
      },
    });
  }

  createUpdateSupplier() {
    const newSupplier = {
      restaurantId: this.restaurantId,
      name: this.name,
      address: this.address,
      contactNumber: this.contactNumber,
      email: this.email,
      label: this.label,
    };

    console.log(newSupplier);

    if (this.isEdit) {
      this.supplierListService.editSupplier(this.id, newSupplier).subscribe({
        next: (res) => {
          console.log(res);
          this.message.success('Supplier Updated successfully.');
        },
        error: (error) => {
          console.error('Error updating supplier:', error);
          this.message.error('Error updating supplier. Please try again.');
        },
      });
    } else {
      this.supplierListService.addSupplier(newSupplier).subscribe({
        next: (res) => {
          console.log(res);
          this.message.success('Supplier Added successfully.');
        },
        error: (error) => {
          console.error('Error adding supplier:', error);
          this.message.error('Error adding supplier. Please try again.');
        },
      });
    }
  }

  onDelete(id: number): void {
    this.supplierListService.deleteSupplier(id).subscribe({
      next: () => {
        this.listOfSuppliers = this.listOfSuppliers.filter(
          (supplier) => supplier.id !== id
        );
        this.message.success('Supplier deleted successfully.');
      },
      error: (error) => {
        console.error(`Error deleting supplier with ID ${id}`, error);
        this.message.success('Error deleting supplier, please try again.');
      },
    });
  }

  onEdit(supplier: ISupplier): void {
    this.visible = true;
    this.isEdit = true;

    this.id = supplier.id;
    this.name = supplier.name;
    this.address = supplier.address;
    this.contactNumber = supplier.contactNumber;
    this.email = supplier.email;
    this.label = supplier.label;
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
  loadingStatus = true;

  tableTitle = 'My Supplier List';
  tableFooter = '';
  noResult = 'Loading...';
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
    this.createUpdateSupplier();
    this.visible = false;
  }

  refreshFields(): void {
    this.id = 0;
    this.name = '';
    this.address = '';
    this.contactNumber = '';
    this.email = '';
    this.label = '';
  }
}
