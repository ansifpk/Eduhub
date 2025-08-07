"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import useRequest from "@/hooks/useRequest";
import toast from "react-hot-toast";
import instructorRoutes from "@/service/endPoints/instructorEndPoints";
import { useSelector } from "react-redux";
import type { IUser } from "@/@types/userType";

export const description = "An interactive area chart";

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  delivered: {
    label: "Delivered",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

interface data {
  _id: string;
  delivered: number;
}

const InstructorChart = () => {
  const [orders, setOrders] = React.useState<data[]>([]);
  const [filter, setFilter] = React.useState("Yearly");
  const instructorId = useSelector((state:IUser)=>state._id);
  const { doRequest, err } = useRequest();
  React.useEffect(() => {
    doRequest({
      url: `${instructorRoutes.order}/${instructorId}/${filter}`,
      method: "get",
      body: {},
      onSuccess: (res) => {
        console.log(res.orders);
        
        setOrders(res.orders);
      },
    });
  }, [filter]);

  React.useEffect(() => {
    err?.map((err) => toast.error(err.message));
  }, [err]);


  return (
    <Card className="pt-0 mb-5">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <CardTitle>Area Chart - Interactive</CardTitle>
          <CardDescription>
            Showing total visitors for the Year wise
          </CardDescription>
        </div>
        <select onChange={(value)=>setFilter(value.target.value)} value={filter}  className="border-2 p-1 rounded-sm w-[180px] space-7" name="select" id="select">
          <option  value="Yearly">Yearly</option>
          <option value="Monthly">Monthly</option>
          <option value="Daily">Daily</option>
        </select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={orders}>
            <defs>
              <linearGradient id="fillDelivered" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-delivered)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-delivered)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="_id"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => `Year ${value}`}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="delivered"
              type="natural"
              fill="url(#fillDelivered)"
              stroke="var(--color-delivered)"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default React.memo(InstructorChart);
