import { Injectable } from '@angular/core';
import { LogInBean } from 'src/app/models/logInBean';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { promise } from 'protractor';
import { UtilService } from '../util.service';

@Injectable({
  providedIn: 'root'
})
export class LoginApiService {

  constructor( private http : HttpClient, private utilService : UtilService) { }

  public login(logInBean: LogInBean): Observable<Number> {
    return this.http.post<Number>(this.utilService.webServiceUrl + "/rest/login", logInBean, { withCredentials: true });
  }

  public logout() {
   return this.http.delete<void>(this.utilService.webServiceUrl + "/rest/logout", { withCredentials: true });
  }

  public check(): Promise<LogInBean> {
    return this.http.get<LogInBean>(this.utilService.webServiceUrl + "/rest/check", { withCredentials: true }).toPromise();
  }
}
