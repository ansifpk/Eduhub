import { ICourse } from "../entities/course";
import { FileData } from "./IFileData";

export interface Req {
  bodyData: ICourse;
  fileData: {
    courseVideo?: FileData[];
    courseImage?: FileData[];
  };
}