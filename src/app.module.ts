import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';


import { LyoutComponent } from './app/components/lyout/lyout.component';
import { HeaderComponent } from './app/components/header/header.component';
import { FooterComponent } from './app/components/footer/footer.component';
import { LoginComponent } from './app/components/content/login/login.component';
import { RoutingModule } from './app/modules/routing.module';
import { LoginService } from './app/services/login.service';
import { CouponComponent } from './app/components/content/coupon/coupon.component';
import { CartService } from './app/services/cart.service';
import { CartComponent } from './app/components/content/cart/cart.component';
import { UtilService } from './app/services/util.service';
import { UserMenueComponent } from './app/components/header/user-menue/user-menue.component';
import { LoginApiService } from './app/services/api/login-api.service';
import { RegisterComponent } from './app/components/content/login/register/register.component';
import { CouponsFilterComponent } from './app/components/content/coupons/coupons-filter/coupons-filter.component';
import { ThankYouComponent } from './app/components/content/massagesToUser/thankYouForBoying/thank-you.component';
import { DashboardLyoutComponent } from './app/components/content/deshboard/dashboard-lyout/dashboard-lyout.component';
import { CouponApiService } from './app/services/api/coupon-api.service';
import { CouponsComponent } from './app/components/content/coupons/one-coupon-lyout/coupons.component';
import { UserProfileComponent } from './app/components/content/deshboard/customer-deshboard/user-profile/user-profile.component';
import { CompanyApiService } from './app/services/api/company-api.service';
import { AllCouponsComponent } from './app/components/content/coupons/all-coupons-lyout/all-coupons.component';
import { LoginGurardServiceService } from './app/services/gurds/login-gurard-service.service';
import { ChangePasswordComponent } from './app/components/content/deshboard/customer-deshboard/change-password/change-password.component';
import { CompanyProfileComponent } from './app/components/content/deshboard/company-deshboard/company-profile/company-profile.component';
import { CompanyMenuComponent } from './app/components/header/company-menu/company-menu.component';
import { CreateProductComponent } from './app/components/content/deshboard/company-deshboard/create-product/create-product.component';
import { CustomerService } from './app/services/reources/customer.service';
import { CompanyService } from './app/services/reources/company.service';
import { EditProductComponent } from './app/components/content/deshboard/company-deshboard/edit-product/edit-product.component';
import { CustomersTableComponent } from './app/components/content/customers-table/customers-table.component';
import { CompaniesTableComponent } from './app/components/content/companies-table/companies-table.component';

@NgModule({
  declarations: [
    LyoutComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    AllCouponsComponent,
    CouponsComponent,
    CouponsFilterComponent,
    CouponComponent,
    CartComponent,
    ThankYouComponent,
    UserMenueComponent,
    RegisterComponent,
    DashboardLyoutComponent,
    UserProfileComponent,
    ChangePasswordComponent,
    CompanyProfileComponent,
    CompanyMenuComponent,
    CreateProductComponent,
    EditProductComponent,
    CustomersTableComponent,
    CompaniesTableComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule,
    RouterModule, 
    RoutingModule,
    FormsModule,
    HttpClientModule,

  ],
  providers: [
    LoginService,
    CustomerService,
    LoginApiService,
    UtilService,
    CookieService,
    CustomerService,
    CouponApiService,
    CartService,
    CompanyApiService,
    CompanyService,
  ],

  bootstrap: [LyoutComponent]
})
export class AppModule { }
