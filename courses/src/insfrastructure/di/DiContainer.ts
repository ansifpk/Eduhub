import { CouponDetailes } from "../../application/admin/couponDetailes";
import { CreateCoupon } from "../../application/admin/createCoupon";
import { CreateReport } from "../../application/admin/createReport";
import { DeleteCoupon } from "../../application/admin/deleteCoupon";
import { DeleteLecture } from "../../application/admin/deleteLecture";
import { EditCoupon } from "../../application/admin/editCoupon";
import { GetCoupons } from "../../application/admin/getCoupon";
import { GetCourses } from "../../application/admin/getCourses"
import { Top5RatedCourses } from "../../application/admin/top5ratedCourses";
import { AddTest } from "../../application/instructor/AddTest";
import { InstructorCourseDetailes } from "../../application/instructor/courseDetailes";
import { CreateCourse } from "../../application/instructor/createCourse";
import { EditCourse } from "../../application/instructor/editCourse";
import { EditSection } from "../../application/instructor/editSection";
import { EditTest } from "../../application/instructor/editTest";
import { InstructorGetCourses } from "../../application/instructor/getCourses";
import { InstructorGetStudents } from "../../application/instructor/getStudnets";
import { ListCourse } from "../../application/instructor/listCourse";
import { TestDetailes } from "../../application/instructor/testDetailes";
import { Top5instructorCourses } from "../../application/instructor/top5Courses";
import { TopRatings } from "../../application/instructor/topRatings";
import { UploadVideo } from "../../application/instructor/uploadVideo";
import { UserCouponDetailes } from "../../application/user/couponDetailes";
import { UserCourseDatailes } from "../../application/user/courseDetailes";
import { CreateRating } from "../../application/user/createRatings";
import { UserCreateReport } from "../../application/user/createReport";
import { DeleteRating } from "../../application/user/deleteRating";
import { UserGetCoupons } from "../../application/user/getCoupons";
import { UserGetCourses } from "../../application/user/getCourses";
import { GetInstructorCourses } from "../../application/user/getInstructorCourses";
import { GetRatings } from "../../application/user/getRatings";
import { GetReports } from "../../application/user/getReports";
import { UserGetTest } from "../../application/user/getTest";
import { PlaceOrder } from "../../application/user/placeOrder";
import { PurchasedCourses } from "../../application/user/purchasedCourses";
import { TestSubmit } from "../../application/user/testSubmit";
import { UpdateRating } from "../../application/user/updateRating";
import { CouponDetailesController } from "../../presentation/controllers/admin/couponDetailes";
import { CreateCouponController } from "../../presentation/controllers/admin/createCoupon";
import { DeleteCouponController } from "../../presentation/controllers/admin/deleteCoupon";
import { DeleteLectureController } from "../../presentation/controllers/admin/deleteLecture";
import { EditCouponController } from "../../presentation/controllers/admin/editCoupon";
import { GetCouponsController } from "../../presentation/controllers/admin/getCoupon";
import { GetCoursesController } from "../../presentation/controllers/admin/getCourses";
import { ReportController } from "../../presentation/controllers/admin/reportController";
import { Top5RatedCoursesController } from "../../presentation/controllers/admin/top5ratedCourses";
import { AddTestController } from "../../presentation/controllers/instructor/addTest";
import { InstructorCourseDetailesController } from "../../presentation/controllers/instructor/courseDatailes";
import { CreateCourseControll } from "../../presentation/controllers/instructor/createCourse";
import { EditCourseController } from "../../presentation/controllers/instructor/editCourse";
import { EditTestController } from "../../presentation/controllers/instructor/editTest";
import { InstructorGetCoursesController } from "../../presentation/controllers/instructor/getCourses";
import { InstructorGetStudentsController } from "../../presentation/controllers/instructor/getStudents";
import { ListCourseController } from "../../presentation/controllers/instructor/listCourses";
import { TestDetailesController } from "../../presentation/controllers/instructor/testDatailes";
import { Top5InstructorCoursesController } from "../../presentation/controllers/instructor/top5Courses";
import { TopRatingsController } from "../../presentation/controllers/instructor/topRatings";
import { UserCouponDetailesController } from "../../presentation/controllers/user/couponDetailes";
import { UserCourseDatailesController } from "../../presentation/controllers/user/courseDetailes";
import { CreateRatingController } from "../../presentation/controllers/user/createRatings";
import { UserCreateReportController } from "../../presentation/controllers/user/createReport";
import { DeleteRatingController } from "../../presentation/controllers/user/deleteRating";
import { UserGetCouponsController } from "../../presentation/controllers/user/getCoupons";
import { UserGetCoursesController } from "../../presentation/controllers/user/getCourses";
import { GetInstructorCoursesController } from "../../presentation/controllers/user/getInstructorCourses";
import { GetratingsController } from "../../presentation/controllers/user/getRatings";
import { GetReportsController } from "../../presentation/controllers/user/getReports";
import { UserGetTestController } from "../../presentation/controllers/user/getTest";
import { PlaceOrderController } from "../../presentation/controllers/user/placeOrder";
import { PurchasedCoursesController } from "../../presentation/controllers/user/purchasedCourses";
import { TestSubmitController } from "../../presentation/controllers/user/testSubmit";
import { UpdateRatingContoller } from "../../presentation/controllers/user/updateRating";
import { couponModel } from "../db/models/couponsModel";
import { Course } from "../db/models/courseModel";
import { ratingModel } from "../db/models/ratingModel";
import { reportModel } from "../db/models/reportModel";
import { SectionModel } from "../db/models/sectionModel";
import { testModel } from "../db/models/testModel";
import { AdminRepository } from "../db/repositories/adminRepository";
import { InstructorRepository } from "../db/repositories/instructorRepository";
import { UserRepository } from "../db/repositories/userRepository";
import CloudinaryV2 from "../service/cloudiner";
import { SentEmail } from "../service/sentMail";
import { Stripe } from "../service/stripe";
//* for admin
const adminRepository = new AdminRepository(Course,couponModel,reportModel,SectionModel)

