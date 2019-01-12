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
import { AllCouponsComponent } from '../components/content/coupons/all-coupons-lyout/all-coupons.component';
import { ChangePasswordComponent } from '../components/content/deshboard/customer-deshboard/change-password/change-password.component';
import { CompanyProfileComponent } from '../components/content/deshboard/company-deshboard/company-profile/company-profile.component';
import { CreateProductComponent } from '../components/content/deshboard/company-deshboard/create-product/create-product.component';
import { GuestGuardServiceService } from '../services/gurds/guest-guard-service.service';
import { CustomerGuardServiceService } from '../services/gurds/customer-guard-service.service';
import { CompanyGuardServiceService } from '../services/gurds/company-guard-service.service';
import { LoginGurardServiceService } from '../services/gurds/login-gurard-service.service';
import { EditProductComponent } from '../components/content/deshboard/company-deshboard/edit-product/edit-product.component';
import { AdminGuardService } from '../services/gurds/admin-guard.service';
import { CompaniesTableComponent } from '../components/content/deshboard/admin-dashboard/companies-table/companies-table.component';
import { CustomersTableComponent } from '../components/content/deshboard/admin-dashboard/customers-table/customers-table.component';

const routes: Routes = [
  { path: "login", canActivate:[GuestGuardServiceService], component: LoginComponent },
  { path: "coupons", component: AllCouponsComponent },
  { path: "customer-coupons", canActivate:[LoginGurardServiceService, CustomerGuardServiceService], component:  AllCouponsComponent },
  { path: "company-coupons", canActivate:[LoginGurardServiceService, CompanyGuardServiceService], component:  AllCouponsComponent },
  { path: "coupon", component: CouponComponent },
  { path: "cart", component: CartComponent },
  { path: "thank-you", component: ThankYouComponent },
  { path: "register", canActivate:[GuestGuardServiceService],component: RegisterComponent },
  { path: "dashboard", component: DashboardLyoutComponent, children:
   [
      { path: "user-profile", canActivate:[LoginGurardServiceService, CustomerGuardServiceService], component: UserProfileComponent },
      { path: "company-profile", canActivate:[LoginGurardServiceService, CompanyGuardServiceService], component: CompanyProfileComponent },
      { path: "change-Password", canActivate:[LoginGurardServiceService], component: ChangePasswordComponent},
      { path: "customer-Password", canActivate:[LoginGurardServiceService, AdminGuardService], component: ChangePasswordComponent},
      { path: "company-Password", canActivate:[LoginGurardServiceService, AdminGuardService], component: ChangePasswordComponent},
      { path: "create-product", canActivate:[LoginGurardServiceService, CompanyGuardServiceService], component: EditProductComponent},
      { path: "edit-product", canActivate:[LoginGurardServiceService, CompanyGuardServiceService], component: EditProductComponent},
      { path: "customers-table", canActivate:[LoginGurardServiceService, AdminGuardService], component: CustomersTableComponent },
      { path: "companies-table", canActivate:[LoginGurardServiceService, AdminGuardService], component: CompaniesTableComponent },

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
