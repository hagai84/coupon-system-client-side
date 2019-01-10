import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { LogInBean } from '../models/logInBean';
import { HeaderComponent } from '../components/header/header.component';
import { Router, ActivatedRoute } from '@angular/router';
import { UtilService } from './util.service';
import { LoginApiService } from './api/login-api.service';
import { CompanyService } from './reources/company.service';
import { CustomerService } from './reources/customer.service';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  userBean:LogInBean;
  public isFinishLogIn: boolean = false;

  constructor(private companyService: CompanyService, private http: HttpClient, private loginApi: LoginApiService, private util: UtilService, private cookieService: CookieService, private customerService: CustomerService, private router: Router) {
    // console.log("Login Service Constructor"+ (Math.random()*1000));
    this.checkLogin();
  }

   isLoggedIn():boolean {
    if (sessionStorage.getItem("isLogin")&&this.isFinishLogIn == true){
      return true;
    }else{
      return false;
    }
  }
  
  public submitLogin(loginBean: LogInBean) {
    this.isFinishLogIn = false;
    const ob = this.loginApi.login(loginBean);
    ob.subscribe(
      userId => {
        loginBean.userId=userId;
        this.afterLogIn(loginBean);
        this.isFinishLogIn = true;
      },
      error => {
        this.isFinishLogIn = true;
        this.util.PrintErrorToCustomer(error);
      });
    }
    
    async checkLogin():Promise<boolean> {
      this.isFinishLogIn = false;
      if(sessionStorage.getItem("isLogin")&&localStorage.getItem("isLogin")){
        this.isFinishLogIn = true;
          return true;
      }
      if(localStorage.getItem("rememberMe")||localStorage.getItem("isLogin")){
        const userBean = <LogInBean>await this.loginApi.check();        
        if(userBean.userId!=-1){
          this.userBean=userBean;
          this.afterLogIn(userBean);
          this.isFinishLogIn = true;
          return true;
        }
      }else{
        this.isFinishLogIn = true;
        return false;
      }
    }
    
  afterLogIn(userBean:LogInBean) {
    if (userBean.userType == "CUSTOMER") {      
      this.customerService.setCustomerData(userBean.userId);
      // this.router.navigate(['/customer-coupons']);
    }
    if (userBean.userType == "COMPANY") {
      this.companyService.setCompanyData(userBean.userId);
      // this.router.navigate(['/company-coupons']);
    }
    if (userBean.userType == "ADMIN") {
      sessionStorage.setItem('userName', 'ADMIN');
      this.router.navigate(['/coupons']);
    }
    this.setUserId(userBean.userId);
    this.setUserType(userBean.userType);
    this.setIsLogin(true);
    if(userBean.rememberMe=="true"){
      localStorage.setItem("rememberMe","true");
    }
  }
  
  logout() {
    if(localStorage.getItem("isLogin")){
      const ob = this.loginApi.logout();
    ob.subscribe(
      
      () => {
        localStorage.setItem("isLogout",Date.now().toString());  
        sessionStorage.clear();
        localStorage.removeItem("isLogin");
        localStorage.removeItem("rememberMe");
        this.router.navigate(['../coupons']); 
      },
      error => {
        this.util.PrintErrorToCustomer(error);
      });
    }else{
      sessionStorage.clear();
      this.router.navigate(['../coupons']); 
    }
  }
  
  setIsLogin(isLogin: boolean) {
    sessionStorage.setItem("isLogin", String(isLogin));
    localStorage.setItem("isLogin","true");
  }
  setUserId(userId: Number) {
    sessionStorage.setItem("userId", String(userId));
  }
  setUserType(userType: string) {
    sessionStorage.setItem("userType", userType);
  }
  
}
