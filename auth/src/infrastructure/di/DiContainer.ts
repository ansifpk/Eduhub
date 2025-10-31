import { AdminLogin } from "../../application/admin/adminLogin";
import { BlockUser } from "../../application/admin/blockUser";
import { GetInstructors } from "../../application/admin/getInstructors";
import { AdminGetStudents } from "../../application/admin/getStudents";
import { AdminTockenCheck } from "../../application/admin/tockenCheck";
import { CheckTocken } from "../../application/instructor/checkTocken";
import { GetStudents } from "../../application/instructor/getStudents";
import { InstructorLogin } from "../../application/instructor/instructorLogin";
import { ChangeEmail } from "../../application/user/changeEmail";
import { ChangePassword } from "../../application/user/changePassword";
import { CreateUser } from "../../application/user/createUser";
import { ForgetPassword } from "../../application/user/forgetPassword";
import { GooogleLogin } from "../../application/user/googleLogin";
import { LoginUser } from "../../application/user/loginUser";
import { ResetPassword } from "../../application/user/resetPassword";
import { SendOtp } from "../../application/user/sendOtp";
import { TockenCheck } from "../../application/user/tockenCheck";
import { VerifyEmail } from "../../application/user/verifyEmail";
import { VerifyOtp } from "../../application/user/verifyOtp";
import { AdminLoginController } from "../../presentation/controllers/admin/adminLoginController.";
import { BlockUserController } from "../../presentation/controllers/admin/blockUserController";
import { GetInstructorsController } from "../../presentation/controllers/admin/getInstructorController";
import { GetStudentsAdminController } from "../../presentation/controllers/admin/getStudentsController";
import { AdminLogoutController } from "../../presentation/controllers/admin/logoutController";
import { AdminTockenCheckController } from "../../presentation/controllers/admin/tockenCheckController";
import { CheckTockenController } from "../../presentation/controllers/instructor/checkTockenController";
import { GetStudentsController } from "../../presentation/controllers/instructor/getStudentsController";
import { LoginInstructorController } from "../../presentation/controllers/instructor/loginController";
import { LogOutInstrcutorController } from "../../presentation/controllers/instructor/logout";
import { ChangeEmailController } from "../../presentation/controllers/user/changeEmailController";
import { ChangePasswordConstroller } from "../../presentation/controllers/user/changePasswordController";
import { CreatUserController } from "../../presentation/controllers/user/creatUserController";
import { ForgetPasswordController } from "../../presentation/controllers/user/forgetPasswordController";
import { GoogleLoginController } from "../../presentation/controllers/user/googleLoginController";
import { LoginUserController } from "../../presentation/controllers/user/loginController";
import { LogOutController } from "../../presentation/controllers/user/logoutController";
import { ResendOtpController } from "../../presentation/controllers/user/resendOtpController";
import { ResetPasswordController } from "../../presentation/controllers/user/resetPasswordController";
import { TockenCheckController } from "../../presentation/controllers/user/tockenCheckController";
import { VerifyEmailController } from "../../presentation/controllers/user/verifyEmailController";
import { VerifyOtpController } from "../../presentation/controllers/user/verifyOtpController";
import { userModel } from "../db/models/userModel";
import { AdminRepository } from "../db/repository/adminRepository";
import { InstructorRepository } from "../db/repository/instructorRepository";
import { OtpRepository } from "../db/repository/otpRepostory";
import { UserRepository } from "../db/repository/userRepositories";
import { Encrypt } from "../services/hashPassword";
import { JWTtocken } from "../services/jwt";
import { OtpGenerator } from "../services/otpGenerator";
import { SentEmail } from "../services/sendMail";

const jwtTocken = new JWTtocken()
const otpRepository = new OtpRepository()
const encrypt = new Encrypt()
const otpGenerator = new OtpGenerator()
const sentEmail = new SentEmail()

