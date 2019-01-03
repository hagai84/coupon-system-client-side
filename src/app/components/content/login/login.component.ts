import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { LogInBean } from 'src/app/models/logInBean';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(public loginService: LoginService, private cookieService:CookieService, private router:Router) { }
  public userName: string;
  public userPassword: string;
  public userType: string = "CUSTOMER";
  public rememberMe: string;

  ngOnInit() {
    if(sessionStorage.getItem('isLogin')){
      this.router.navigate(['../coupons']);
    }
  }
  private login() {
    console.log("login was hapend");
  }

  submitLogin() {
    var loginBean = new LogInBean(1234, this.userName, this.userPassword, this.userType, this.rememberMe);
    this.loginService.submitLogin(loginBean);
  }

}
