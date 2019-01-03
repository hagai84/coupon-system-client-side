import { Component, OnInit } from '@angular/core';
import { CompanyBean } from 'src/app/models/CompanyBean';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { UtilService } from 'src/app/services/util.service';
import { CompanyApiService } from 'src/app/services/api/company-api.service';

@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.css']
})
export class CompanyProfileComponent implements OnInit {
  companyBean: CompanyBean
  public myStorage: Storage = sessionStorage;
  constructor(private router: Router, public loginService: LoginService, private util: UtilService, private companyApiService: CompanyApiService) { }

  ngOnInit() {
    this.companyBean = JSON.parse(sessionStorage.getItem("companyBean"));
  }

  updateData() {
    const ob = this.companyApiService.updateCompany(this.companyBean);
    ob.subscribe(
      () => {
        this.customerService.setCustomerData(Number(sessionStorage.getItem("customerId")));
      },
      error => {
        this.util.PrintErrorToCustomer(error);
      });
  }
  
  deleteCustomer(){
    const ob = this.customerApiService.deleteCustomer(sessionStorage.getItem("customerId"));
    ob.subscribe(
      () => {
        this.loginService.logout();
        alert("customer deleted sucsessfully")
      },
      error => {
        this.util.PrintErrorToCustomer(error);
      });


  }

}
