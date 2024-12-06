import { OrderModel } from "../../../db/mongoDB/models/orderModel";
import { UserUseCase } from "../../../../useCases/useCases/userUseCase";
import { UserRepository } from "../../../db/mongoDB/repository/userRepository";
import { UserController } from "../../../../controller/userController";
import { InstructorController } from "../../../../controller/instructorController";
import { InstructorUseCase } from "../../../../useCases/useCases/instructorUseCase";
import { InstructorRepository } from "../../../db/mongoDB/repository/instructorRepository";
import { courseModel } from "../../../db/mongoDB/models/courseMode";

//user
const userRepository = new UserRepository(OrderModel,courseModel)
const userUseCase = new UserUseCase(userRepository)
const userController = new UserController(userUseCase)

//instructor
const instructorRepository = new InstructorRepository(OrderModel)
const instructorUseCase = new InstructorUseCase(instructorRepository)
const instructorController = new InstructorController(instructorUseCase)

export {userController,userUseCase,userRepository,instructorController,instructorUseCase,instructorRepository}