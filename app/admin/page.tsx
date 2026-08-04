// Importamos las librerias
import { Metadata } from "next";
import { getOrders } from "@/lib/orders";
import { getPayments } from "@/lib/payments";
import { getEmployees } from "@/lib/employees";
import SalesChart from "@/components/admin/dashboard/SalesChart";
import TopProducts from "@/components/admin/dashboard/TopProducts";
import RecentOrders from "@/components/admin/dashboard/RecentOrders";
import DashboardKPIs from "@/components/admin/dashboard/DashboardKPIs";
import PaymentMethodChart from "@/components/admin/dashboard/PaymentMethodChart";
import { getProfile } from "@/lib/profile";

export const metadata: Metadata = {
  title: "Dashboard | BrewKoffee",
};

type DashboardGreetingProps = {
  name: string;
}

// Determina el saludo según la hora del día
function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 19) return "Good afternoon";
  return "Good evening";
}

export default async function DashboardPage({ name }: DashboardGreetingProps) {
  const greeting = getGreeting();

  const [orders, payments, employees, profile] = await Promise.all([
    getOrders(),
    getPayments(),
    getEmployees(),
    getProfile(),
  ]);

  // KPI: ventas totales
  const totalSales = payments.reduce((sum, p) => sum + p.amount, 0);

  // KPI: top producto por cantidad vendida (contando solo órdenes pagadas/entregadas)
  const productQty: Record<string, { name: string; image: string | null; quantity: number }> = {};
  for (const order of orders) {
    for (const item of order.items) {
      const key = item.variant.product.id;
      if (!productQty[key]) {
        productQty[key] = { name: item.variant.product.name, image: item.variant.product.image, quantity: 0 };
      }
      productQty[key].quantity += item.quantity;
    }
  }
  const topProducts = Object.values(productQty).sort((a, b) => b.quantity - a.quantity).slice(0, 5);

  // Gráfica: ventas de los últimos 7 días agrupadas por día
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));
    return date;
  });

  const cashTotal = payments.filter((p) => p.method === "CASH").reduce((sum, p) => sum + p.amount, 0);
  const cardTotal = payments.filter((p) => p.method === "CARD").reduce((sum, p) => sum + p.amount, 0);

  const salesByDay = last7Days.map((date) => {
    const dayKey = date.toISOString().split("T")[0];
    const dayLabel = date.toLocaleDateString("en-US", { weekday: "short" });

    const total = payments
      .filter((p) => p.createdAt.split("T")[0] === dayKey)
      .reduce((sum, p) => sum + p.amount, 0);

    return { day: dayLabel, total: Math.round(total * 100) / 100 };
  });

  // Órdenes recientes
  const recentOrders = [...orders]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 6);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">
          {greeting}, <span className="text-amber-600">{profile.name} {profile.lastname}</span>. 
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Here's how BrewKoffee is doing today.
        </p>
      </div>

      <DashboardKPIs
        totalSales={totalSales}
        totalOrders={orders.length}
        topProductName={topProducts[0]?.name ?? null}
        activeEmployees={employees.length}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <SalesChart data={salesByDay} />
        </div>
        <PaymentMethodChart cash={cashTotal} card={cardTotal} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TopProducts products={topProducts} />
        <RecentOrders orders={recentOrders} />
      </div>
    </div>
  )
}