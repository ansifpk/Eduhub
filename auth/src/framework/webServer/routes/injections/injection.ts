import { UserController } from "../../../../controller/userController";
import { UserUseCase } from "../../../../useCase/useCase/userUserCase";
import { userModel } from "../../../db/mongoDB/models/userModel";
import { UserRepository } from "../../../db/mongoDB/repositories/userRepository/userRepositories";
import { Encrypt } from "../../../services/hashPassword";
import { OtpRepository } from "../../../db/mongoDB/repositories/otpRepostory";
import { OtpGenerator } from "../../../services/otpGenerator";
import { SentEmail } from "../../../services/sendMail";
import { JWTtocken } from "../../../services/jwt";
import { AdminController } from "../../../../controller/adminController";
import { AdminUsecase } from "../../../../useCase/useCase/adminUseCase";
import { AdminRepository } from "../../../db/mongoDB/repositories/adminRepository/adminRepository";
import { InstructorRepository } from "../../../db/mongoDB/repositories/instructorRepository";
import { InstructorUseCase } from "../../../../useCase/useCase/instructorUseCase";
import { InstructorController } from "../../../../controller/instructorController";
import cloudinary from "../../../services/cloudinary";


const bcryptService = new Encrypt()
const otpRepository = new OtpRepository()
const otpGenerator = new OtpGenerator()
const sentEmail = new SentEmail()
const jwtTocken = new JWTtocken()
const userRepository = new UserRepository(userModel)
const userusecase = new UserUseCase(userRepository,bcryptService,otpRepository,otpGenerator,sentEmail,jwtTocken)
const userController = new UserController(userusecase);

// admin 
const adminRepository = new AdminRepository(userModel)
const adminusecase = new AdminUsecase(adminRepository,bcryptService,jwtTocken)
const adminControleer = new AdminController(adminusecase)
// instructor 
const instructorRepository = new InstructorRepository(userModel)
const instructorusecase = new InstructorUseCase(instructorRepository,cloudinary,jwtTocken)
const instructorController = new InstructorController(instructorusecase)
export {userRepository,userController,userusecase,adminControleer,adminusecase,adminRepository,instructorController,instructorusecase,instructorRepository}