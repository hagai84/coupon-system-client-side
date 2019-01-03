import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-lyout',
  templateUrl: './lyout.component.html',
  styleUrls: ['./lyout.component.css']
})
export class LyoutComponent implements OnInit {
  public isInitialized:boolean=false;
  public myStorage:Storage = sessionStorage;

  constructor(private loginService:LoginService) { }

  async ngOnInit() {
    // this.isInitialized=sessionStorage.getItem("isLogin");
    await this.loginService.isLoggedIn();
    // if(sessionStorage.getItem("isLogin")){
      // this.isInitialized = true;
  // }
  }

}
