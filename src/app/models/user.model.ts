import { Token } from "@angular/compiler"

export interface User{
    id?:string,
    firstname?:string,
    lastname?:string,
    email:string,
    password:string,
    userRole?:string,
    user_status?:string,
    profileid?:string
}
export interface session{
    token:string,
    user:User
}
export interface Appoitment{
    id:number,
    date:Date,
    reason:string,
    statusAPT:string
}