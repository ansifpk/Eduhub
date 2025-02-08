import { IOrder } from "@/@types/orderTypes";
import { User } from "@/@types/userType";
import { createReport, getSalesReports } from "@/Api/instructor";
import InstructorAside from "@/Components/instructor/InstructorAside"
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar"
import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/Components/ui/card"
import { Label } from "@/Components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select";
import { Separator } from "@/Components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table";
import moment from "moment";
import {useEffect, useState} from 'react';
import { useSelector } from "react-redux";

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

export default function SalesReports() {
     const [report, setReport] = useState("Yearly");
      const [orders, setOrders] = useState([]);
      const date = new Date();
      const [year, setYear] = useState(date.getFullYear().toString());
      const [month, setMonth] = useState(months[date.getMonth()]);
      const instructorId = useSelector((state:User)=>state.id);
        useEffect(() => {
          const fetching = async () => {
            const response = await getSalesReports(
              instructorId,
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



    const handleReport = async () => {
    const response = await createReport(instructorId,report,year,months.indexOf(month));
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
    <div className="bg-black">
      <div className="hidden space-y-6 p-10 pb-16 md:block">
        <div className="space-y-0.5">
          <h2 className="text-white text-2xl font-bold tracking-tight">Edu Hub</h2>
          <p className="text-muted-foreground">
            Manage your instructor account students and courses.
          </p>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        
       
              <InstructorAside  />
              
       
          <div className="flex-1 lg:max-w-full">
          <div className="grid grid-cols-1">
            <div className="d-flex  justify-content-between mb-2">
              <div>
                <h1 className="text-lg text-white font-bold">
                  {report} Report
                </h1>
                <div className="flex gap-3">
               
                  {report == "Yearly" ? (
                    <div className="">
                      <label className="text-sm text-white">Enter a Year</label>
                      <input
                        id="year"
                        value={year}
                        type="number"
                        name="year"
                        onChange={(e) => setYear(e.target.value)}
                        className="form-control bg-black text-white"
                        min="2023"
                        max="2100"
                      />
                    </div>
                  ) : (
                    <div className="flex gap-3">
                      <div>
                        <div className="text-white">
                          <label className="text-sm">Enter a Year</label>
                          <input
                            id="year"
                            value={year}
                            type="number"
                            name="year"
                            onChange={(e) => setYear(e.target.value)}
                             className="form-control bg-black text-white"
                            min="2023"
                            max="2100"
                          />
                        </div>
                      </div>
                      <div className="text-white">
                        <Label>Select a Months</Label>
                        <Select
                          
                          value={month}
                          onValueChange={(value) => setMonth(value)}
                        >
                          <SelectTrigger className="bg-black text-white">
                            <SelectValue  />
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
                  <SelectTrigger className="bg-black text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent >
                    <SelectGroup >
                      <SelectItem value="Yearly">Yearly</SelectItem>
                      <SelectItem value="Monthly">Monthly</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <Button type="button"  disabled={orders.length>0?false:true} className="border bg-white text-black" onClick={handleReport}>Create report</Button>
               </div>
            </div>
            <Card className="bg-black">
              <Table className="bg-black">
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-white">Customer Name</TableHead>
                    <TableHead className="text-white">Product</TableHead>
                    <TableHead className="text-white">Date</TableHead>
                    <TableHead className="text-white">Price</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.length > 0 ? (
                    orders.map((value: IOrder, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium text-white">
                          {value.user.name}
                        </TableCell >
                        <TableCell className="text-white">{value.course.title}</TableCell>
                        <TableCell className="text-white">
                          {moment(value.createdAt).calendar()}
                        </TableCell>
                        <TableCell className="text-white">{value.course.price}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        align="center"
                        colSpan={20}
                        className="font-medium text-white"
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
    </div>
  )
}