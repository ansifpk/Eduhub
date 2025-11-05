
import { AdminChart } from "../../application/admin/adminChart";
import { AdminCreateSubscription } from "../../application/admin/createSubscription";
import { AdminEditSubscription } from "../../application/admin/editSubscription";
import { AdminGetOrders } from "../../application/admin/getOrders";
import { GetAdminSubscriptions } from "../../application/admin/getSubscriptions";
import { AdminSalesRepost } from "../../application/admin/salesReports";
import { WebHook } from "../../application/admin/webHook";
import { InstructorCreateSubscription } from "../../application/instructor/createSubscription";
import { InstructorEditSubscription } from "../../application/instructor/editSubscription";
import { GetOrders } from "../../application/instructor/getOrders";
import { InstrutcorGetSubscriptions } from "../../application/instructor/getSubscriptions";
import { InstructorCourseOrders } from "../../application/instructor/instructorCourseOrders";
import { InstructorSubscriptions } from "../../application/instructor/instructorSubscriptions";
import { InstructorPlans } from "../../application/instructor/instrutcorPlans";
import { SalesReport } from "../../application/instructor/salesReport";
import { InstructorSubscriptionDetailes } from "../../application/instructor/subscriptionDetailes";
import { SubscriptionPurchase } from "../../application/instructor/subscriptionPurchase";
import { GetSubscriptions } from "../../application/user/getSubscriptions";
import { PurchasedSubscriptions } from "../../application/user/purchasedSubscriptions";
import { PurchaseSubscription } from "../../application/user/purchaseSubscription";
import { SubscriptionDetailes } from "../../application/user/subscriptionDetailes";
import { AdminChartController } from "../../presentation/controllers/admin/adminChart";
import { AdminCreateSubscriptionController } from "../../presentation/controllers/admin/createSubscription";
import { AdminEditSubscriptionController } from "../../presentation/controllers/admin/editSubscription";
import { AdminGetOrdersController } from "../../presentation/controllers/admin/getOrders";
import { GetAdminSubscriptionsController } from "../../presentation/controllers/admin/getSubscriptions";
import { AdminSalesRepostController } from "../../presentation/controllers/admin/salesReports";
import { WebhookController } from "../../presentation/controllers/admin/webHook";
import { CreateSubscriptionController } from "../../presentation/controllers/instructor/createSubscription";
import { EditSubscriptionController } from "../../presentation/controllers/instructor/editSubscription";
import { GetOrdersController } from "../../presentation/controllers/instructor/getOrders";
import { InstructorGetSubscriptionsController } from "../../presentation/controllers/instructor/getSubscriptions";
import { InstructorsCourseOrdersController } from "../../presentation/controllers/instructor/instructorCourseOrders";
import {  InstructorPlansController } from "../../presentation/controllers/instructor/instructorPlans";
import { InstructorsSubscriptionController } from "../../presentation/controllers/instructor/instructorSubscriptions";
import { SalesReportController } from "../../presentation/controllers/instructor/salesReport";
import { InstructorSubscriptionDetailesController } from "../../presentation/controllers/instructor/subscriptionDetailes";
import { SubscriptionPurchaseController } from "../../presentation/controllers/instructor/subscriptionPurchase";
import { GetSubscriptionsController } from "../../presentation/controllers/user/getSubscriptions";
import { PurchasedSubscriptionsController } from "../../presentation/controllers/user/purchasedSubscriptions";
import { PurchaseSubscriptionController } from "../../presentation/controllers/user/purchaseSubscription";
import { SubscriptionDetailesController } from "../../presentation/controllers/user/subscriptionDetailes";
import { courseModel } from "../db/models/courseMode";
import { instructotSubscribeModel } from "../db/models/instructorSubscribe";
import { OrderModel } from "../db/models/orderModel";
import { subscriptionModel } from "../db/models/subscriptionModel";
import { UserModel } from "../db/models/userMode";
import { userSubscribeModel } from "../db/models/userSubscribe";
import { userSubscriptionModel } from "../db/models/userSuscriptionModel";
import { AdminRepository } from "../db/repository/adminRepository";
import { InstructorRepository } from "../db/repository/instructorRepository";
import { UserRepository } from "../db/repository/userRepository";
import { WebhookRepository } from "../db/repository/webhookRepository";

