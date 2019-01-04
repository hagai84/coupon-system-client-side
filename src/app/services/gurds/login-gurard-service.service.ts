import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from '../login.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGurardServiceService implements CanActivate {

  constructor(private loginService: LoginService, private router: Router) { }


  canActivate() {
    
    if (this.loginService.isLoggedIn()) {
      return true;
    }    
    this.router.navigate(["/login"]);

    window.alert("This page requires login");
    return false;
  }
}
