import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-company-menu',
  templateUrl: './company-menu.component.html',
  styleUrls: ['./company-menu.component.css']
})
export class CompanyMenuComponent implements OnInit {
  public myStorage :Storage = sessionStorage;

  constructor(public loginService: LoginService) { }

  ngOnInit() {
  }

}
