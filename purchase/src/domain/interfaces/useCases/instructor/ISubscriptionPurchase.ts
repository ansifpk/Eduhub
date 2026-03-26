export interface ISubscriptionPurchase{
    execute(input: {
    userId: string;
    method: string;
  }): Promise<string | void>
}