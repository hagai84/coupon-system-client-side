import { Component, OnInit } from '@angular/core';
import { CustomerApiService } from 'src/app/services/api/customer-api.service';
import { LoginService } from 'src/app/services/login.service';
import { CustomerService } from 'src/app/services/customer.service';
import { MenuList } from 'src/app/models/MenuList';
import { settings } from 'cluster';

@Component({
  selector: 'app-dashboard-lyout',
  templateUrl: './dashboard-lyout.component.html',
  styleUrls: ['./dashboard-lyout.component.css']
})
export class DashboardLyoutComponent implements OnInit {
  menuList: MenuList[] = [];
  constructor(public customerService: CustomerService, private loginService: LoginService) { }

  ngOnInit() {
    if (this.loginService.userType == "CUSTOMER") {
      this.buildCustomerMenuList();
    } else if (this.loginService.userType == "COMPANY") {
      this.buildCompanyMenuList();
    } else if ((this.loginService.userType == "ADMIN")) {
      this.buildAdminMenuList();
    }
    else {
      this.buildguestMenuList();
    }
  }


  buildCustomerMenuList() {
    this.menuList.push(new MenuList("Profile","user-profile"));
    this.menuList.push(new MenuList("Account Setting","settings"));
    this.menuList.push(new MenuList("Purchase History","history"));
  }
  buildCompanyMenuList() {
    this.menuList.push(new MenuList("Profile","profile"));
    this.menuList.push(new MenuList("Account Setting","settings"));
    this.menuList.push(new MenuList("create new product","create-product"));
    this.menuList.push(new MenuList("selles History","history"));
    this.menuList.push(new MenuList("Statistics","statistics"));
  }
  buildAdminMenuList() {
    this.menuList.push(new MenuList("Profile","profile"));
    this.menuList.push(new MenuList("Account Setting","settings"));
    this.menuList.push(new MenuList("Statistics","statistics"));
  }
  buildguestMenuList() {
    this.menuList.push(new MenuList("Terms Of Use","Terms-of-use"));
    this.menuList.push(new MenuList("Private Policy","private-policy"));
  }

}
