import { UserController } from "../../../../controllers/userController";
import { UserRepository } from "../../../db/mongoDB/repository/userRepository";
import { userModel } from "../../../db/mongoDB/models/userModel";
import { UserCreatedConsumer } from "../../config/kafka/consumer/user-created-consumer";
import { Consumer } from "kafkajs";
import { InstructorRepository } from "../../../db/mongoDB/repository/instructorRepostory";
import { InstructorUseCase } from "../../../../useCases/useCases/instructorUseCase";
import { InstructorController } from "../../../../controllers/instructorController";
import CloudinaryV2 from "../../../service/cloudinery";
import { UserUseCases } from "../../../../useCases/useCases/userUseCases";
import { AdminController } from "../../../../controllers/adminController";
import { AdminRepository } from "../../../db/mongoDB/repository/adminRepository";
import { AdminUseCase } from "../../../../useCases/useCases/adminUseCase";
import { cartModel } from "../../../db/mongoDB/models/cart";
import { courseModel } from "../../../db/mongoDB/models/courseModel";
import { ratingModel } from "../../../db/mongoDB/models/ratingModel";

const cloudinary = new CloudinaryV2()
// user
const userRepository = new UserRepository(userModel,cartModel,courseModel,ratingModel)
const userUseCase = new UserUseCases(userRepository)
const userController = new UserController(userUseCase)
// instructor
const instructorRepository = new InstructorRepository(userModel)
const instructorUseCase = new InstructorUseCase(instructorRepository,cloudinary)
const instructorController = new InstructorController(instructorUseCase)
// admin
const adminRepository = new AdminRepository(userModel)
const adminUseCase = new AdminUseCase(adminRepository)
const adminController = new AdminController(adminUseCase)



export {userController,userUseCase,userRepository,instructorController,instructorUseCase,instructorRepository,adminController,adminUseCase,adminRepository}