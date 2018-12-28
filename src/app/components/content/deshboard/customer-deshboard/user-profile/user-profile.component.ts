import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';
import { CustomerBean } from 'src/app/models/customerbean';
import { CustomerApiService } from 'src/app/services/api/customer-api.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
customerBean:CustomerBean 
  constructor(private customerApiService:CustomerApiService, private customerService: CustomerService) { }

  ngOnInit() {
    this.customerBean = new CustomerBean(this.customerService.customerId,this.customerService.customerName,"",[]);
  }

  updateData(){


  }

}
