import { ReqUp } from "../IReqUp";

export interface IEditSection {
    execute(input:{ sectionData: ReqUp }):Promise< boolean | void>
}