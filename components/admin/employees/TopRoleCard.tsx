"use client"

// Importamos las librerias
import { BarChart, Bar, XAxis, YAxis, Cell } from "recharts";
import { ChartContainer, type ChartConfig } from "@/components/ui/chart";

// Definimos las types
type TopRoleCardProps = {
    role: string;
    percentage: number;
}

// Configuracion de color, con variante por tema
const chartConfig = {
    percentage: {
        theme: {
            light: "#f59e0b",
            dark: "#fbbf24",
        },
    },
    track: {
        theme: {
            light: "#e4e4e7",
            dark: "#27272a",
        },
    },
} satisfies ChartConfig;

// Definimos el componente
export default function TopRoleCard({ role, percentage }: TopRoleCardProps) {
    // Obtenemos los datos a mostrar
    const data = [{ name: role, percentage }];

    return (
        <div className="h-full bg-white dark:bg-zinc-900 rounded-xl p-4 flex flex-col gap-3 border border-zinc-200 dark:border-zinc-800/70">
            <p className="text-xs text-zinc-500 dark:text-zinc-400 font-semibold">Most common role</p>
            <p className="text-sm text-zinc-600 dark:text-zinc-300">
                <span className="text-4xl font-medium text-zinc-900 dark:text-white mr-1">
                    {percentage}
                </span>
                % of the team
            </p>
            <ChartContainer config={chartConfig} className="h-2 w-full">
                <BarChart
                    data={data}
                    layout="vertical"
                    margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
                >
                    <XAxis type="number" domain={[0, 100]} hide />
                    <YAxis type="category" dataKey="name" hide />
                    <Bar
                        dataKey="percentage"
                        radius={4}
                        barSize={5}
                        background={{ fill: "var(--color-track)", radius: 4 }}
                        isAnimationActive={true}
                        animationDuration={800}
                    >
                        <Cell fill="var(--color-percentage)" />
                    </Bar>
                </BarChart>
            </ChartContainer>
            <p className="text-xs text-zinc-500 dark:text-zinc-500">{role}</p>
        </div>
    )
}