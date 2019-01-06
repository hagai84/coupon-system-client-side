import { Injectable } from '@angular/core';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GuestGuardServiceService {

  constructor(private loginService: LoginService, private router: Router) { }

  canActivate() {
    
    if (!this.loginService.isLoggedIn()||sessionStorage.getItem('userType')=='ADMIN') {
      return true;
    }    
    this.router.navigate(["/coupons"]);

    window.alert("Log out first");
    return false;
  }
}
