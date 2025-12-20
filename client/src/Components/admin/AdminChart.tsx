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
import adminRoutes from "@/service/endPoints/adminEndPoints";
import useRequest from "@/hooks/useRequest";
import toast from "react-hot-toast";
import {
  dateRangeScheema,
  type DateFormInputs,
} from "@/util/schemas/dateRangeScheema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

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
  Delivered: number;
}

const ChartAreaInteractive = () => {
  const [orders, setOrders] = React.useState<data[]>([]);
  const { doRequest, err } = useRequest();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DateFormInputs>({
    resolver: zodResolver(dateRangeScheema),
  });

  React.useEffect(() => {
    doRequest({
      url: `${adminRoutes.getOrders}/2023-01-01/${
        new Date().toISOString().split("T")[0]
      }`,
      method: "get",
      body: {},
      onSuccess: (res) => {
        console.log(res.orders)
        setOrders(res.orders);
      },
    });
  }, []);

  const handleDate = (data: DateFormInputs) => {
    doRequest({
      url: `${adminRoutes.getOrders}/${data.start}/${
        data.end
      }`,
      method: "get",
      body: {},
      onSuccess: (res) => {
        setOrders(res.orders);
      },
    });
  };

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
        <div className="flex gap-5 items-end-safe">
          <div className="grid grid-cols-1 space-y-2 font-semibold">
            <label htmlFor="">Starting date</label>
            <input
              {...register("start")}
              className="border border-black p-2 rounded"
              type="date"
            />
            {errors.start && (
              <span className="text-red-500 text-xs">
                {errors.start.message}
              </span>
            )}
          </div>
          <div className="grid grid-cols-1 space-y-2 font-semibold">
            <label htmlFor="">Ending date</label>
            <input
              {...register("end")}
              className="border border-black rounded p-2"
              type="date"
            />
            {errors.end && (
              <span className="text-red-500 text-xs">{errors.end.message}</span>
            )}
          </div>
          <button
            type="button"
            onClick={() => handleSubmit(handleDate)()}
            className="bg-black rounded px-2 text-white py-2 cursor-pointer"
          >
            save
          </button>
        </div>
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
              tickFormatter={(value) => value.slice(0, 10)}
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

export default React.memo(ChartAreaInteractive);
