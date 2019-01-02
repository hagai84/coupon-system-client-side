import { Component, OnInit, OnChanges } from '@angular/core';
import { UtilService } from 'src/app/services/util.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  public lastMenuButtonThatClicked : String = "buy"; 
  public myStorage :Storage = sessionStorage;
  constructor(public util : UtilService) { }
  
  ngOnInit() {
  }

  public onMenuButtonClick(lastMenuButtonThatClicked : string){
    this.lastMenuButtonThatClicked = lastMenuButtonThatClicked;
  }
}
