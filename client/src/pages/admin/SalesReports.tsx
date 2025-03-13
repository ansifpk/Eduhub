import AdminAside from "@/Components/admin/AdminAside";
import { Card } from "@/Components/ui/card";
import { useEffect, useState } from "react";
import { Button } from "@/Components/ui/button";
import { createReport } from "@/Api/admin";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/Components/ui/table";
import moment from "moment";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";
import { IOrder } from "@/@types/orderTypes";
import { Label } from "@/Components/ui/label";
import adminRoutes from "@/service/endPoints/adminEndPoints";
import useRequest from "@/hooks/useRequest";
import toast from "react-hot-toast";
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const SalesReports = () => {
  const [report, setReport] = useState("Yearly");
  const [orders, setOrders] = useState([]);
  const date = new Date();
  const [year, setYear] = useState(date.getFullYear().toString());
  const [month, setMonth] = useState(months[date.getMonth()]);
  const { doRequest, errors } = useRequest();

  useEffect(() => {
    doRequest({
      url: `${
        adminRoutes.order
      }?report=${report}&&year=${year}&&month=${months.indexOf(month)}`,
      method: "get",
      body: {},
      onSuccess: (response) => {
        setOrders(response.orders);
      },
    });
  }, [report, year, month]);

  const handleReport = async () => {
    const response = await createReport(report, year, months.indexOf(month));
    const blob = new Blob([response], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const url = window.URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.click();
    window.URL.revokeObjectURL(url);
  };

  useEffect(() => {
    errors?.map((err) => toast.error(err.message));
  }, [errors]);

  return (
    <div className="flex gap-2">
      <AdminAside />
      <div className="w-full mr-3">
        <div className="w-full mx-auto mt-2 rounded-lg p-2  text-white bg-purple-600">
          <h1>Welcome back, Admin</h1>
        </div>
        <div className="w-full">
          <div className="flex justify-between my-3 ">
            <div>
              <h1 className="text-lg font-bold"> {report} Report</h1>
              <div className="flex">
                {report == "Yearly" ? (
                  <div className="">
                    <label className="text-sm">Enter a Year</label>
                    <input
                      id="year"
                      value={year}
                      type="number"
                      name="year"
                      onChange={(e) => setYear(e.target.value)}
                      className="form-control"
                      min="2023"
                      max="2100"
                    />
                  </div>
                ) : (
                  <div className="flex gap-3">
                    <div>
                      <div className="">
                        <label className="text-sm">Enter a Year</label>
                        <input
                          id="year"
                          value={year}
                          type="number"
                          name="year"
                          onChange={(e) => setYear(e.target.value)}
                          className="form-control"
                          min="2023"
                          max="2100"
                        />
                      </div>
                    </div>
                    <div className="">
                      <Label>Select a Months</Label>
                      <Select
                        value={month}
                        onValueChange={(value) => setMonth(value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {months.map((value) => (
                              <SelectItem key={value} value={value}>
                                {value}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="flex gap-3">
              <Select
                value={report}
                onValueChange={(value) => setReport(value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="Yearly">Yearly</SelectItem>
                    <SelectItem value="Monthly">Monthly</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Button
                type="button"
                disabled={orders.length > 0 ? false : true}
                onClick={handleReport}
              >
                Create report
              </Button>
            </div>
          </div>
          {/* table card  */}
          <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer Name</TableHead>
                    <TableHead>Product</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Price</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.length > 0 ? (
                    orders.map((value: IOrder, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">
                          {value.user.name}
                        </TableCell>
                        <TableCell>{value.course.title}</TableCell>
                        <TableCell>
                          {moment(new Date(value.createdAt)).calendar()}
                        </TableCell>
                        <TableCell>{value.course.price}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        align="center"
                        colSpan={20}
                        className="font-medium"
                      >
                        No Orders made in this period
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </Card>
          {/* table card end */}
        </div>
      </div>
    </div>
  );
};

export default SalesReports;