const getCoursesUseCase = new GetCourses(adminRepository);
const deleteLectureUseCase = new DeleteLecture(adminRepository);
const top5ratedCoursesUseCase = new Top5RatedCourses(adminRepository);
const getCouponsUseCase = new GetCoupons(adminRepository);
const couponDetailesUseCase = new CouponDetailes(adminRepository);
const couponcreateUseCase = new CreateCoupon(adminRepository);
const editCouponUseCase = new EditCoupon(adminRepository);
const deleteCouponUseCase = new DeleteCoupon(adminRepository);
const createReportUseCase = new CreateReport(adminRepository);

const getCoursesController = new GetCoursesController(getCoursesUseCase);
const deleteLectureController = new DeleteLectureController(deleteLectureUseCase);
const top5RatedCoursesController = new Top5RatedCoursesController(top5ratedCoursesUseCase);
const getCouponsController = new GetCouponsController(getCouponsUseCase);
const couponDetailesController = new CouponDetailesController(couponDetailesUseCase);
const couponCreateController = new CreateCouponController(couponcreateUseCase);
const editCouponController = new EditCouponController(editCouponUseCase);
const deleteCouponController = new DeleteCouponController(deleteCouponUseCase);
const reportController = new ReportController(createReportUseCase);

//* for instructors
const instrcutorRepository = new InstructorRepository(Course,SectionModel,testModel,ratingModel)
const cloudinary = new CloudinaryV2();
const sendEmail = new SentEmail();

const createCourseUseCase = new CreateCourse(instrcutorRepository,cloudinary);
const uploadVideoUseCase = new UploadVideo(instrcutorRepository,cloudinary,sendEmail);
const testDetailesUseCase = new TestDetailes(instrcutorRepository);
const instructorGetCoursesUseCase = new InstructorGetCourses(instrcutorRepository);
const instructorCourseDetailesUseCase = new InstructorCourseDetailes(instrcutorRepository);
const instructorGetStudentsUseCase = new InstructorGetStudents(instrcutorRepository);
const listCourseUseCase = new ListCourse(instrcutorRepository);
const editCourseUseCase = new EditCourse(instrcutorRepository,cloudinary);
const editSectionUseCase = new EditSection(instrcutorRepository,cloudinary);
const addTestUseCase = new AddTest(instrcutorRepository);
const editTestUseCase = new EditTest(instrcutorRepository);
const top5instructorCoursesUseCase = new Top5instructorCourses(instrcutorRepository);
const topRatingsUseCase = new TopRatings(instrcutorRepository);

