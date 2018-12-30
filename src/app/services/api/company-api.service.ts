import { Injectable } from '@angular/core';
import { CompanyBean } from 'src/app/models/CompanyBean';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CompanyApiService {

  constructor(private http : HttpClient) { }

  createCompany(companyBean:CompanyBean): Observable<Number> {
    return this.http.post<Number>("http://localhost:8080/Coupon_System_Web-App/rest/companies",companyBean,{ withCredentials: true });
  }
}
