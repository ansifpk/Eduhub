import { ReqUp } from "../IReqUp";

export interface IUploadVideo {
   execute(input: {
    sectionData: ReqUp;
  }): Promise<boolean | void>
}