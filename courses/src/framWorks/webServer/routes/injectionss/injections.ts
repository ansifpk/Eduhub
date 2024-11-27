import { AdminController } from "../../../../controllers/adminController";
import { InstructorController } from "../../../../controllers/instructorController";
import { AdminUseCase } from "../../../../useCases/useCases/adminUseCases";
import { InstructorUseCase } from "../../../../useCases/useCases/instructorUseCases";
import { Course } from "../../../db/mongodb/models/courseModel";
import { AdminRepository } from "../../../db/repository/adminRepository";
import { InstructorRepository } from "../../../db/repository/instructorRepository";
import { Encrypt } from "../../../service/randomName";
import { S3bucket } from "../../../service/s3bucket"; 
import { UserRepository } from "../../../db/repository/userRepository";
import { UserController } from "../../../../controllers/userController";
import { UserUseCase } from "../../../../useCases/useCases/userUseCases";
import { Stripe } from "../../../service/stripe";
import CloudinaryV2 from "../../../service/cloudiner";

const bcrypt = new Encrypt()
const stripe = new Stripe()
// instructor
const s3bucketrepository = new S3bucket()
const cloudinery = new CloudinaryV2()
const instructorRepository = new InstructorRepository(Course)
const instructorUseCase = new InstructorUseCase(instructorRepository,bcrypt,s3bucketrepository,cloudinery);
const instructorController = new InstructorController(instructorUseCase)

//admin
const adminRepository = new AdminRepository(Course)
const adminUseCase = new AdminUseCase(adminRepository)
const adminController = new AdminController(adminUseCase)

// user
const userRepository = new UserRepository(Course);
const userUsecase = new UserUseCase(userRepository,s3bucketrepository,stripe)
const userController = new UserController(userUsecase)

export {adminController,adminUseCase,adminRepository,instructorController,instructorUseCase,instructorRepository,userController,userUsecase,userRepository}