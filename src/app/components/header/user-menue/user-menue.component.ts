import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { UtilService } from 'src/app/services/util.service';
import { CustomerService } from 'src/app/services/reources/customer.service';

@Component({
  selector: 'app-user-menue',
  templateUrl: './user-menue.component.html',
  styleUrls: ['./user-menue.component.css']
})
export class UserMenueComponent implements OnInit {
public myStorage :Storage = sessionStorage;
  constructor(public util : UtilService, public customerService: CustomerService, public loginService: LoginService ) { }

  ngOnInit() {
  }

}
