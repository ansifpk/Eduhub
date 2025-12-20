

export interface ITest{
    question:string;
    option1:string;
    option2:string;
    option3:string;
    option4:string;
    answer:string;
    students:{
      user:string,
      score:number
    }[],
}