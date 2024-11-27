export interface IStripe{
    createStripe(courseData:Course):Promise<void>
}