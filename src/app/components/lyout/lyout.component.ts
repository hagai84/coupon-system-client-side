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
  // public isInitialized:boolean=false;
  // public myStorage:Storage = sessionStorage;
  // public timer:NodeJS.Timer;
  
  // @HostListener('window:focus', ['$event'])
  // async refreshData($event) {
  //   // do something meaningful with it
  //   clearInterval(this.timer);
  //   this.cartService.readCart();
  //   await this.loginService.isLoggedIn();      
  // }
  // @HostListener('window:blur', ['$event'])
  // refreshPage($event) {
  //   // do something meaningful with it
  //   this.timer=setInterval(()=>{
  //     this.cartService.readCart();
  //     this.loginService.isLoggedIn();
  //     // this.ref.detectChanges();
  //   },15000);
  // }

  constructor(private ref: ChangeDetectorRef, public loginService:LoginService, private cartService:CartService, private couponService:CouponApiService, private router:Router) { }

  async ngOnInit() {
    // await this.loginService.isLoggedIn();
    // window.onfocus = async()=>{
    //   clearInterval(this.timer);
    //   this.cartService.readCart();
    //   await this.loginService.isLoggedIn();
    // }
    // window.onblur= ()=>{
    //   this.timer=setInterval(()=>{
    //     this.cartService.readCart();
    //     this.loginService.isLoggedIn();
    //     // this.ref.detectChanges();
    //   },15000);
    // }
    window.addEventListener('storage', (event)=>{

      //console.log('storage event', event);
      // if (event.key == 'cartUpdated') {
        if (event.key == 'isLogout') {
          this.loginService.logout();
        }
        else if (event.key == 'isLogin') {
          this.loginService.checkLogin();
        }
        else if (event.key == 'cart') {
          this.cartService.readCart();
        }
        else if (event.key == 'profileUpdated' && sessionStorage.getItem('userType')!='ADMIN') {
          this.loginService.afterLogIn(this.loginService.userBean);

        //refresh profile data
      // }
      // if (event.key == 'loggedOut') {

        // Some tab asked for the sessionStorage -> send it

        // localStorage.setItem('sessionStorage', JSON.stringify(sessionStorage));
        // localStorage.removeItem('sessionStorage');      

      // } else if (event.key == 'sessionStorage' && !sessionStorage.length) {
        // sessionStorage is empty -> fill it

        // var data = JSON.parse(event.newValue),
              // value;

        // for (key in data) {
          // sessionStorage.setItem(key, data[key]);
        // }

        // showSessionStorage();
      }
    });

    window.onbeforeunload = function() {
      // sessionStorage.clear();
    };
  }

}
