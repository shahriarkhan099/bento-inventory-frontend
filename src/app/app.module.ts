// Angular core modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Ng-Zorro-Antd modules
import { IconsProviderModule } from './icons-provider.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { CommonModule, registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';

// For Form
import { NzFormModule } from 'ng-zorro-antd/form'; // For Form
import { NzInputModule } from 'ng-zorro-antd/input'; // For Form
import { NzUploadModule } from 'ng-zorro-antd/upload'; // For Form
import { NzModalModule } from 'ng-zorro-antd/modal'; // For Form

// For Drawer
import { NzDrawerModule } from 'ng-zorro-antd/drawer'; // For Drawer
import { NzSelectModule } from 'ng-zorro-antd/select'; // For Drawer
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker'; // For Drawer

// For Popconfirm
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm'; // For Popconfirm

// Pages
import { AppComponent } from './app.component';
import { InventoryIngredientsComponent } from './pages/inventory-ingredients/inventory-ingredients.component';
import { HomeComponent } from './component/home/home.component';
import { OrderHistoryComponent } from './pages/order-history/order-history.component';
import { OrderSuggestionsComponent } from './pages/order-suggestions/order-suggestions.component';
import { TrackWastageComponent } from './pages/track-wastage/track-wastage.component';
import { PlaceOrdersComponent } from './pages/place-orders/place-orders.component';
import { OrderStatusComponent } from './pages/order-status/order-status.component';
import { ScheduleOrderComponent } from './pages/schedule-order/schedule-order.component';
import { SupplierListComponent } from './pages/supplier-list/supplier-list.component';
import { OnPlatformSupplierComponent } from './pages/on-platform-supplier/on-platform-supplier.component';
import { FooterComponent } from './component/footer/footer.component';
import { HeaderComponent } from './component/header/header.component';
import { DeliveryBoxesComponent } from './pages/delivery-boxes/delivery-boxes.component';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    InventoryIngredientsComponent,
    HomeComponent,
    OrderHistoryComponent,
    OrderSuggestionsComponent,
    TrackWastageComponent,
    PlaceOrdersComponent,
    OrderStatusComponent,
    ScheduleOrderComponent,
    SupplierListComponent,
    OnPlatformSupplierComponent,
    FooterComponent,
    HeaderComponent,
    DeliveryBoxesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IconsProviderModule,
    NzLayoutModule,
    NzMenuModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzTableModule,
    NzButtonModule,
    FormsModule,
    CommonModule,
    NzDrawerModule,
    NzSelectModule,
    NzDatePickerModule,
    NzFormModule,
    NzInputModule,
    ReactiveFormsModule,
    NzUploadModule,
    NzModalModule,
    NzPopconfirmModule,
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent],
})
export class AppModule {}
