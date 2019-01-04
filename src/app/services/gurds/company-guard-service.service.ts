import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CompanyGuardServiceService implements CanActivate{

  constructor( private router: Router) { }

  canActivate(){
    if(sessionStorage.getItem('userType')!='COMPANY'){
      this.router.navigate(["/coupons"]);
      return false;
    }else{
      return true;
    }
  }
}
