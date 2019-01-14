import { Component, OnInit, Input } from '@angular/core';
import { Coupon } from 'src/app/models/coupon';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { CouponService } from 'src/app/services/reources/coupon.service';
import { CouponApiService } from 'src/app/services/api/coupon-api.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-coupons',
  templateUrl: './coupons.component.html',
  styleUrls: ['./coupons.component.css']
})
export class CouponsComponent implements OnInit {
  @Input() coupons: Coupon[];
  public mysessionStorage: Storage = sessionStorage;



  constructor(private util: UtilService, private couponApi: CouponApiService, private cart: CartService, private couponService: CouponService, private router: Router) { }

  ngOnInit() {

  }
  goToCoupon(coupon) {
    this.router.navigate(['/coupon']);
    this.couponService.setCoupon(coupon)
  }
  addToCart(coupon) {
    this.router.navigate(['/cart']);
    this.cart.addToCart(coupon);
  }

  editCoupon(coupon) {
    sessionStorage.setItem("lestCouponToUpdate", JSON.stringify(coupon));
    this.router.navigate(['/dashboard/edit-product']);
  }


  deleteCoupon(coupon) {
    const ob = this.couponApi.deleteCoupon(coupon.couponId);
    ob.subscribe(
      () => {
        alert("coupon deleted successfuly");
        this.removCouponFromCoupons(coupon);
        this.router.navigate(['/company-coupons']);
      },
      error => {
        this.util.PrintErrorToCustomer(error);
      });
  }

  removCouponFromCoupons(coupon: Coupon) {

    var tempCoupon: Array<Coupon> = [];
    this.coupons.forEach(element => {
      if (element.couponId != coupon.couponId) {
        tempCoupon.push(element);
      }
      this.coupons = tempCoupon;
    });
  }
}
