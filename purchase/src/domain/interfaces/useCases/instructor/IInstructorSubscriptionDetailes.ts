export interface IInstructorSubscriptionDetailes{
    execute(input: {
    customerId: string;
  }): Promise<string | void>
}