//* for users
const userRepository = new UserRepository(userModel)
const createUserUseCase = new CreateUser(userRepository,jwtTocken,otpRepository)
const gooogleLogin = new GooogleLogin(userRepository,encrypt,jwtTocken)
const sendOtp = new SendOtp(otpRepository,otpGenerator,sentEmail)
const loginUserUseCase = new LoginUser(userRepository,encrypt,jwtTocken)
const forgetPasswordUseCase = new ForgetPassword(userRepository,otpGenerator,otpRepository,sentEmail)
const resetPasswordUseCase = new ResetPassword(userRepository,encrypt)
const verifyOtpUseCase = new VerifyOtp(otpRepository)
const changePasswordUseCase = new ChangePassword(userRepository,otpRepository,encrypt)
const verifyEmailUseCase = new VerifyEmail(userRepository,otpGenerator,otpRepository,sentEmail)
const changeEmailUseCase = new ChangeEmail(userRepository,otpRepository)
const tockenCheckUseCase = new TockenCheck(jwtTocken)

const creatUserController = new CreatUserController(createUserUseCase)
const loginUserController = new LoginUserController(loginUserUseCase)
const googleLoginController = new GoogleLoginController(gooogleLogin)
const resendOtpController = new ResendOtpController(sendOtp)
const forgetPasswordController = new ForgetPasswordController(forgetPasswordUseCase)
const resetPasswordController = new ResetPasswordController(resetPasswordUseCase)
const verifyOtpController = new VerifyOtpController(verifyOtpUseCase)
const changePasswordConstroller = new ChangePasswordConstroller(changePasswordUseCase)
const verifyEmailConstroller = new VerifyEmailController(verifyEmailUseCase)
const changeEmailConstroller = new ChangeEmailController(changeEmailUseCase)
const tockenCheckConstroller = new TockenCheckController(tockenCheckUseCase)
const logOutController = new LogOutController()

//* for instructors
const instructorRepository = new InstructorRepository(userModel)
const instructorLoginUseCase = new InstructorLogin(instructorRepository,encrypt,jwtTocken)
const getStudentsUseCase = new GetStudents(instructorRepository)
const checkTockenUseCase = new CheckTocken(jwtTocken)

const loginInstructorController = new LoginInstructorController(instructorLoginUseCase)
const getStudentsController = new GetStudentsController(getStudentsUseCase)
const checkTockenController = new CheckTockenController(checkTockenUseCase)
const logOutInstrcutorController = new LogOutInstrcutorController()
//* for admin
const adminRepository = new AdminRepository(userModel)
const adminLoginUseCase = new AdminLogin(adminRepository,jwtTocken,encrypt)
const blockUserUseCase = new BlockUser(adminRepository)
const getStudentsAdminUseCase = new AdminGetStudents(adminRepository)
const getInstructorsUseCase = new GetInstructors(adminRepository)
const adminTockenCheck = new AdminTockenCheck(jwtTocken)

const adminLoginController = new AdminLoginController(adminLoginUseCase)
const blockUserController = new BlockUserController(blockUserUseCase)
const getStudentsAdminController = new GetStudentsAdminController(getStudentsAdminUseCase)
const getInstructorsController = new GetInstructorsController(getInstructorsUseCase)
const tockenCheckController = new AdminTockenCheckController(adminTockenCheck)
const adminLogoutController = new AdminLogoutController()

export {
    creatUserController,
    loginUserController,
    logOutController,
    googleLoginController,
    resendOtpController,
    forgetPasswordController,
    resetPasswordController,
    verifyOtpController,
    changePasswordConstroller,
    verifyEmailConstroller,
    changeEmailConstroller,
    tockenCheckConstroller,
    loginInstructorController,
    getStudentsController,
    checkTockenController,
    logOutInstrcutorController,
    adminLoginController,
    blockUserController,
    getStudentsAdminController,
    getInstructorsController,
    tockenCheckController,
    adminLogoutController
}