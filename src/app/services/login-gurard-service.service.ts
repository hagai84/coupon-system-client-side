import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGurardServiceService implements CanActivate {

  constructor(private loginService: LoginService, private router: Router) { }


  async canActivate(): Promise<boolean> {
    
    if (await this.loginService.isLoggedIn()) {
      console.log("route true");
      return true;
    }
    console.log("route");
    
    this.router.navigate(["/login"]);

    window.alert("This page requires login");
    return false;
  }
}
