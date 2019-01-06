import { Component, OnInit } from '@angular/core';
import { CompanyBean } from 'src/app/models/CompanyBean';
import { CustomerBean } from 'src/app/models/customerbean';
import { CustomerApiService } from 'src/app/services/api/customer-api.service';
import { UtilService } from 'src/app/services/util.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customers-table',
  templateUrl: './customers-table.component.html',
  styleUrls: ['./customers-table.component.css']
})
export class CustomersTableComponent implements OnInit {

  customers:CustomerBean[]=[];

  constructor(private customerApiService:CustomerApiService, private util:UtilService, private router:Router) { }

  ngOnInit() {
    const ob = this.customerApiService.getAllCustomers();
    ob.subscribe(
      customers => {
        this.customers=customers;
      },
      error => {
        this.util.PrintErrorToCustomer(error);
        this.router.navigate(['/coupons']);
      }
    ); 
  }

  customerProfile(index:number){
    sessionStorage.setItem('customerBean', JSON.stringify(this.customers[index]));
    this.router.navigate(['/dashboard/user-profile']);
  }

  removeCustomer(index:number){
    const ob = this.customerApiService.deleteCustomer(this.customers[index].id);
    ob.subscribe(
      () => {
        
        alert("customer deleted sucsessfully")
      },
      error => {
        this.util.PrintErrorToCustomer(error);
      });
  }

  customerCoupons(index:number){
    sessionStorage.setItem('customerId',this.customers[index].id.toString());
    this.router.navigate(['/customer-coupons']);
  }

  
}
