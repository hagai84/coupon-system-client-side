import { Component, OnInit } from '@angular/core';
import { CompanyBean } from 'src/app/models/CompanyBean';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { UtilService } from 'src/app/services/util.service';
import { CompanyApiService } from 'src/app/services/api/company-api.service';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.css']
})
export class CompanyProfileComponent implements OnInit {
  companyBean: CompanyBean
  public myStorage: Storage = sessionStorage;
  constructor(private comapnyService: CompanyService, private router: Router, public loginService: LoginService, private util: UtilService, private companyApiService: CompanyApiService) { }

  ngOnInit() {
    this.companyBean = JSON.parse(sessionStorage.getItem("companyBean"));
  }

  updateData() {
    const ob = this.companyApiService.updateCompany(this.companyBean);
    ob.subscribe(
      () => {
        this.comapnyService.setCompanyData(Number(sessionStorage.getItem("companyId")));
      },
      error => {
        this.util.PrintErrorToCustomer(error);
      });
  }
  
  deleteCompany(){
    const ob = this.companyApiService.deleteCompany(sessionStorage.getItem("customerId"));
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
