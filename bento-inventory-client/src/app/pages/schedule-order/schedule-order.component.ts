import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Inject } from '@angular/core';

interface ItemData {
  id: string;
  name: string;
  mobile: string;
  address: string;
}

@Component({
  selector: 'app-schedule-order',
  templateUrl: './schedule-order.component.html',
  styleUrl: './schedule-order.component.css'
})

export class ScheduleOrderComponent implements OnInit {

  validateForm!: FormGroup;

  current: number = 1;

  i = 0;
  rowData: object = {};
  editId: string | null = null;
  listOfData: ItemData[] = [{
    id: '001',
    name: 'John Doe 1',
    mobile: '13120257131',
    address: 'Shanghai',
  }, {
    id: '002',
    name: 'John Doe 2',
    mobile: '13120257132',
    address: 'Beijing',
  },{
    id: '003',
    name: 'John Doe 3',
    mobile: '13120257131',
    address: 'Guangzhou',
  }];

  startEdit(rowData: any): void {
    for (const i in this.validateForm.controls) {
      if (this.validateForm.controls.hasOwnProperty(i)) {
        this.validateForm.controls[i].markAsDirty();
        this.validateForm.controls[i].updateValueAndValidity();
      }
    }
    if (!this.validateForm.valid) {
      this.message.create('error', 'You can only edit one row at a time')
    } else {
      this.rowData = rowData;
      this.editId = rowData.id;
    }
  }

  stopEdit(row: any): void {
    // Cancel - has a bug, currently not displayed
    for (let index = 0; index < this.validateForm.value.aliases.length; index++) {
      const element = this.validateForm.value.aliases[index];
      if (element.id == row.id) {
        this.validateForm.value.aliases[index] = this.rowData;
        console.log('this.validateForm.value.aliases', this.validateForm.value.aliases)
      }
    }
    let tempList = this.validateForm.value.aliases;
    this.validateForm.patchValue({
      aliases: tempList
    })
    this.editId = null;
  }

  addRow(): void {
    let allowAdd = false;
    for (let index = 0; index < this.validateForm.value.aliases.length; index++) {
      const element = this.validateForm.value.aliases[index];
      if (element.name && element.mobile && element.address) {
        allowAdd = true;
      } else {
        allowAdd = false;
      }
    }
    if (allowAdd) {
      let editId = JSON.stringify(Date.now());
      this.aliases.push(this.fb.group({
        id: editId,
        name: ['', [Validators.required]],
        mobile: ['', [Validators.required, this.confirmationValidator]],
        address: ['', [Validators.required]],
      }))
      this.editId = editId;
    } else {
      this.message.create('error', 'You can only add one row at a time')
    }
  }

  saveRow() {
    if (this.validateForm.valid) {
      this.editId = null;
      console.log('value', this.validateForm.value.aliases)
    } else {
      this.message.create('error', 'Please complete the information for this row')
    }
  }

  submitData() {
    for (const i in this.validateForm.controls) {
      if (this.validateForm.controls.hasOwnProperty(i)) {
        this.validateForm.controls[i].markAsDirty();
        this.validateForm.controls[i].updateValueAndValidity();
      }
    }
    if (!this.validateForm.valid) {
      this.message.create('error', 'Please fill in all information')
    }
    if (this.validateForm.valid) {
      console.log('submit:', this.validateForm.value.aliases)
    }
  }

  deleteRow(index: any): void {
    this.removeFormArrayItem(index);
    console.log('this.validateForm.value.aliases', this.validateForm.value.aliases)
  }

  get aliases() {
    return this.validateForm.get('aliases') as FormArray;
  }

  // Remove form array item
  removeFormArrayItem(index: any) {
    this.aliases.removeAt(index);
  }

  // Generate unique ID
  getUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (!(/^1[3456789]\d{9}$/.test(control.value))) {
      return { confirm: true, error: true };
    }
    return {};
  };

  constructor(
    private fb: FormBuilder,
    @Inject(NzMessageService) private message: NzMessageService
  ) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      aliases: this.fb.array([])
    })
    for (let index = 0; index < this.listOfData.length; index++) {
      const element = this.listOfData[index];
      this.aliases.push(this.fb.group({
        id: element.id,
        name: [element.name, [Validators.required]],
        mobile: [element.mobile, [Validators.required, this.confirmationValidator]],
        address: [element.address, [Validators.required]],
      }))
    }
    console.log(this.aliases.controls)
  }

}
