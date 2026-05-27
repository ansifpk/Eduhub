export interface IBaseRepository{
    updateById():Promise<void>
    create():Promise<void>
    find():Promise<void>
    findById():Promise<void>
    findOne():Promise<void>
}