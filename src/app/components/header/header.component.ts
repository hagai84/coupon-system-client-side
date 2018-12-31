import { Component, OnInit, OnChanges } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { CustomerBean } from 'src/app/models/customerbean';
import { CustomerService } from 'src/app/services/customer.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  public lastMenuButtonThatClicked : String = "buy"; 
  constructor(public loginService: LoginService, public customerService: CustomerService) { }


  
  ngOnInit() {

  }

  public onMenuButtonClick(lastMenuButtonThatClicked : string){
    this.lastMenuButtonThatClicked = lastMenuButtonThatClicked;
  }
}
