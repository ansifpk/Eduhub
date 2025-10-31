import { GetInstructors } from "../../application/admin/getInstructors"
import { GetStudents } from "../../application/admin/getStudents"
import { InstructorAprovel } from "../../application/admin/instructorAprovel"
import { InstructorRequest } from "../../application/admin/instructorRequest"
import { TopInstructors } from "../../application/admin/topInstructors"
import { Ratings } from "../../application/instructor/ratings"
import { Register } from "../../application/instructor/register"
import { AddToCart } from "../../application/user/addCart"
import { CartDetailes } from "../../application/user/cartDetailes"
import { CreateRating } from "../../application/user/createRating"
import { DeleteRating } from "../../application/user/deleteRating"
import { EditProfile } from "../../application/user/editProfile"
import { EditRating } from "../../application/user/editRating"
import { GetInstructorRatings } from "../../application/user/getInstructorRatings"
import { GetProfile } from "../../application/user/getProfile"
import { ProfileImage } from "../../application/user/profileImage"
import { GetInstructorsController } from "../../presentation/constrollers/admin/getInstructors"
import { GetStudentsController } from "../../presentation/constrollers/admin/getStudents"
import { InstructorAprovelController } from "../../presentation/constrollers/admin/instructorAprovel"
import { InstructorRequestController } from "../../presentation/constrollers/admin/instructorRequest"
import { TopInstructorsController } from "../../presentation/constrollers/admin/topInstructors"
import { RatingsController } from "../../presentation/constrollers/instructor/ratings"
import { RegisterController } from "../../presentation/constrollers/instructor/register"
import { AddToCartController } from "../../presentation/constrollers/user/addCart"
import { CartDetailesController } from "../../presentation/constrollers/user/cartDetailes"
import { CreateRatingController } from "../../presentation/constrollers/user/createRating"
import { DeleteRatingController } from "../../presentation/constrollers/user/deleteRating"
import { EditProfileController } from "../../presentation/constrollers/user/editProfile"
import { EditRatingController } from "../../presentation/constrollers/user/editRating"
import { GetInstructorRatingsontroller } from "../../presentation/constrollers/user/getInstructorRatings"
import { GetProfileController } from "../../presentation/constrollers/user/getProfile"
import { ProfileImageController } from "../../presentation/constrollers/user/profileImage"
import { cartModel } from "../db/models/cart"
import { courseModel } from "../db/models/courseModel"
import { ratingModel } from "../db/models/ratingModel"
import { userModel } from "../db/models/userModel"
import { AdminRepository } from "../db/repository/adminRepository"
import { InstructorRepository } from "../db/repository/instructorRepostory"
import { UserRepository } from "../db/repository/userRepository"
import CloudinaryV2 from "../service/cloudinery"

//* for user

const userRepository = new UserRepository(userModel,cartModel,courseModel,ratingModel);
const cloudinary = new CloudinaryV2();

const getProfile = new GetProfile(userRepository);
const editProfile = new EditProfile(userRepository);
const addToCart = new AddToCart(userRepository);
const cartDetailes = new CartDetailes(userRepository);
const createRating = new CreateRating(userRepository);
const editRating = new EditRating(userRepository);
const deleteRating = new DeleteRating(userRepository);
const getInstructorRatings = new GetInstructorRatings(userRepository);
const profileImage = new ProfileImage(userRepository,cloudinary);

const getProfileController = new GetProfileController(getProfile);
const editProfileController = new EditProfileController(editProfile);
const addToCartController = new AddToCartController(addToCart);
const cartDetailesController = new CartDetailesController(cartDetailes);
const createRatingController = new CreateRatingController(createRating);
const editRatingController = new EditRatingController(editRating);
const deleteRatingController = new DeleteRatingController(deleteRating);
const getInstructorRatingsontroller = new GetInstructorRatingsontroller(getInstructorRatings);
const profileImageController = new ProfileImageController(profileImage);

//* for instructor
const instructorRepository = new InstructorRepository(userModel,ratingModel);

const ratingUseCase = new Ratings(instructorRepository);
const registerUseCase = new Register(instructorRepository,cloudinary);

const ratingsController = new RatingsController(ratingUseCase)
const registerController = new RegisterController(registerUseCase)

//* for admin
const adminRepository = new AdminRepository(userModel,ratingModel);

const getInstructorsUseCase = new GetInstructors(adminRepository)
const getStudentsUseCase = new GetStudents(adminRepository)
const instructorRequest = new InstructorRequest(adminRepository)
const instructorAprovel = new InstructorAprovel(adminRepository)
const topInstructors = new TopInstructors(adminRepository)

const getInstructorsController = new GetInstructorsController(getInstructorsUseCase)
const getStudentsController = new GetStudentsController(getStudentsUseCase)
const instructorRequestController = new InstructorRequestController(instructorRequest)
const instructorAprovelController = new InstructorAprovelController(instructorAprovel)
const topInstructorsController = new TopInstructorsController(topInstructors)

export {
    getProfileController,
    editProfileController,
    addToCartController,
    cartDetailesController,
    createRatingController,
    editRatingController,
    deleteRatingController,
    getInstructorRatingsontroller,
    profileImageController,
    ratingsController,
    registerController,
    getInstructorsController,
    getStudentsController,
    instructorRequestController,
    instructorAprovelController,
    topInstructorsController,
}