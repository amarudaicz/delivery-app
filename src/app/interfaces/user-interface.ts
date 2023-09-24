export interface User {
    id:number,
    email:string,
    username:string,
    password:string,
    admin_table:string,
    local_id:number,
    active:1|0,
    admin:1|0,
    root:1|0,
    subscription_type:'free'|'basic',
    subscription_status:1|0
    register_date:Date,
    last_pay:Date,
}

