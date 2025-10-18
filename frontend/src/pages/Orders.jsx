import { useState, useEffect } from "react";
import { Calendar } from "lucide-react";
import { NavBar } from "../components/NavBar";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const response = await fetch(import.meta.env.VITE_BASE_URL + "/api/orders/get/all");
        if (!response.ok) {
          throw new Error("Failed to fetch orders.");
        }
        const data = await response.json();
        setOrders(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchOrders();
  }, []);

  const formatPrice = (price) => {
    return `${price > 0 ? "+" : ""}₹ ${Math.abs(price)}`;
  };

  const statusColor = (status) => {
    switch (status) {
      case "Delivered": // Assuming "Delivered" or similar is a success status
      case "Done":
        return "text-green-500";
      case "Cancelled": // Assuming "Cancelled" is a failure status
      case "Failed":
        return "text-red-500";
      case "Pending":
        return "text-yellow-500";
      default:
        return "text-gray-500";
    }
  };

  const renderTableBody = () => {
    if (loading) {
      return (
        <tr>
          <td colSpan="7" className="px-6 py-4 text-center">Loading orders...</td>
        </tr>
      );
    }

    if (error) {
      return (
        <tr>
          <td colSpan="7" className="px-6 py-4 text-center text-red-500">{error}</td>
        </tr>
      );
    }

    return orders.map((order, index) => {
      const totalAmount = order.items.reduce((sum, item) => sum + item.quantity, 0);
      const isFailed = order.orderStatus === 'Failed' || order.orderStatus === 'Cancelled';
      const displayPrice = isFailed ? -order.total : order.total;

      return (
        <tr key={order._id}>
          <td className="px-6 py-4">{index + 1}.</td>
          <td className="px-6 py-4">{order.items[0]?.name || 'N/A'}</td>
          <td className="px-6 py-4">{order.user?.name || 'N/A'}</td>
          <td className="px-6 py-4">{totalAmount}</td>
          <td
            className={`px-6 py-3 font-medium ${
              displayPrice > 0 ? "text-green-500" : "text-red-500"
            }`}
          >
            {formatPrice(displayPrice)}
          </td>
          <td className="px-6 py-3">
            {new Date(order.createdAt).toLocaleDateString('en-US', {
              day: 'numeric', month: 'long', year: 'numeric'
            })}
          </td>
          <td className={`px-6 py-3 font-medium ${statusColor(order.orderStatus)}`}>
            {order.orderStatus}
          </td>
        </tr>
      );
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar tab={"orders"}/>
      <div className="mx-auto mt-6 max-w-10xl px-6 h-screen">
        <div className="flex items-center justify-between bg-white px-6 py-4 mt-5 shadow rounded-t-md">
        <h1 className="text-lg font-semibold">Orders</h1>
        <div className="flex items-center gap-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="h-10 w-64 rounded-full border pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-[#2A85FF]"
            />
            <svg
              className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <button className="flex items-center gap-2 rounded-full border px-4 py-2 text-sm text-gray-600 shadow-sm hover:bg-gray-50">
            <Calendar className="h-4 w-4" /> Last week
          </button>
        </div>
      </div>
        <div className="overflow-hidden rounded-xl bg-white shadow-md">
          <table className="w-full table-auto text-left">
            <thead className="bg-gray-50 text-sm font-medium text-gray-500">
              <tr>
                <th className="px-6 py-3">S.NO</th>
                <th className="px-6 py-3">Product</th>
                <th className="px-6 py-3">Customer</th>
                <th className="px-6 py-3">Amount</th>
                <th className="px-6 py-3">Price</th>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
              {renderTableBody()}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

