"use client"

import { Pie, PieChart, Label } from "recharts"
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig,
} from "@/components/ui/chart"

type PaymentMethodChartProps = {
    cash: number
    card: number
}

// Colores basados en variables nativas de Shadcn (Primary y Muted/Secondary)
const chartConfig = {
    card: {
        label: "Card",
        color: "#ea580c", // Naranja intenso
    },
    cash: {
        label: "Cash",
        color: "#f59e0b", // Ámbar/Dorado
    },
} satisfies ChartConfig

export default function PaymentMethodChart({ cash, card }: PaymentMethodChartProps) {
    const total = cash + card

    const data = [
        { name: "card", label: "Card", value: card, fill: "var(--color-card)" },
        { name: "cash", label: "Cash", value: cash, fill: "var(--color-cash)" },
    ]

    return (
        <div className="rounded-xl border bg-white dark:bg-zinc-900 text-card-foreground p-6 space-y-4">
            {/* Encabezado */}
            <div className="flex flex-col space-y-1.5">
                <h3 className="font-semibold leading-none tracking-tight text-base">
                    Payment methods
                </h3>
                <p className="text-sm text-muted-foreground">
                    Revenue split by payment type.
                </p>
            </div>

            {total === 0 ? (
                <div className="flex h-50 w-full items-center justify-center rounded-lg border border-dashed border-border text-center">
                    <p className="text-sm text-muted-foreground">No payments recorded yet.</p>
                </div>
            ) : (
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-2">
                    {/* Gráfica de Dona con Texto Central (Donut Center Label) */}
                    <ChartContainer config={chartConfig} className="mx-auto aspect-square h-45 w-45">
                        <PieChart>
                            <ChartTooltip
                                cursor={false}
                                content={<ChartTooltipContent hideLabel formatter={(value) => `$${Number(value).toFixed(2)}`} />}
                            />
                            <Pie
                                data={data}
                                dataKey="value"
                                nameKey="name"
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={4}
                                strokeWidth={0}
                            >
                                {/* Texto dinámico al centro de la dona */}
                                <Label
                                    content={({ viewBox }) => {
                                        if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                            return (
                                                <text
                                                    x={viewBox.cx}
                                                    y={viewBox.cy}
                                                    textAnchor="middle"
                                                    dominantBaseline="middle"
                                                >
                                                    <tspan
                                                        x={viewBox.cx}
                                                        y={viewBox.cy}
                                                        className="fill-foreground text-xl font-bold tracking-tight"
                                                    >
                                                        ${total.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                                                    </tspan>
                                                    <tspan
                                                        x={viewBox.cx}
                                                        y={(viewBox.cy || 0) + 18}
                                                        className="fill-muted-foreground text-xs"
                                                    >
                                                        Total
                                                    </tspan>
                                                </text>
                                            )
                                        }
                                    }}
                                />
                            </Pie>
                        </PieChart>
                    </ChartContainer>

                    {/* Leyendas con diseño minimalista */}
                    <div className="flex w-full sm:w-auto flex-col justify-center gap-3">
                        {data.map((entry) => {
                            const percentage = total > 0 ? ((entry.value / total) * 100).toFixed(1) : "0"
                            const config = chartConfig[entry.name as keyof typeof chartConfig]

                            return (
                                <div
                                    key={entry.name}
                                    className="flex items-center justify-between sm:justify-start gap-4 rounded-lg border border-border/50 bg-muted/20 p-2.5 sm:border-none sm:bg-transparent sm:p-0"
                                >
                                    <div className="flex items-center gap-2.5">
                                        <span
                                            className="size-3 rounded-sm shrink-0"
                                            style={{ backgroundColor: config?.color || entry.fill }}
                                        />
                                        <span className="text-sm font-medium text-foreground">
                                            {entry.label}
                                        </span>
                                    </div>

                                    <div className="flex items-baseline gap-2 text-right sm:text-left">
                                        <span className="text-sm font-semibold text-foreground">
                                            ${entry.value.toFixed(2)}
                                        </span>
                                        <span className="text-xs text-muted-foreground font-mono">
                                            ({percentage}%)
                                        </span>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            )}
        </div>
    )
}