import { Injectable } from '@angular/core';
import { LogInBean } from 'src/app/models/logInBean';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginApiService {

  constructor(private http: HttpClient) { }

  public login(logInBean: LogInBean): Observable<Number> {
    return this.http.post<Number>("http://localhost:8080/Coupon_System_Web-App/rest/login", logInBean, { withCredentials: true });
  }

  public logout() {
    return this.http.delete<void>("http://localhost:8080/Coupon_System_Web-App/rest/logout", { withCredentials: true });
  }


}
