import { Injectable } from '@angular/core';
import { CompanyBean } from 'src/app/models/CompanyBean';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LogInBean } from 'src/app/models/logInBean';

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
 
  updateCompany(companyBean:CompanyBean): Observable<void> {
    return this.http.put<void>("http://localhost:8080/Coupon_System_Web-App/rest/companies",companyBean,{ withCredentials: true });
  }
 
  updateCompanyPassword(passwordBean:LogInBean): Observable<void> {
    var url = "http://localhost:8080/Coupon_System_Web-App/rest/companies/"+ passwordBean.userId + "/password";
    return this.http.put<void>(url,passwordBean,{ withCredentials: true});
  }

  deleteCompany(companyId): Observable<void> {
    var url = "http://localhost:8080/Coupon_System_Web-App/rest/companies/"+ companyId;
    return this.http.delete<void>(url,{ withCredentials: true });
  }


}
