import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor() { }

  public PrintErrorToCustomer(error: HttpErrorResponse) {
    if (error.status > 1000) {
      window.alert(error.error.externalMessage);
    } else {
      window.alert(error.error);
    }
  }
}
