import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';


import { LyoutComponent } from '../components/lyout/lyout.component';
import { HeaderComponent } from '../components/header/header.component';
import { FooterComponent } from '../components/footer/footer.component';
import { LoginComponent } from '../components/content/login/login.component';
import { RoutingModule } from './routing.module';
import { LoginService } from '../services/login.service';
import { CustomerService } from '../services/customer.service';
import { CouponComponent } from '../components/content/coupon/coupon.component';
import { CartService } from '../services/cart.service';
import { CartComponent } from '../components/content/cart/cart.component';
import { UtilService } from '../services/util.service';
import { UserMenueComponent } from '../components/header/user-menue/user-menue.component';
import { LoginApiService } from '../services/api/login-api.service';
import { RegisterComponent } from '../components/content/login/register/register.component';
import { CouponsFilterComponent } from '../components/content/coupons/coupons-filter/coupons-filter.component';
import { ThankYouComponent } from '../components/content/massagesToUser/thankYouForBoying/thank-you.component';
import { DashboardLyoutComponent } from '../components/content/deshboard/dashboard-lyout/dashboard-lyout.component';
import { CouponApiService } from '../services/api/coupon-api.service';
import { CouponsComponent } from '../components/content/coupons/one-coupon-lyout/coupons.component';
import { UserProfileComponent } from '../components/content/deshboard/customer-deshboard/user-profile/user-profile.component';
import { CompanyApiService } from '../services/api/company-api.service';
import { CompanyService } from '../services/company.service';
import { AllCouponsComponent } from '../components/content/coupons/all-coupons-lyout/all-coupons.component';
import { LoginGurardServiceService } from '../services/login-gurard-service.service';

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
