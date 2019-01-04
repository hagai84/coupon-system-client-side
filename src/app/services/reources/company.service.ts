import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CompanyBean } from 'src/app/models/CompanyBean';
import { UtilService } from '../util.service';
import { CompanyApiService } from '../api/company-api.service';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  companyBean:CompanyBean;

  constructor( private router: Router,private util: UtilService, private companyApi: CompanyApiService) { }
  
  
  public register(companyBean:CompanyBean){
    const ob = this.companyApi.createCompany(companyBean);
    ob.subscribe(
      userId=> {
        window.alert("register sucsses please login");
        this.router.navigate(['/login']);
      },
      error => {
        this.util.PrintErrorToCustomer(error);
      });
  }


  public setCompanyData(customerId: Number) {
    const ob = this.companyApi.getCompanyData(customerId);
    ob.subscribe(
      companyBean => {
        this.companyBean=companyBean;
        sessionStorage.setItem("companyName", companyBean.compName);
        sessionStorage.setItem("customerId", String(companyBean.id));
        sessionStorage.setItem("customerEmail", String(companyBean.email));
        sessionStorage.setItem("customerBean", JSON.stringify(companyBean))
      },
      error => {
        this.util.PrintErrorToCustomer(error);
      });
  }




}
