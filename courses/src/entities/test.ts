import { Iuser } from "./user";

export interface ITest{
    _id:string,
    test:{
        question:string,
        option1:string,
        option2:string,
        option3:string,
        option4:string,
        answer:string,
    }[],
    students:{
        user:Iuser,
        score:number
    }[],
}
