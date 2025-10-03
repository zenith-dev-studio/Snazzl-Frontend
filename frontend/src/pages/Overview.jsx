import { useState, useEffect } from "react";
import {
  ComposedChart,
  Line,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Dot,
} from "recharts";

import {
  ShoppingCart,
  Users,
  RotateCcw,
  Package,
  IndianRupee,
} from "lucide-react";
import { NavBar } from "../components/NavBar";

export default function Overview() {
  const [filter, setFilter] = useState("This Month");
  const [stats, setStats] = useState({
    revenue: 0,
    orders: 0,
    newCustomers: 0,
    refunds: 0,
    currentOrders: { confirmed: 0, shipped: 0, delivered: 0 },
  });

  const [chartData, setChartData] = useState([]);
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    async function fetchStats() {
      try {
        const [rev, delivered, newCust, refunds, current, activeCust] =
          await Promise.all([
            fetch("https://snazzl-backend.vercel.app/api/orders/stats/revenue").then((r) => r.json()),
            fetch("https://snazzl-backend.vercel.app/api/orders/stats/delivered-count").then((r) => r.json()),
            fetch("https://snazzl-backend.vercel.app/api/customers/stats/new").then((r) => r.json()),
            fetch("https://snazzl-backend.vercel.app/api/orders/stats/refunds").then((r) => r.json()),
            fetch("https://snazzl-backend.vercel.app/api/orders/stats/current").then((r) => r.json()),
            fetch("https://snazzl-backend.vercel.app/api/customers/get/active").then((r) => r.json()),
          ]);

        setStats({
          revenue: rev.revenue,
          orders: delivered.count,
          newCustomers: newCust.count,
          refunds: refunds.count,
          currentOrders: current,
        });

        setCustomers(activeCust.customers || []);

        // Example: create sales funnel data from revenue / orders
        const dummyChart = Array.from({ length: 15 }, (_, i) => ({
          day: i + 10,
          value: Math.floor(Math.random() * (rev.revenue / 2)) + 20000,
        }));
        setChartData(dummyChart);
      } catch (err) {
        console.error("Failed to fetch dashboard stats:", err);
      }
    }
    fetchStats();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="-mt-5">
        <NavBar tab="overview" />
      </div>
      <main className="space-y-6 bg-white rounded-2xl p-6 mt-6">
        <h2 className="text-xl font-semibold">Overview</h2>
        <p className="text-gray-600">Welcome User</p>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <StatCard
            title="Revenue"
            value={`₹${stats.revenue}`}
            change="+40%"
            color="green"
            icon={<IndianRupee className="w-5 h-5 text-[#2A85FF]" />}
          />
          <StatCard
            title="Orders"
            value={stats.orders}
            sub="Latest"
            icon={<Package className="w-5 h-5 text-[#2A85FF]" />}
          />
          <StatCard
            title="New customers"
            value={stats.newCustomers}
            change="+20%"
            color="green"
            icon={<Users className="w-5 h-5 text-[#2A85FF]" />}
          />
          <StatCard
            title="Refunds"
            value={stats.refunds}
            change="-10%"
            color="red"
            icon={<RotateCcw className="w-5 h-5 text-[#2A85FF]" />}
          />
          <StatCard
            title="Current orders"
            value={
              stats.currentOrders.confirmed +
              stats.currentOrders.shipped +
              stats.currentOrders.delivered
            }
            change="+7%"
            color="green"
            icon={<ShoppingCart className="w-5 h-5 text-[#2A85FF]" />}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="col-span-2 bg-white rounded-2xl shadow p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Sales Funnel</h3>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="text-sm border rounded px-2 py-1"
              >
                <option>This Month</option>
                <option>Last Month</option>
              </select>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <ComposedChart data={chartData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2A85FF" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#2A85FF" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#f5f5f5" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="value" stroke="none" fill="url(#colorValue)" />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#2A85FF"
                  strokeWidth={2}
                  dot={({ cx, cy, payload }) =>
                    payload.day === 16 ? (
                      <g>
                        <circle cx={cx} cy={cy} r={6} fill="#2A85FF" />
                        <text
                          x={cx}
                          y={cy - 10}
                          textAnchor="middle"
                          fill="#2A85FF"
                          fontSize={12}
                        >
                          {payload.value}
                        </text>
                      </g>
                    ) : (
                      <Dot cx={cx} cy={cy} r={3} fill="#2A85FF" />
                    )
                  }
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-2xl shadow p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold">Order Status</h3>
              <span className="text-sm text-gray-500">Live</span>
            </div>
            <div className="text-sm text-gray-600 space-y-1 mb-4">
              <p>Confirmed: {stats.currentOrders.confirmed}</p>
              <p>Shipped: {stats.currentOrders.shipped}</p>
              <p>Delivered: {stats.currentOrders.delivered}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow p-4">
          <h3 className="font-semibold mb-4">Active Customers</h3>
          <div className="divide-y text-sm">
            {customers.map((c, idx) => (
              <div key={idx} className="flex items-center justify-between py-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gray-200"></div>
                  <div>
                    <p className="font-medium">{c.name}</p>
                    <p className="text-gray-500">{c.email}</p>
                  </div>
                </div>
                <span className="text-gray-600">Orders: {c.orders}</span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

function StatCard({ title, value, sub, change, color, icon }) {
  return (
    <div className="bg-white shadow rounded-2xl p-4 flex items-center gap-3">
      <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#EAF2FF]">
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <h3 className="text-lg font-semibold">{value}</h3>
        {sub && <p className="text-xs text-gray-400">{sub}</p>}
        {change && (
          <p
            className={`text-xs font-medium mt-1 ${
              color === "green" ? "text-green-500" : "text-red-500"
            }`}
          >
            {change}
          </p>
        )}
      </div>
    </div>
  );
}
