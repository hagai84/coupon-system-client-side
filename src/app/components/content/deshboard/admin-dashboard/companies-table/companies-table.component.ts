import { Component, OnInit } from '@angular/core';
import { CompanyBean } from 'src/app/models/CompanyBean';
import { CompanyApiService } from 'src/app/services/api/company-api.service';
import { UtilService } from 'src/app/services/util.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-companies-table',
  templateUrl: './companies-table.component.html',
  styleUrls: ['./companies-table.component.css']
})
export class CompaniesTableComponent implements OnInit {

  companies:CompanyBean[]=[];

  constructor(private companyApiService:CompanyApiService, private util:UtilService, private router:Router) { }

  ngOnInit() {
    const ob = this.companyApiService.getAllCompanies();
    ob.subscribe(
      companies => {
        this.companies=companies;
      },
      error => {
        this.util.PrintErrorToCustomer(error);
        this.router.navigate(['/coupons']);
      }
    ); 
  }

  companyProfile(index:number){
    sessionStorage.setItem('companyBean', JSON.stringify(this.companies[index]));
    sessionStorage.setItem('companyId', this.companies[index].id.toString());
    this.router.navigate(['/dashboard/company-profile']);
  }

  removeCompany(index:number){
    const ob = this.companyApiService.deleteCompany(this.companies[index].id);
    ob.subscribe(
      () => {
        
        alert("company deleted sucsessfully")
      },
      error => {
        this.util.PrintErrorToCustomer(error);
      });
  }
  

  companyCoupons(index:number){
    sessionStorage.setItem('companyId',this.companies[index].id.toString());
    this.router.navigate(['/company-coupons']);
  }
}
