import { Injectable } from '@angular/core';
import { CompanyBean } from 'src/app/models/CompanyBean';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CompanyApiService {

  constructor(private http : HttpClient) { }
  
  getCompanyData(customerId): Observable<CompanyBean> {
    var url = "http://localhost:8080/Coupon_System_Web-App/rest/companies/"+ customerId;
    return this.http.get<CompanyBean>(url,{ withCredentials: true });
  }
  createCompany(companyBean:CompanyBean): Observable<Number> {
    return this.http.post<Number>("http://localhost:8080/Coupon_System_Web-App/rest/companies",companyBean,{ withCredentials: true });
  }
  updateCompanyPassword(newPassword,oldPassword): Observable<void> {
    let body = new FormData();
    body.append('oldPassword', oldPassword);
    body.append('nawPassword', newPassword);
    let body2 = JSON.stringify(body);
    var url = "http://localhost:8080/Coupon_System_Web-App/rest/customers/"+ sessionStorage.getItem("customerId") + "/password";
    return this.http.put<void>(url,body2,{ withCredentials: true});
  }
}
