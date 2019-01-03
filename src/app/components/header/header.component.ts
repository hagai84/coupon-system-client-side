import { Component, OnInit, OnChanges } from '@angular/core';
import { UtilService } from 'src/app/services/util.service';
import { LoginService } from 'src/app/services/login.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  public lastMenuButtonThatClicked : String = "buy"; 
  public mylocalStorage :Storage = localStorage;
  public mysessionStorage :Storage = sessionStorage;
  public myStorage :Storage = sessionStorage;

  constructor(public util : UtilService, private loginService:LoginService) { }
  
  ngOnInit() {
  }

  public onMenuButtonClick(lastMenuButtonThatClicked : string){
    this.lastMenuButtonThatClicked = lastMenuButtonThatClicked;
  }
}
