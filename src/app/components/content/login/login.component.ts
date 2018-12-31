import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { LogInBean } from 'src/app/models/logInBean';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(public loginService: LoginService, private cookieService:CookieService) { }
  public userName: string;
  public userPassword: string;
  public userType: string = "CUSTOMER";
  public rememberMe: string;

  ngOnInit() {
  }
  private login() {
    console.log("login was hapend");
  }

  submitLogin() {
    var loginBean = new LogInBean(1234, this.userName, this.userPassword, this.userType, this.rememberMe);
    this.loginService.sumbitLogin(loginBean);
  }

}
