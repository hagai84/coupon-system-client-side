export class Coupon {
    public constructor
        (
            public couponId: number,
            public title: string,
            public startDate:any,
            public endDate:any,
            public amount: number,
            public type: string,
            public message: string,
            public price: number,
            public image: string,
            public companyId: number,

        ) { }
}