import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CustomerGuardServiceService implements CanActivate{

  constructor( private router: Router) { }

  canActivate(){
    if(sessionStorage.getItem('userType')!='CUSTOMER'&&
        sessionStorage.getItem('userType')!='ADMIN'){
      this.router.navigate(["/coupons"]);
      return false;
    }else{
      return true;
    }
  }
}
