export class LogInBean {
    public constructor
        (
            public userId?:Number,
            public userName?:string,
            public userPassword?:string,
            public userType?:string,
            public rememberMe?:string
        ) { }
}