import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/Components/ui/chart"
import { useSelector } from "react-redux"
import { User } from "@/@types/userType"
import { useEffect, useState } from "react"
import { getOrders } from "@/Api/admin"


const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  Courses: {
    label: "Courses",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig
interface data {
  _id:string,
  Courses:number
}
const AdminChart = () => {
    const [orders,setOrders] = useState<data[]>([])
    const userId = useSelector((state:User)=>state.id);
   
    useEffect(()=>{
      const fetching = async() => {
        const res = await getOrders()
        if (res.success) {
          setOrders(res.orders);
        }
      }
      fetching()
    },[userId])
  

  return (
    <Card>
      <CardHeader className=" flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>Totel sales</CardTitle>
          <CardDescription>
            Showing total sales  in admin side2.
          </CardDescription>
        </div>
        
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={orders}>
            <defs>
              <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-Courses)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-Courses)"
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
              minTickGap={32}
              tickFormatter={(value) => value}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => value}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="Courses"
              type="natural"
              fill="url(#fillDesktop)"
              stroke="var(--color-Courses)"
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

export default AdminChart