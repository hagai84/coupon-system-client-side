import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { CartService } from 'src/app/services/cart.service';
import {HostListener} from '@angular/core';
import { Router } from '@angular/router';
import { CouponApiService } from 'src/app/services/api/coupon-api.service';

@Component({
  selector: 'app-lyout',
  templateUrl: './lyout.component.html',
  styleUrls: ['./lyout.component.css']
})
export class LyoutComponent implements OnInit {
  public isInitialized:boolean=false;
  public myStorage:Storage = sessionStorage;
  
  @HostListener('window:focus', ['$event'])
  async refreshData($event) {
    // do something meaningful with it
    this.cartService.readCart();
    // this.couponService.coupons=[];
    await this.loginService.isLoggedIn(); 
    // this.router.onSameUrlNavigation="reload";  
    // this.router.navigateByUrl(this.router.url);
    // this.router.onSameUrlNavigation="ignore";  
    console.log("refresh");
    
  }

  constructor(private loginService:LoginService, private cartService:CartService, private couponService:CouponApiService, private router:Router) { }

  async ngOnInit() {
    
   
    // this.isInitialized=sessionStorage.getItem("isLogin");
    await this.loginService.isLoggedIn();
    // if(sessionStorage.getItem("isLogin")){
      // this.isInitialized = true;
  // }
  }

}
