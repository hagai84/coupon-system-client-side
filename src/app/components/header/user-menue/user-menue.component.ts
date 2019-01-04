import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/services/res/reources/customer.service';
import { LoginService } from 'src/app/services/login.service';
import { UtilService } from 'src/app/services/util.service';

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