const createCourseController = new CreateCourseControll(createCourseUseCase,uploadVideoUseCase)
const testDetailesController = new TestDetailesController(testDetailesUseCase)
const instructorGetCoursesController = new InstructorGetCoursesController(instructorGetCoursesUseCase)
const instructorCourseDetailesController = new InstructorCourseDetailesController(instructorCourseDetailesUseCase)
const instructorGetStudentsController = new InstructorGetStudentsController(instructorGetStudentsUseCase)
const listCourseController = new ListCourseController(listCourseUseCase);
const editCourseController = new EditCourseController(editCourseUseCase,editSectionUseCase);
const addTestController = new AddTestController(addTestUseCase);
const editTestController = new EditTestController(editTestUseCase);
const top5InstructorCoursesController = new Top5InstructorCoursesController(top5instructorCoursesUseCase);
const topRatingsController = new TopRatingsController(topRatingsUseCase);

//* for users
const userRepository = new UserRepository(Course,ratingModel,couponModel,testModel,reportModel);
const stripe = new Stripe();

const userGetCoursesUseCase = new UserGetCourses(userRepository);
const getInstructorCourses = new GetInstructorCourses(userRepository);
const userCourseDatailes = new UserCourseDatailes(userRepository);
const purchasedCourses = new PurchasedCourses(userRepository);
const userGetTest = new UserGetTest(userRepository);
const testSubmit = new TestSubmit(userRepository);
const placeOrder = new PlaceOrder(userRepository,stripe);
const getRatings = new GetRatings(userRepository);
const createRating = new CreateRating(userRepository);
const updateRating = new UpdateRating(userRepository);
const deleteRating = new DeleteRating(userRepository);
const userGetCoupons = new UserGetCoupons(userRepository);
const userCouponDetailes = new UserCouponDetailes(userRepository);
const userCreateReport = new UserCreateReport(userRepository);
const getReports = new GetReports(userRepository);

const userGetCoursesController = new UserGetCoursesController(userGetCoursesUseCase)
const getInstructorCoursesController = new GetInstructorCoursesController(getInstructorCourses)
const userCourseDatailesController = new UserCourseDatailesController(userCourseDatailes)
const purchasedCoursesController = new PurchasedCoursesController(purchasedCourses)
const userGetTestController = new UserGetTestController(userGetTest)
const testSubmitController = new TestSubmitController(testSubmit);
const placeOrderController = new PlaceOrderController(placeOrder);
const getratingsController = new GetratingsController(getRatings);
const createRatingController = new CreateRatingController(createRating);
const updateRatingContoller = new UpdateRatingContoller(updateRating);
const deleteRatingController = new DeleteRatingController(deleteRating);
const userGetCouponsController = new UserGetCouponsController(userGetCoupons);
const userCouponDetailesController = new UserCouponDetailesController(userCouponDetailes);
const userCreateReportController = new UserCreateReportController(userCreateReport);
const getReportsController = new GetReportsController(getReports);

export {
    getCoursesController,
    deleteLectureController,
    top5RatedCoursesController,
    getCouponsController,
    couponDetailesController,
    couponCreateController,
    editCouponController,
    deleteCouponController,
    reportController,
    createCourseController,
    testDetailesController,
    instructorGetCoursesController,
    instructorCourseDetailesController,
    instructorGetStudentsController,
    listCourseController,
    editCourseController,
    addTestController,
    editTestController,
    top5InstructorCoursesController,
    topRatingsController,
    userGetCoursesController,
    getInstructorCoursesController,
    userCourseDatailesController,
    purchasedCoursesController,
    userGetTestController,
    testSubmitController,
    placeOrderController,
    getratingsController,
    createRatingController,
    updateRatingContoller,
    deleteRatingController,
    userGetCouponsController,
    userCouponDetailesController,
    userCreateReportController,
    getReportsController,
}