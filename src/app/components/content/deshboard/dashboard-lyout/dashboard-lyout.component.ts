import { Component, OnInit } from '@angular/core';
import { CustomerApiService } from 'src/app/services/api/customer-api.service';
import { LoginService } from 'src/app/services/login.service';
import { MenuList } from 'src/app/models/MenuList';
import { CustomerService } from 'src/app/services/reources/customer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-lyout',
  templateUrl: './dashboard-lyout.component.html',
  styleUrls: ['./dashboard-lyout.component.css']
})
export class DashboardLyoutComponent implements OnInit {
  public myStorage :Storage = sessionStorage;

  public userName:String;
  menuList: MenuList[] = [];
  constructor(public customerService: CustomerService, private loginService: LoginService, private router:Router) { }

  ngOnInit() {
    this.userName = sessionStorage.getItem("userName");
    if (sessionStorage.getItem("userType") == "CUSTOMER") {
      // this.userName = sessionStorage.getItem("customerName");
      this.buildCustomerMenuList();
    } else if (sessionStorage.getItem("userType") == "COMPANY") {
      this.buildCompanyMenuList();
      // this.userName = sessionStorage.getItem("companyName");
    } else if (sessionStorage.getItem("userType") == "ADMIN") {
      this.buildAdminMenuList();
      // this.userName = "Admin";   
      this.router.events.subscribe((val) => {
        // see also 
        this.buildAdminMenuList();

        // console.log(val); 
    });
    }
    else {
      this.buildguestMenuList();
      this.userName = "Guest";
    }
  }


  buildCustomerMenuList() {
    this.menuList.push(new MenuList("Profile","user-profile"));
    this.menuList.push(new MenuList("Change Password","change-Password"));
    this.menuList.push(new MenuList("Account Setting","settings"));
    this.menuList.push(new MenuList("Purchase History","history"));
  }
  buildCompanyMenuList() {
    this.menuList.push(new MenuList("Profile","company-profile"));
    this.menuList.push(new MenuList("Change Password","change-Password"));
    this.menuList.push(new MenuList("create new product","create-product"));
    this.menuList.push(new MenuList("Account Setting","settings"));
    this.menuList.push(new MenuList("selles History","history"));
    this.menuList.push(new MenuList("Statistics","statistics"));
  }
  buildAdminMenuList() {
    this.menuList=[];
    this.menuList.push(new MenuList("Customers Table","customers-table"));
    const customerId = sessionStorage.getItem('customerId');
    if(customerId!=null){
      this.menuList.push(new MenuList("Customer:" + customerId,"user-profile"));    
      this.menuList.push(new MenuList("Change Password","customer-Password"));
    }
    this.menuList.push(new MenuList("Companies Table","companies-table"));
    const companyId = sessionStorage.getItem('companyId');
    if(companyId!=null){
      this.menuList.push(new MenuList("Company:" + companyId,"company-profile"));    
      this.menuList.push(new MenuList("Change Password","company-Password"));    
      this.menuList.push(new MenuList("Create new Coupon", "create-product"));
    }
    // this.menuList.push(new MenuList("Profile","profile"));
    // this.menuList.push(new MenuList("Change Password","change-Password"));
    // this.menuList.push(new MenuList("Account Setting","settings"));
    // this.menuList.push(new MenuList("Statistics","statistics"));
  }
  buildguestMenuList() {
    this.menuList.push(new MenuList("Terms Of Use","Terms-of-use"));
    this.menuList.push(new MenuList("Private Policy","private-policy"));
  }

}
