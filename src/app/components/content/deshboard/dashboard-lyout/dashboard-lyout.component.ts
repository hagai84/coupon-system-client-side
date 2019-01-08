import { Component, OnInit } from '@angular/core';
import { CustomerApiService } from 'src/app/services/api/customer-api.service';
import { LoginService } from 'src/app/services/login.service';
import { MenuList } from 'src/app/models/MenuList';
import { CustomerService } from 'src/app/services/reources/customer.service';

@Component({
  selector: 'app-dashboard-lyout',
  templateUrl: './dashboard-lyout.component.html',
  styleUrls: ['./dashboard-lyout.component.css']
})
export class DashboardLyoutComponent implements OnInit {
  public myStorage :Storage = sessionStorage;

  public customerName:String;
  menuList: MenuList[] = [];
  constructor(public customerService: CustomerService, private loginService: LoginService) { }

  ngOnInit() {
    if (sessionStorage.getItem("userType") == "CUSTOMER") {
      this.buildCustomerMenuList();
      this.customerName = sessionStorage.getItem("customerName");
    } else if (sessionStorage.getItem("userType") == "COMPANY") {
      this.buildCompanyMenuList();
      this.customerName = sessionStorage.getItem("companyName");
    } else if (sessionStorage.getItem("userType") == "ADMIN") {
      this.buildAdminMenuList();
      this.customerName = "Admin";
      
    }
    else {
      this.buildguestMenuList();
      this.customerName = "Guest";
    }
  }


  buildCustomerMenuList() {
    this.menuList.push(new MenuList("Profile","user-profile"));
    this.menuList.push(new MenuList("Change Passwprd","change-Password"));
    this.menuList.push(new MenuList("Account Setting","settings"));
    this.menuList.push(new MenuList("Purchase History","history"));
  }
  buildCompanyMenuList() {
    this.menuList.push(new MenuList("Profile","profile"));
    this.menuList.push(new MenuList("Change Passwprd","change-Password"));
    this.menuList.push(new MenuList("Account Setting","settings"));
    this.menuList.push(new MenuList("create new product","create-product"));
    this.menuList.push(new MenuList("selles History","history"));
    this.menuList.push(new MenuList("Statistics","statistics"));
  }
  buildAdminMenuList() {
    this.menuList.push(new MenuList("Customers Table","customers-table"));
    this.menuList.push(new MenuList("Companies Table","companies-table"));
    this.menuList.push(new MenuList("Profile","profile"));
    this.menuList.push(new MenuList("Account Setting","settings"));
    this.menuList.push(new MenuList("Statistics","statistics"));
  }
  buildguestMenuList() {
    this.menuList.push(new MenuList("Terms Of Use","Terms-of-use"));
    this.menuList.push(new MenuList("Private Policy","private-policy"));
  }

}
