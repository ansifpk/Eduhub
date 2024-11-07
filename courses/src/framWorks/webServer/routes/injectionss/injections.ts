import { AdminController } from "../../../../controllers/adminController";
import { InstructorController } from "../../../../controllers/instructorController";
import { AdminUseCase } from "../../../../useCases/useCases/adminUseCases";
import { InstructorUseCase } from "../../../../useCases/useCases/instructorUseCases";
import { Course } from "../../../db/mongodb/models/courseModel";
import { AdminRepository } from "../../../db/repository/adminRepository";
import { InstructorRepository } from "../../../db/repository/instructorRepository";

// instructor
const instructorRepository = new InstructorRepository(Course)
const instructorUseCase = new InstructorUseCase(instructorRepository);
const instructorController = new InstructorController(instructorUseCase)

//admin
const adminRepository = new AdminRepository(Course)
const adminUseCase = new AdminUseCase(adminRepository)
const adminController = new AdminController(adminUseCase)

export {adminController,adminUseCase,adminRepository,instructorController,instructorUseCase,instructorRepository}