const userRepository = new UserRepository(OrderModel,courseModel,UserModel,userSubscriptionModel,userSubscribeModel)
const adminRepository = new AdminRepository(subscriptionModel,OrderModel);
const instructorRepository = new InstructorRepository(OrderModel,userSubscriptionModel,subscriptionModel,UserModel,instructotSubscribeModel);
const webhookRepository = new WebhookRepository(instructotSubscribeModel,userSubscribeModel,OrderModel,courseModel)
//* for user;
const getSubscriptions = new GetSubscriptions(userRepository)
const purchaseSubscription = new PurchaseSubscription(userRepository)
const purchasedSubscription = new PurchasedSubscriptions(userRepository)
const subscriptionDetailes = new SubscriptionDetailes()

const getSubscriptionsController = new GetSubscriptionsController(getSubscriptions)
const purchaseSubscriptionController = new PurchaseSubscriptionController(purchaseSubscription)
const purchasedSubscriptionsController = new PurchasedSubscriptionsController(purchasedSubscription)
const subscriptionDetailesController = new SubscriptionDetailesController(subscriptionDetailes)

//* for instructor
const instructorGetSubscriptions = new InstrutcorGetSubscriptions(instructorRepository);
const instructorSubscriptions = new InstructorSubscriptions(instructorRepository);
const instructorPlans = new InstructorPlans(instructorRepository);
const subscriptionPurchase = new SubscriptionPurchase(instructorRepository);
const instructorSubscriptionDetailes = new InstructorSubscriptionDetailes();
const instructorCreateSubscription = new InstructorCreateSubscription(instructorRepository);
const instructorEditSubscription = new InstructorEditSubscription(instructorRepository);
const getOrders = new GetOrders(instructorRepository);
const instructorCourseOrders = new InstructorCourseOrders(instructorRepository);
const salesReport = new SalesReport(instructorRepository);

const instructorGetSubscriptionsController = new InstructorGetSubscriptionsController(instructorGetSubscriptions);
const instructorsSubscriptionController = new InstructorsSubscriptionController(instructorSubscriptions);
const instructorPlansController = new InstructorPlansController(instructorPlans);
const subscriptionPurchaseController = new SubscriptionPurchaseController(subscriptionPurchase);
const instructorSubscriptionDetailesController = new InstructorSubscriptionDetailesController(instructorSubscriptionDetailes);
const editSubscriptionController = new EditSubscriptionController(instructorEditSubscription);
const createSubscriptionController = new CreateSubscriptionController(instructorCreateSubscription);
const getOrdersController = new GetOrdersController(getOrders);
const instructorsCourseOrdersController = new InstructorsCourseOrdersController(instructorCourseOrders);
const salesReportController = new SalesReportController(salesReport);

//* for admin
const getAdminSubscriptions = new GetAdminSubscriptions(adminRepository);
const adminCreateSubscription = new AdminCreateSubscription(adminRepository);
const adminEditSubscription = new AdminEditSubscription(adminRepository);
const adminSalesRepost = new AdminSalesRepost(adminRepository);
const adminGetOrders = new AdminGetOrders(adminRepository);
const adminChart = new AdminChart(adminRepository);
const webHook = new WebHook(webhookRepository);

const getAdminSubscriptionsController = new GetAdminSubscriptionsController(getAdminSubscriptions);
const adminCreateSubscriptionController = new AdminCreateSubscriptionController(adminCreateSubscription);
const adminEditSubscriptionController = new AdminEditSubscriptionController(adminEditSubscription);
const adminSalesRepostController = new AdminSalesRepostController(adminSalesRepost);
const adminGetOrdersController = new AdminGetOrdersController(adminGetOrders);
const adminChartController = new AdminChartController(adminChart);
const webhookController = new WebhookController(webHook);

export {
    getSubscriptionsController,
    purchaseSubscriptionController,
    purchasedSubscriptionsController,
    subscriptionDetailesController,
    instructorGetSubscriptionsController,
    instructorsSubscriptionController,
    instructorPlansController,
    subscriptionPurchaseController,
    instructorSubscriptionDetailesController,
    editSubscriptionController,
    createSubscriptionController,
    getOrdersController,
    instructorsCourseOrdersController,
    salesReportController,
    getAdminSubscriptionsController,
    adminCreateSubscriptionController,
    adminEditSubscriptionController,
    adminSalesRepostController,
    adminGetOrdersController,
    adminChartController,
    webhookController
}
