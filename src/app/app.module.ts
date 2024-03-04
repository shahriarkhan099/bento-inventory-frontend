// Angular core modules
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
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
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzSpinModule } from 'ng-zorro-antd/spin';

// For Form
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzModalModule } from 'ng-zorro-antd/modal';

// For Drawer
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';

// For Popconfirm
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';

// Pages
import { AppComponent } from './app.component';
import { InventoryIngredientsComponent } from './pages/inventory-ingredients/inventory-ingredients.component';
import { OrderHistoryComponent } from './pages/order-history/order-history.component';
import { OrderSuggestionsComponent } from './pages/order-suggestions/order-suggestions.component';
import { TrackWastageComponent } from './pages/track-wastage/track-wastage.component';
import { PlaceOrdersComponent } from './pages/place-orders/place-orders.component';
import { OrderStatusComponent } from './pages/order-status/order-status.component';
import { SupplierListComponent } from './pages/supplier-list/supplier-list.component';
import { FooterComponent } from './component/footer/footer.component';
import { HeaderComponent } from './component/header/header.component';
import { DeliveryBoxesComponent } from './pages/delivery-boxes/delivery-boxes.component';
import { SpashLogoComponent } from './component/spash-logo/spash-logo.component';
import { AuthRedirectComponent } from './auth-redirect/auth-redirect.component';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { AuthInterceptorService } from './services/interceptors/auth/auth-interceptor.service';
import { TokenInterceptorService } from './services/interceptors/token/token-interceptor.service';
import { SearchPipe } from './pipe/search.pipe';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    InventoryIngredientsComponent,
    OrderHistoryComponent,
    OrderSuggestionsComponent,
    TrackWastageComponent,
    PlaceOrdersComponent,
    OrderStatusComponent,
    SupplierListComponent,
    FooterComponent,
    HeaderComponent,
    DeliveryBoxesComponent,
    SpashLogoComponent,
    AuthRedirectComponent,
    SearchPipe,
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
    NzPaginationModule,
    NzGridModule,
    NzDropDownModule,
    NzSpinModule,

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    { provide: NZ_I18N, useValue: en_US },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
