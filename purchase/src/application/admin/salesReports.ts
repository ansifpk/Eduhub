import { BadRequestError, ErrorMessages } from "@eduhublearning/common";
import exceljs from "exceljs";
import { IAdminSalesRepost } from "../../domain/interfaces/useCases/admin/IAdminSalesRepost";
import { IAdminRepository } from "../../domain/interfaces/repository/IAdminrepository";

export class AdminSalesRepost
  implements IAdminSalesRepost{
  constructor(private readonly adminRepository: IAdminRepository) {}
  public async execute(input: {
    start: string;
    end: string;
  }): Promise<exceljs.Workbook | void> {
    try {
      const { start, end } = input;
      if ((start && !end) || (!start && end)) {
        throw new BadRequestError(ErrorMessages.CHART_STARTING_AND_ENDING_DATE);
      }

      const orders = await this.adminRepository.findOrders(start, end);
      if (orders) {
        const workbook = new exceljs.Workbook();
        const worksheet = workbook.addWorksheet("Orders");
        worksheet.columns = [
          { header: "S no.", key: "s_no", width: 20 },
          { header: "Order Id", key: "orderId", width: 20 },
          { header: "User Name", key: "userName", width: 20 },
          { header: "Course Name", key: "courseName", width: 20 },
          { header: "Course Price", key: "coursePrice", width: 20 },
          { header: "Order Date", key: "orderDate", width: 20 },
          { header: "Total", key: "total", width: 20 },
        ];
        let datas = {
          s_no: 0,
          orderId: "",
          userName: "",
          courseName: "",
          coursePrice: 0,
          orderDate: new Date(),
          total: 0,
        };

        orders?.map((order, index) => {
          datas.s_no = index + 1;
          datas.orderId = order._id;
          datas.userName = order.user.name;
          datas.courseName = order.course.title;
          datas.coursePrice = order.course.price;
          datas.orderDate = order.createdAt;
          datas.total = order.course.price;
          worksheet.addRow(datas);
        });
        worksheet.getRow(1).eachCell((cell) => {
          cell.font = { bold: true };
        });
        return workbook;
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
