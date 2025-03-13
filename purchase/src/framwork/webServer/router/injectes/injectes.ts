import { OrderModel } from "../../../db/mongoDB/models/orderModel";
import { UserUseCase } from "../../../../useCases/useCases/userUseCase";
import { UserRepository } from "../../../db/mongoDB/repository/userRepository";
import { UserController } from "../../../../controller/userController";
import { InstructorController } from "../../../../controller/instructorController";
import { InstructorUseCase } from "../../../../useCases/useCases/instructorUseCase";
import { InstructorRepository } from "../../../db/mongoDB/repository/instructorRepository";
import { courseModel } from "../../../db/mongoDB/models/courseMode";
import { UserModel } from "../../../db/mongoDB/models/userMode";
import { AdminRepository } from "../../../db/mongoDB/repository/adminRepository";
import { AdminUseCase } from "../../../../useCases/useCases/adminUseCase";
import { AdminController } from "../../../../controller/adminController";
import { subscriptionModel } from "../../../db/mongoDB/models/subscriptionModel";
import { userSubscriptionModel } from "../../../db/mongoDB/models/userSuscriptionModel";
import { instructotSubscribeModel } from "../../../db/mongoDB/models/instructorSubscribe";
import { userSubscribeModel } from "../../../db/mongoDB/models/userSubscribe";
import { WebhookUseCase } from "../../../../useCases/useCases/webhookUseCase";
import { WebhookRepository } from "../../../db/mongoDB/repository/webhookRepository";
import { WebhookController } from "../../../../controller/webhookController";

//* user
const userRepository = new UserRepository(OrderModel,courseModel,UserModel,userSubscriptionModel,userSubscribeModel,subscriptionModel)
const userUseCase = new UserUseCase(userRepository)
const userController = new UserController(userUseCase)

//* instructor
const instructorRepository = new InstructorRepository(OrderModel,userSubscriptionModel,subscriptionModel,UserModel,instructotSubscribeModel)
const instructorUseCase = new InstructorUseCase(instructorRepository)
const instructorController = new InstructorController(instructorUseCase)

//* admin
const adminRepository = new AdminRepository(subscriptionModel,OrderModel)
const adminUseCase = new AdminUseCase(adminRepository)
const adminController = new AdminController(adminUseCase)

//* webhook
const webhookRepository = new WebhookRepository(instructotSubscribeModel,userSubscribeModel,OrderModel,courseModel)
const webhookUseCase = new WebhookUseCase(webhookRepository)
const webhookController = new WebhookController(webhookUseCase)

export {userController,userUseCase,userRepository,instructorController,instructorUseCase,instructorRepository,adminController,adminUseCase,adminRepository,webhookController,webhookUseCase,webhookRepository}