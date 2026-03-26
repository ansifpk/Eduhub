import { Iuser } from "../../../entities/user";

export interface IEditProfile {
    execute(input: {
        userId: string;
        name: string;
        thumbnail: string;
        aboutMe: string;
      }): Promise<Iuser | void>
}