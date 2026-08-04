"use client"

import { Bar, BarChart, XAxis, YAxis, CartesianGrid } from "recharts"
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig,
} from "@/components/ui/chart"

type SalesChartProps = {
    data: { day: string; total: number }[]
}

const chartConfig = {
    total: {
        label: "Sales",
        // Usamos la variable directa que Shadcn define para texto/elementos principales
        color: "hsl(var(--foreground))",
    },
} satisfies ChartConfig

export default function SalesChart({ data }: SalesChartProps) {
    return (
        <div className="rounded-xl border bg-white dark:bg-zinc-900 text-card-foreground p-6 space-y-4">
            <div className="flex flex-col space-y-1.5">
                <h3 className="font-semibold leading-none tracking-tight text-base">
                    Sales — last 7 days
                </h3>
                <p className="text-sm text-muted-foreground">
                    Total revenue per day.
                </p>
            </div>

            <ChartContainer config={chartConfig} className="h-64 w-full">
                <BarChart
                    accessibilityLayer
                    data={data}
                    margin={{ top: 12, right: 12, left: -12, bottom: 0 }}
                >
                    <CartesianGrid vertical={false} strokeDasharray="3 3" className="stroke-border" />
                    <XAxis
                        dataKey="day"
                        tickLine={false}
                        axisLine={false}
                        tickMargin={8}
                        className="text-xs text-muted-foreground"
                    />
                    <YAxis
                        tickLine={false}
                        axisLine={false}
                        tickMargin={8}
                        className="text-xs text-muted-foreground"
                        tickFormatter={(value: number) => `$${value}`}
                    />
                    <ChartTooltip
                        cursor={{ fill: "hsl(var(--muted) / 0.4)" }}
                        content={
                            <ChartTooltipContent
                                formatter={(value) => `$${Number(value).toFixed(2)}`}
                            />
                        }
                    />
                    {/* Le pasamos la clase fill-foreground (o fill-primary) con Tailwind */}
                    <Bar
                        dataKey="total"
                        className="fill-foreground dark:fill-white"
                        radius={[8, 8, 8, 8]}
                    />
                </BarChart>
            </ChartContainer>
        </div>
    )
}