import { Injectable } from '@angular/core';
import { CompanyBean } from '../models/CompanyBean';
import { CompanyApiService } from './api/company-api.service';
import { Router } from '@angular/router';
import { UtilService } from './util.service';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

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
}
