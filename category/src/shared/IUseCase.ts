export interface IUseCase<IInput,IOutPut>{
    execute(input:IInput):Promise<IOutPut>
}