import AdminAside from "@/Components/admin/AdminAside";
import { Card, } from "@/Components/ui/card";
import { useEffect, useState } from "react";
import { Button } from "@/Components/ui/button";

import { getSalesReports, createReport } from "@/Api/admin";

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

  useEffect(() => {
    const fetching = async () => {
      const response = await getSalesReports(
        report,
        year,
        months.indexOf(month)
      );
      if (response.success) {
        setOrders(response.orders);
      }
    };
    fetching();
  }, [report, year, month]);
console.log(orders);

  const handleReport = async () => {
    const response = await createReport(report,year,months.indexOf(month));
    const blob  = new Blob([response],{
      type:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    });
    const url = window.URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.click();
    window.URL.revokeObjectURL(url)
       
  }

  return (
    <div className="container-fluid ">
      <div className="row">
        <AdminAside />
        <div className="col-md-10">
          <div className="welcome mt-4 mb-4 bg-purple-600">
            <h1>Welcome back, Admin</h1>
          </div>
          <div className="grid grid-cols-1">
            <div className="d-flex  justify-content-between mb-2">
              <div>
                <h1 className="text-lg font-bold">
                  {report} Report
                </h1>
                <div className="flex gap-3">
               
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
              <div className="flex w-50 gap-1">
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
                <Button type="button" disabled={orders.length>0?false:true} onClick={handleReport}>Create report</Button>
               </div>
            </div>
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
                          {moment(value.createdAt).calendar()}
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesReports;
