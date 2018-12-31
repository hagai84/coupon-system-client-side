import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-user-menue',
  templateUrl: './user-menue.component.html',
  styleUrls: ['./user-menue.component.css']
})
export class UserMenueComponent implements OnInit {

  constructor(public customerService: CustomerService, public loginService: LoginService ) { }

  ngOnInit() {
  }

}
