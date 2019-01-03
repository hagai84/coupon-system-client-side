import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { CartService } from 'src/app/services/cart.service';
import {HostListener} from '@angular/core';

@Component({
  selector: 'app-lyout',
  templateUrl: './lyout.component.html',
  styleUrls: ['./lyout.component.css']
})
export class LyoutComponent implements OnInit {
  public isInitialized:boolean=false;
  public myStorage:Storage = sessionStorage;
  
  @HostListener('window:focus', ['$event'])
  refreshData($event) {
    // do something meaningful with it
    this.cartService.readCart();
    this.loginService.isLoggedIn();   
  }

  constructor(private loginService:LoginService, private cartService:CartService) { }

  async ngOnInit() {
    
   
    // this.isInitialized=sessionStorage.getItem("isLogin");
    await this.loginService.isLoggedIn();
    // if(sessionStorage.getItem("isLogin")){
      // this.isInitialized = true;
  // }
  }

}
