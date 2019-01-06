import { Injectable } from '@angular/core';
import { CompanyBean } from 'src/app/models/CompanyBean';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LogInBean } from 'src/app/models/logInBean';
import { UtilService } from '../util.service';

@Injectable({
  providedIn: 'root'
})
export class CompanyApiService {

  constructor( private http : HttpClient, private utilService : UtilService) { }
  
  getCompanyData(companyId): Observable<CompanyBean> {
    var url = this.utilService.webServiceUrl + "/rest/companies/"+ companyId;
    return this.http.get<CompanyBean>(url,{ withCredentials: true });
  }

  getAllCompanies(): Observable<CompanyBean[]> {
    var url = this.utilService.webServiceUrl + "/rest/companies/";
    return this.http.get<CompanyBean[]>(url,{ withCredentials: true });
  }
  createCompany(companyBean:CompanyBean): Observable<Number> {
    return this.http.post<Number>(this.utilService.webServiceUrl + "/rest/companies",companyBean,{ withCredentials: true });
  }
 
  updateCompany(companyBean:CompanyBean): Observable<void> {
    return this.http.put<void>(this.utilService.webServiceUrl + "/rest/companies",companyBean,{ withCredentials: true });
  }
 
  updateCompanyPassword(passwordBean:LogInBean): Observable<void> {
    var url = this.utilService.webServiceUrl + "/rest/companies/"+ passwordBean.userId + "/password";
    return this.http.put<void>(url,passwordBean,{ withCredentials: true});
  }

  deleteCompany(companyId): Observable<void> {
    var url = this.utilService.webServiceUrl + "/rest/companies/"+ companyId;
    return this.http.delete<void>(url,{ withCredentials: true });
  }


}
