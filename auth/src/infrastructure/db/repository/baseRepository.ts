
export class BaseRepository<T> {
    constructor(protected model: any) { }

    async updateById(_id: string, update: any): Promise<T | null> {
        return await this.model.findByIdAndUpdate(
            { _id: _id },
            { $set: update },
            { new: true }
        );
    }
    async create(data:object): Promise<T> {
        return await this.model.create(data);
    }
    async find(filter:object,sort:object): Promise<T[] | null> {
        return await this.model.find(filter).sort(sort);
    }
    async findById(_id:string): Promise<T | null> {
        return await this.model.findById({_id})
    }
    async findOne(filter:object): Promise<T | null> {
        return await this.model.findOne(filter)
    }
}