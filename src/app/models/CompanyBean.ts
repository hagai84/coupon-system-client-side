import { Coupon } from "./coupon";

export class CompanyBean {
    public constructor
        (
            public id: number,
            public compName: string,
            public password: string,
            public email: string,
            public coupons: Coupon[]

        ) { }
            

}