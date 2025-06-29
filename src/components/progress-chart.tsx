"use client"

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartConfig, ChartContainer, ChartTooltipContent } from "@/components/ui/chart"

// Placeholder data
const weightData = [
  { date: "Jan", weight: 75 },
  { date: "Feb", weight: 74 },
  { date: "Mar", weight: 73.5 },
  { date: "Apr", weight: 72 },
  { date: "May", weight: 71.5 },
  { date: "Jun", weight: 70 },
];

const calorieData = [
  { day: "Mon", intake: 1800, target: 2000 },
  { day: "Tue", intake: 2100, target: 2000 },
  { day: "Wed", intake: 1950, target: 2000 },
  { day: "Thu", intake: 2050, target: 2000 },
  { day: "Fri", intake: 1700, target: 2000 },
  { day: "Sat", intake: 2200, target: 2000 },
  { day: "Sun", intake: 1900, target: 2000 },
];

const chartConfigWeight: ChartConfig = {
  weight: {
    label: "Weight (kg)",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

const chartConfigCalories: ChartConfig = {
  intake: {
    label: "Calorie Intake (kcal)",
    color: "hsl(var(--chart-2))",
  },
  target: {
    label: "Calorie Target (kcal)",
    color: "hsl(var(--muted))",
  }
} satisfies ChartConfig;

export function ProgressChart() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
      <Card className="card-responsive">
        <CardHeader className="touch-spacing">
          <CardTitle className="responsive-text">Weight Progress</CardTitle>
          <CardDescription className="text-sm">Your weight trend over the last 6 months.</CardDescription>
        </CardHeader>
        <CardContent className="touch-spacing pt-0">
          <ChartContainer config={chartConfigWeight} className="h-[250px] sm:h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weightData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="date" tickLine={false} axisLine={false} fontSize={12} />
                <YAxis unit="kg" tickLine={false} axisLine={false} fontSize={12} />
                <Tooltip content={<ChartTooltipContent />} />
                <Legend />
                <Bar dataKey="weight" fill="var(--color-weight)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card className="card-responsive">
        <CardHeader className="touch-spacing">
          <CardTitle className="responsive-text">Weekly Calorie Intake</CardTitle>
          <CardDescription className="text-sm">Your calorie intake vs. target for the past week.</CardDescription>
        </CardHeader>
        <CardContent className="touch-spacing pt-0">
          <ChartContainer config={chartConfigCalories} className="h-[250px] sm:h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={calorieData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="day" tickLine={false} axisLine={false} fontSize={12} />
                <YAxis unit="kcal" tickLine={false} axisLine={false} fontSize={12} />
                <Tooltip content={<ChartTooltipContent />} />
                <Legend />
                <Bar dataKey="intake" fill="var(--color-intake)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="target" fill="var(--color-target)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}