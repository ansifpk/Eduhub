import { IUserSubcription } from "../../../entities/userSubscription";

export interface IInstructorSubscriptions{
    execute(input: {instructorId: string}): Promise<IUserSubcription[]|void>
}