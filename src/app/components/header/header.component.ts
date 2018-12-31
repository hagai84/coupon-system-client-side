import { Component, OnInit, OnChanges } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { CustomerBean } from 'src/app/models/customerbean';
import { CustomerService } from 'src/app/services/customer.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(public loginService: LoginService, private customerService: CustomerService) { }


  ngOnInit() {

  }

}
