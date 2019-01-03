import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { CartService } from 'src/app/services/cart.service';
import {HostListener} from '@angular/core';
import { Router } from '@angular/router';
import { CouponApiService } from 'src/app/services/api/coupon-api.service';
import { componentRefresh } from '@angular/core/src/render3/instructions';

@Component({
  selector: 'app-lyout',
  templateUrl: './lyout.component.html',
  styleUrls: ['./lyout.component.css'],
  
})
export class LyoutComponent implements OnInit {
  public isInitialized:boolean=false;
  public myStorage:Storage = sessionStorage;
  public timer:NodeJS.Timer;
  
  @HostListener('window:focus', ['$event'])
  async refreshData($event) {
    // do something meaningful with it
    clearInterval(this.timer);
    this.cartService.readCart();
    await this.loginService.isLoggedIn();      
  }
  @HostListener('window:blur', ['$event'])
  refreshPage($event) {
    // do something meaningful with it
    this.timer=setInterval(()=>{
      this.loginService.isLoggedIn();
      // this.ref.detectChanges();
    },15000);
  }

  constructor(private ref: ChangeDetectorRef, private loginService:LoginService, private cartService:CartService, private couponService:CouponApiService, private router:Router) { }

  async ngOnInit() {
    await this.loginService.isLoggedIn();
  }

}
