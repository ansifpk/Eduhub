export interface ISubscriptionDetailes{
    execute(input: {
    customerId: string;
  }): Promise<string | void> 
}