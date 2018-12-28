import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { LogInBean } from 'src/app/models/logInBean';
import { CookieService } from 'ngx-cookie-service';
import { CustomerBean } from 'src/app/models/customerbean';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public userName: string;
  public userPassword: string;
  public userType: string = "CUSTOMER";

  constructor(private customerService: CustomerService) { }

  ngOnInit() {
  }
  register() {
    var customerBean = new CustomerBean(123,this.userName, this.userPassword,[]);
    this.customerService.register(customerBean);
  }
}
