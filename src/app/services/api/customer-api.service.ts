import { Injectable } from '@angular/core';
import {  CustomerBean } from 'src/app/models/customerbean';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LogInBean } from 'src/app/models/logInBean';
import { UtilService } from '../util.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerApiService {

  constructor( private http : HttpClient, private utilService : UtilService) { }


  getCustomerData(customerId): Observable<CustomerBean> {
    var url = this.utilService.webServiceUrl + "/rest/customers/"+ customerId;
    return this.http.get<CustomerBean>(url,{ withCredentials: true });
  }

  createCustomer(customerBean:CustomerBean): Observable<Number> {
    return this.http.post<Number>(this.utilService.webServiceUrl + "/rest/customers",customerBean,{ withCredentials: true });
  }

  updateCustomer(customerBean:CustomerBean): Observable<void> {
    return this.http.put<void>(this.utilService.webServiceUrl + "/rest/customers",customerBean,{ withCredentials: true });
  }

  updateCustomerPassword(passwordBean:LogInBean): Observable<void> {
    var url = this.utilService.webServiceUrl + "/rest/customers/"+ passwordBean.userId + "/password";
    return this.http.put<void>(url,passwordBean,{ withCredentials: true});
  }

  deleteCustomer(customerId): Observable<void> {
    var url = this.utilService.webServiceUrl + "/rest/customers/"+ customerId;
    return this.http.delete<void>(url,{ withCredentials: true });
  }

	
// 	/**
// 	 * Updates all of a customer's fields (except ID) in the DB according to the given customer bean.
// 	 *
// 	 * @param customer The customer to be updated
// 	 * @throws CouponSystemException
// 	 *  If there is a connection problem or an <code>SQLException</code> is thrown.
// 	 *  If the given customer's ID can't be found in the DB (0 rows were updated).
// 	 */
// 	@PUT
// 	public void updateCustomer(CustomerBean customer) throws CouponSystemException {		
// 		customerService.updateCustomer(customer);
// 	}
	
	
// 	@PUT
// 	@Path("password")
// 	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
// 	public void updateCustomerPassword(@FormParam("oldPassword") String oldPassword,@FormParam("newPassword") String newPassword, @Context HttpServletRequest httpServletRequest) throws CouponSystemException {
// 		long customerId = Long.parseLong(httpServletRequest.getHeader("userId"));
// 		customerService.updateCustomerPassword(customerId, oldPassword, newPassword);
// 	}
// 	/**
// 	 * Deletes a specified customer from the DB.
// 	 * -removes its coupons from the DB (customer_coupon table)
// 	 *
// 	 * @param customerId The customer to be removed.
// 	 * @throws CouponSystemException
// 	 *  If there is a connection problem or an <code>SQLException</code> is thrown.
// 	 *  If the given customer's ID can't be found in the DB.
// 	 *
// 	 */
// 	@DELETE
// 	@Path("/{customerId}")
// 	public void removeCustomer(@PathParam("customerId") long customerId) throws CouponSystemException {			
// 		customerService.removeCustomer(customerId);				
// 	}
	
// 	/**
// 	 * Searches the DB for a customer with the given ID and
// 	 * returns a Customer bean with it's data from the DB.
// 	 *
// 	 * @param customerId The id of the customer to find in the DB.
// 	 * @return {@link CustomerBean} bean; <code>null</code> - if no customer with the given ID exists in DB
// 	 * @throws CouponSystemException
// 	 *  If there is a connection problem or an <code>SQLException</code> is thrown.
// 	 *  If the given customer's ID can't be found in the DB (0 rows were returned).
// 	 */
// 	@GET
// 	@Path("/{customerId}")
// 	public CustomerBean getCustomer(@PathParam("customerId") long customerId) throws CouponSystemException {
// 		System.out.println("api get customer is cold");
// 		return customerService.getCustomer(customerId);
// 	}
	
// 	/**
// 	 * Assemble and return an <code>ArrayList</code> of all the companies in the DB.
// 	 *
// 	 * @return An <code>ArrayList</code> of all the companies in DB.
// 	 * @throws CouponSystemException If there is a connection problem or an <code>SQLException</code> is thrown.
// 	 */
// 	@GET
// 	public Collection<CustomerBean> getAllCustomers() throws CouponSystemException{
// 		return customerService.getAllCustomers();
// 	}
	
// 	/**
// 	 * Logs in to the coupon system as a specific customer.
// 	 * @param custName Customer username
// 	 * @param password Customer password
// 	 * @return a new CustomerFacade instance if customer's username and password are correct; otherwise, throws {@link CustomerService}
// 	 * @throws CustomerFacadeException if username or password are incorrect
// 	 */
// 	/*@POST
// 	@Path("/login")
// 	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
// 	public long customerLogin(@FormParam("name") String customerName,@FormParam("password") String password) throws  CouponSystemException {
// 		if(customerName == null || password == null) {
// 			throw new CouponSystemException(ExceptionsEnum.NULL_DATA,"name/password cant be null");
// 		}
// 		return customerService.customerLogin(customerName, password);
// 	}*/
	
// }



}
