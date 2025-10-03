"use client";

import { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Area,
} from "recharts";

import { SideBar } from "../components/SideBar";
import { AdminNav } from "../components/AdminNav";

// icons from lucide-react
import {
  Search,
  Filter,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

// sample table data
const orders = [
  {
    id: "#1001",
    customer: "John Doe",
    email: "john@example.com",
    store: "SuperMart",
    date: "2025-09-16",
    amount: "$120.00",
    status: "Pending",
    agent: "Alex",
  },
  {
    id: "#1002",
    customer: "Jane Smith",
    email: "jane@example.com",
    store: "QuickShop",
    date: "2025-09-15",
    amount: "$89.50",
    status: "Delivered",
    agent: "Brian",
  },
  {
    id: "#1003",
    customer: "Michael Lee",
    email: "michael@example.com",
    store: "MegaStore",
    date: "2025-09-14",
    amount: "$245.75",
    status: "Cancelled",
    agent: "Clara",
  },
  {
    id: "#1004",
    customer: "Emma Brown",
    email: "emma@example.com",
    store: "ShopEasy",
    date: "2025-09-14",
    amount: "$67.20",
    status: "In Transit",
    agent: "Daniel",
  },
  {
    id: "#1005",
    customer: "Chris Wilson",
    email: "chris@example.com",
    store: "FreshMart",
    date: "2025-09-13",
    amount: "$150.00",
    status: "Preparing",
    agent: "Ella",
  },
];

// colors for status labels
const statusColors = {
  Pending: "bg-yellow-100 text-yellow-600",
  Delivered: "bg-green-100 text-green-600",
  Cancelled: "bg-red-100 text-red-600",
  "In Transit": "bg-blue-100 text-blue-600",
  Preparing: "bg-purple-100 text-purple-600",
};

export default function AdminOrders() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <SideBar route={"orders"}/>
      <div className="flex-1">
        <AdminNav />
        <div className="p-6 flex-1">
          <div className="flex justify-between items-center mb-6 -mt-10">
            <div>
              <h1 className="text-2xl font-semibold text-gray-800">
                Orders Management
              </h1>
              <p className="text-gray-500 text-sm">
                Manage and track all orders across the platform
              </p>
            </div>
            <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 text-sm">
              Export Orders
            </button>
          </div>
          <div className="flex justify-between items-center bg-white p-4 rounded-md">
            <div className="relative w-1/3">
              <Search className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search orders, stores, customers..."
                className="pl-9 pr-3 py-2 border border-gray-300 rounded-md w-full text-sm focus:ring-1 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div className="flex gap-2">
              <select className="border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-600">
                <option>All Orders</option>
                <option>Pending</option>
                <option>Delivered</option>
                <option>Cancelled</option>
              </select>
              <button className="flex items-center gap-1 px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50 text-sm">
                <Filter className="w-4 h-4 text-gray-500" /> Filter
              </button>
            </div>
          </div>
          <div className="bg-white rounded-md border border-gray-200 shadow-sm">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 text-[#6B7280] text-sm font-medium border-b">
                <tr>
                  <th className="px-4 py-3">Order ID</th>
                  <th className="px-4 py-3">Customer</th>
                  <th className="px-4 py-3">Store</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Amount</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Delivery Agent</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o, i) => (
                  <tr key={i} className="border border-[#E5E7EB] hover:bg-gray-50">
                    <td className="px-4 py-3 text-blue-600 font-medium">{o.id}</td>
                    <td className="px-4 py-3">
                      <div className="flex flex-col">
                        <span className="font-medium">{o.customer}</span>
                        <span className="text-xs text-gray-500">{o.email}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">{o.store}</td>
                    <td className="px-4 py-3">{o.date}</td>
                    <td className="px-4 py-3">{o.amount}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${statusColors[o.status]}`}
                      >
                        {o.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">{o.agent}</td>
                    <td className="px-4 py-3">
                      <button className="p-1 flex gap-2 hover:bg-gray-100 rounded-full">
                        <svg width="16" height="13" viewBox="0 0 16 13" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7.98436 0.625C5.77499 0.625 4.00585 1.63125 2.71796 2.82891C1.43827 4.01562 0.58241 5.4375 0.177722 6.41367C0.0874878 6.62969 0.0874878 6.87031 0.177722 7.08633C0.58241 8.0625 1.43827 9.48438 2.71796 10.6711C4.00585 11.8687 5.77499 12.875 7.98436 12.875C10.1937 12.875 11.9629 11.8687 13.2508 10.6711C14.5305 9.48164 15.3863 8.0625 15.7937 7.08633C15.884 6.87031 15.884 6.62969 15.7937 6.41367C15.3863 5.4375 14.5305 4.01562 13.2508 2.82891C11.9629 1.63125 10.1937 0.625 7.98436 0.625ZM4.04686 6.75C4.04686 5.70571 4.46171 4.70419 5.20013 3.96577C5.93855 3.22734 6.94007 2.8125 7.98436 2.8125C9.02865 2.8125 10.0302 3.22734 10.7686 3.96577C11.507 4.70419 11.9219 5.70571 11.9219 6.75C11.9219 7.79429 11.507 8.79581 10.7686 9.53423C10.0302 10.2727 9.02865 10.6875 7.98436 10.6875C6.94007 10.6875 5.93855 10.2727 5.20013 9.53423C4.46171 8.79581 4.04686 7.79429 4.04686 6.75ZM7.98436 5C7.98436 5.96523 7.1996 6.75 6.23436 6.75C6.04022 6.75 5.85428 6.71719 5.67928 6.65977C5.52889 6.61055 5.35389 6.70352 5.35936 6.86211C5.36757 7.05078 5.39491 7.23945 5.44686 7.42812C5.82147 8.82812 7.26249 9.65938 8.66249 9.28477C10.0625 8.91016 10.8937 7.46914 10.5191 6.06914C10.2156 4.93438 9.2121 4.17148 8.09647 4.125C7.93788 4.11953 7.84491 4.2918 7.89413 4.44492C7.95155 4.61992 7.98436 4.80586 7.98436 5Z" fill="#2563EB"/>
</svg>

                        <MoreVertical className="w-4 h-4 text-gray-500" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-between items-center px-4 py-3 text-sm text-gray-600">
              <span>Showing 1 to 5 of 24 results</span>
              <div className="flex items-center gap-1">
                <button className="p-2 rounded border border-gray-300 hover:bg-gray-100">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    className={`px-3 py-1 rounded border ${
                      n === 1
                        ? "bg-blue-600 border-blue-600 text-white"
                        : "border-gray-300 hover:bg-gray-100"
                    }`}
                  >
                    {n}
                  </button>
                ))}
                <button className="p-2 rounded border border-gray-300 hover:bg-gray-100">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
