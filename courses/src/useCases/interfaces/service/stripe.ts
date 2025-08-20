export interface IStripe{
    createStripe(lineItems:object[],metadata:object):Promise<string|void>
}