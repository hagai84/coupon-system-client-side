import { Component, OnInit } from '@angular/core';
import { CustomerBean } from 'src/app/models/customerbean';
import { CustomerService } from 'src/app/services/customer.service';
import { CompanyBean } from 'src/app/models/CompanyBean';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public userName: string;
  public userPassword: string;
  public userType: string = "CUSTOMER";
  public userEmail: string;

  constructor(private companyService: CompanyService, private customerService: CustomerService) { }

  ngOnInit() {
  }
  register() {
    if (this.userType == "CUSTOMER") {
      var customerBean = new CustomerBean(123, this.userName, this.userPassword, []);
      this.customerService.register(customerBean);
      return;
    }
    if (this.userType == "COMPANY") {
      var companyBean = new CompanyBean(123, this.userName, this.userPassword, this.userEmail ,[])
      
      this.companyService.register(companyBean);
      return;
    }
  }
}
