import { useState, useEffect } from "react";
import { Calendar, Eye, Trash2 } from "lucide-react";
import { NavBar } from "../components/NavBar";

export default function CustomersTable() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchCustomers() {
      try {
        const response = await fetch(import.meta.env.VITE_BASE_URL + "/api/customers/get/all");
        if (!response.ok) {
          throw new Error("Failed to fetch customer data.");
        }
        const data = await response.json();
        setCustomers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchCustomers();
  }, []);

  const statusBadge = (status) => {
    return status === "Active"
      ? "bg-blue-100 text-blue-600"
      : "bg-red-100 text-red-600";
  };
  
  const renderTableBody = () => {
    if (loading) {
      return (
        <tr>
          <td colSpan="8" className="px-6 py-4 text-center">Loading customers...</td>
        </tr>
      );
    }

    if (error) {
      return (
        <tr>
          <td colSpan="8" className="px-6 py-4 text-center text-red-500">{error}</td>
        </tr>
      );
    }

    return customers.map((c, index) => (
      <tr key={c._id}>
        <td className="px-6 py-4">{index + 1}</td>
        <td className="px-6 py-4">{c.name}</td>
        <td className="px-6 py-4">{c.email}</td>
        <td className="px-6 py-4">{c.phone}</td>
        <td className="px-6 py-4">N/A</td>
        <td className="px-6 py-4">N/A</td>
        <td>
          <span className={`px-3 py-1 rounded-full text-sm ${statusBadge(c.userStatus)}`}>
            {c.userStatus}
          </span>
        </td>
        <td className="px-6 py-4 flex gap-3">
          <button className="text-gray-500 hover:text-blue-600">
            <Eye size={18} />
          </button>
          <button className="text-gray-500 hover:text-red-600">
            <Trash2 size={18} />
          </button>
        </td>
      </tr>
    ));
  };


  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar tab={"customer"} />
      <div className="mx-auto mt-6 max-w-10xl px-6 h-screen">
        <div className="flex items-center justify-between bg-white px-6 py-4 mt-5 shadow rounded-t-md">
          <h1 className="text-lg font-semibold">Customers</h1>
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
                <th className="px-2 py-3">C.NO</th>
                <th className="px-5 py-3">Name</th>
                <th className="px-5 py-3">Email</th>
                <th className="px-5 py-3">Phone Number</th>
                <th className="px-5 py-3">Orders History</th>
                <th className="px-5 py-3">Revenue</th>
                <th className="px-2 py-3">Status</th>
                <th className="px-6 py-3">Actions</th>
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

