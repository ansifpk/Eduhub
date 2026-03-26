export interface ISendOtp{
    execute(input: {
    email: string;
    
  }): Promise<boolean|void>
}