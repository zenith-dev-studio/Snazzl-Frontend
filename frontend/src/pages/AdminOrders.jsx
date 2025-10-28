"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Search, Filter, ChevronLeft, ChevronRight, MoreVertical } from "lucide-react";
import { SideBar } from "../components/SideBar";
import { AdminNav } from "../components/AdminNav";
import { useQuery } from "@tanstack/react-query";
import { convexQuery } from "@convex-dev/react-query";
import { api } from "../../convex/_generated/api";

export default function AdminOrders() {
  // const [orders, setOrders] = useState([]);
  // const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 10;

  // const baseUrl = import.meta.env.VITE_BASE_URL;

  // useEffect(() => {
  //   fetchOrders();
  // }, []);

  // const fetchOrders = async () => {
  //   try {
  //     setLoading(true);
  //     const res = await axios.get(`${baseUrl}/api/orders/get/all`);
  //     setOrders(res.data || []);
  //   } catch (error) {
  //     console.error("Error fetching orders:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const { 
    data: orders, 
    isLoading: loading, 
    error 
  } = useQuery(
    convexQuery(api.orders.getAllOrders, {})
  );

  const filteredOrders = (orders || []).filter(
    (o) =>
      o._id.toLowerCase().includes(search.toLowerCase()) ||
      o.address?.city?.toLowerCase().includes(search.toLowerCase())
  );

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <SideBar route={"orders"} />
      <div className="flex-1">
        <AdminNav />
        <div className="p-6 flex-1">
          <div className="flex justify-between items-center mb-6 -mt-10">
            <div>
              <h1 className="text-2xl font-semibold text-gray-800">Orders Management</h1>
              <p className="text-gray-500 text-sm">Manage and track all customer orders</p>
            </div>
          </div>

          <div className="flex justify-between items-center bg-white p-4 rounded-md">
            <div className="relative w-1/3">
              <Search className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search by Order ID or City..."
                className="pl-9 pr-3 py-2 border border-gray-300 rounded-md w-full text-sm focus:ring-1 focus:ring-blue-500 focus:outline-none"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>
            <div className="flex gap-2">
              <button className="flex items-center gap-1 px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50 text-sm">
                <Filter className="w-4 h-4 text-gray-500" /> Filter
              </button>
            </div>
          </div>

          <div className="bg-white rounded-md border border-gray-200 shadow-sm mt-4">
            {loading ? (
              <div className="p-8 text-center text-gray-500 text-sm">Loading orders...</div>
            ) : error ? (
              <div className="p-8 text-center text-red-500 text-sm">{error.message}</div>
            ) : currentOrders.length === 0 ? (
              <div className="p-8 text-center text-gray-500 text-sm">No orders found.</div>
            ) : (
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 text-[#6B7280] text-sm font-medium border-b">
                  <tr>
                    <th className="px-4 py-3">Order ID</th>
                    <th className="px-4 py-3">City</th>
                    <th className="px-4 py-3">Total Items</th>
                    <th className="px-4 py-3">Total Price</th>
                    <th className="px-4 py-3">Created At</th>
                    <th className="px-4 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentOrders.map((o) => {
                    const totalAmount = o.items?.reduce((sum, item) => sum + item.price * item.quantity, 0) || 0;
                    return (
                      <tr key={o._id} className="border border-[#E5E7EB] hover:bg-gray-50">
                        <td className="px-4 py-3 text-blue-600 font-medium">{o._id}</td>
                        <td className="px-4 py-3">{o.address?.city || "—"}</td>
                        <td className="px-4 py-3">{o.items?.length || 0}</td>
                        <td className="px-4 py-3">₹{totalAmount}</td>
                        <td className="px-4 py-3">
                          {new Date(o.createdAt).toLocaleDateString("en-IN")}
                        </td>
                        <td className="px-4 py-3">
                          <button className="p-1 flex gap-2 hover:bg-gray-100 rounded-full">
                            <MoreVertical className="w-4 h-4 text-gray-500" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}

            <div className="flex justify-between items-center px-4 py-3 text-sm text-gray-600">
              <span>
                Showing {currentOrders.length} of {filteredOrders.length} orders
              </span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  disabled={currentPage === 1}
                  className="p-2 rounded border border-gray-300 hover:bg-gray-100 disabled:opacity-50"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`px-3 py-1 rounded border ${
                      currentPage === i + 1
                        ? "bg-blue-600 border-blue-600 text-white"
                        : "border-gray-300 hover:bg-gray-100"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded border border-gray-300 hover:bg-gray-100 disabled:opacity-50"
                >
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
