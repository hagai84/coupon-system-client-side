import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '../components/content/login/login.component';
import { CouponComponent } from '../components/content/coupon/coupon.component';
import { CartComponent } from '../components/content/cart/cart.component';
import { RegisterComponent } from '../components/content/login/register/register.component';
import { ThankYouComponent } from '../components/content/massagesToUser/thankYouForBoying/thank-you.component';
import { DashboardLyoutComponent } from '../components/content/deshboard/dashboard-lyout/dashboard-lyout.component';
import { UserProfileComponent } from '../components/content/deshboard/customer-deshboard/user-profile/user-profile.component';
import { LoginGurardServiceService } from '../services/login-gurard-service.service';
import { AllCouponsComponent } from '../components/content/coupons/all-coupons-lyout/all-coupons.component';
import { DefaultUrlHandlingStrategy } from '@angular/router/src/url_handling_strategy';
import { ChangePasswordComponent } from '../components/content/deshboard/customer-deshboard/change-password/change-password.component';
import { CompanyProfileComponent } from '../components/content/deshboard/company-deshboard/company-profile/company-profile.component';

const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "coupons", component: AllCouponsComponent },
  { path: "customer-coupons", canActivate:[LoginGurardServiceService], component:  AllCouponsComponent },
  { path: "company-coupons", canActivate:[LoginGurardServiceService], component:  AllCouponsComponent },
  { path: "coupon", component: CouponComponent },
  { path: "cart",  component: CartComponent },
  { path: "thank-you", component: ThankYouComponent },
  { path: "register", component: RegisterComponent },
  { path: "dashboard", component: DashboardLyoutComponent, children:
   [
      { path: "user-profile", canActivate:[LoginGurardServiceService], component: UserProfileComponent },
      { path: "company-profile", canActivate:[LoginGurardServiceService], component: CompanyProfileComponent },
      { path: "change-Password", canActivate:[LoginGurardServiceService], component: ChangePasswordComponent}
   ]
  },
  {path: "", redirectTo: "coupons",pathMatch: "full"},




  
  {path: "**", redirectTo: "https://www.youtube.com/watch?v=t3otBjVZzT0"}
];




@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ]
})
export class RoutingModule { }
