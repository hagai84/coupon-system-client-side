import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '../components/content/login/login.component';
import { CouponComponent } from '../components/content/coupon/coupon.component';
import { CartComponent } from '../components/content/cart/cart.component';
import { RegisterComponent } from '../components/content/login/register/register.component';
import { CustomerCouponsComponent } from '../components/content/coupons/customer-coupons/customer-coupons.component';
import { ThankYouComponent } from '../components/content/massagesToUser/thankYouForBoying/thank-you.component';
import { DashboardLyoutComponent } from '../components/content/deshboard/dashboard-lyout/dashboard-lyout.component';
import { AllCouponsComponent } from '../components/content/coupons/all-syte-coupons/all-coupons.component';
import { UserProfileComponent } from '../components/content/deshboard/customer-deshboard/user-profile/user-profile.component';

const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "coupons", component: AllCouponsComponent },
  { path: "customer-coupons", component: CustomerCouponsComponent },
  { path: "coupon", component: CouponComponent },
  { path: "cart", component: CartComponent },
  { path: "thank-you", component: ThankYouComponent },
  { path: "register", component: RegisterComponent },
  { path: "dashboard", component: DashboardLyoutComponent, children:
   [
      { path: "user-profile", component: UserProfileComponent }
    ]
  },


];




@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ]
})
export class RoutingModule { }
