import { ISection } from "../../entities/section";

export interface IDeleteLecture{
    execute(input: {
    lectureUrl: string;
  }): Promise<ISection | void>
}