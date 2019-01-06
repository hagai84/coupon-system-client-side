import { Coupon } from "./coupon";

export class CustomerBean {
    public constructor
        (
            public id: number,
            public custName: string,
            public password: string,
            public coupons: Coupon[]

        ) { }
}