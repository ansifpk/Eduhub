import { ISection } from "../entities/section";
import { FileData } from "./IFileData";

export interface ReqUp {
  courseId: string;
  bodyData: ISection;
  fileData: {
    courseVideo?: FileData[];
    courseImage?: FileData[];
  };
}