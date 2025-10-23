"use client"
import { useEffect, useState } from "react"
import { SideBar } from "../components/SideBar"
import { AdminNav } from "../components/AdminNav"

export default function AdminCustomers() {
  const [customers, setCustomers] = useState([])

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/customers/get/all`)
        const data = await res.json()
        setCustomers(data)
      } catch (err) {
        console.error("Failed to fetch customers:", err)
      }
    }
    fetchCustomers()
  }, [])

  return (
    <div className="flex min-h-screen bg-gray-50">
      <SideBar route={"customers"} />
      <div className="flex-1">
        <AdminNav />
        <main className="p-6 space-y-6">
          <div className="-mt-5">
            <h1 className="text-xl font-semibold">Customer Management</h1>
            <p className="text-sm text-gray-500">
              Manage and track all customer accounts and activities
            </p>
          </div>

          <div className="overflow-hidden rounded-lg bg-white shadow">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 text-[#6B7280]">
                <tr>
                  <th className="px-4 py-3">Customer Details</th>
                  <th className="px-4 py-3">Contact Info</th>
                  <th className="px-4 py-3">Order History</th>
                  <th className="px-4 py-3">Loyalty Points</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((customer, i) => (
                  <tr key={i} className="border-t border-[#E5E7EB] hover:bg-gray-50">
                    <td className="px-4 py-3 flex gap-3">
                      <img
                        src={`https://i.pravatar.cc/40?img=${i + 1}`}
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <p className="font-medium">{customer.name}</p>
                        <p className="text-xs text-gray-500">{customer.id}</p>
                        <p className="text-xs text-gray-400">{customer.address}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-medium">{customer.ownerName}</p>
                      <p className="text-xs text-gray-500">{customer.email}</p>
                      <p className="text-xs text-gray-400">{customer.phone}</p>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-xs text-gray-500">{customer.orders} orders</p>
                      <p className="text-sm font-medium text-green-600">{customer.revenue}</p>
                    </td>
                    <td className="px-4 py-3">{customer.loyaltyPoints}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded px-2 py-1 text-xs font-medium ${
                          customer.userStatus === "Active"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {customer.userStatus}
                      </span>
                    </td>
                    <td className="px-4 py-3 flex gap-2 -mt-15"> <svg width="19" height="16" viewBox="0 0 19 16" fill="none" xmlns="http://www.w3.org/2000/svg"> <g clip-path="url(#clip0_34_2946)"> <g clip-path="url(#clip1_34_2946)"> <path d="M9.45314 1C6.92814 1 4.90626 2.15 3.43439 3.51875C1.97189 4.875 0.993762 6.5 0.531262 7.61562C0.428137 7.8625 0.428137 8.1375 0.531262 8.38437C0.993762 9.5 1.97189 11.125 3.43439 12.4812C4.90626 13.85 6.92814 15 9.45314 15C11.9781 15 14 13.85 15.4719 12.4812C16.9344 11.1219 17.9125 9.5 18.3781 8.38437C18.4813 8.1375 18.4813 7.8625 18.3781 7.61562C17.9125 6.5 16.9344 4.875 15.4719 3.51875C14 2.15 11.9781 1 9.45314 1ZM4.95314 8C4.95314 6.80653 5.42724 5.66193 6.27116 4.81802C7.11507 3.97411 8.25966 3.5 9.45314 3.5C10.6466 3.5 11.7912 3.97411 12.6351 4.81802C13.479 5.66193 13.9531 6.80653 13.9531 8C13.9531 9.19347 13.479 10.3381 12.6351 11.182C11.7912 12.0259 10.6466 12.5 9.45314 12.5C8.25966 12.5 7.11507 12.0259 6.27116 11.182C5.42724 10.3381 4.95314 9.19347 4.95314 8ZM9.45314 6C9.45314 7.10313 8.55626 8 7.45314 8C7.23126 8 7.01876 7.9625 6.81876 7.89687C6.64689 7.84062 6.44689 7.94688 6.45314 8.12813C6.46251 8.34375 6.49376 8.55937 6.55314 8.775C6.98126 10.375 8.62814 11.325 10.2281 10.8969C11.8281 10.4688 12.7781 8.82188 12.35 7.22188C12.0031 5.925 10.8563 5.05312 9.58126 5C9.40001 4.99375 9.29376 5.19062 9.35001 5.36562C9.41564 5.56562 9.45314 5.77812 9.45314 6Z" fill="#2563EB"/> </g> </g> <defs> <clipPath id="clip0_34_2946"> <rect width="18" height="16" fill="white" transform="translate(0.453125)"/> </clipPath> <clipPath id="clip1_34_2946"> <path d="M0.453125 0H18.4531V16H0.453125V0Z" fill="white"/> </clipPath> </defs> </svg> <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg"> <g clip-path="url(#clip0_34_2950)"> <path d="M1.95312 2C1.125 2 0.453125 2.67188 0.453125 3.5C0.453125 3.97187 0.675 4.41562 1.05313 4.7L7.85313 9.8C8.20937 10.0656 8.69688 10.0656 9.05313 9.8L15.8531 4.7C16.2312 4.41562 16.4531 3.97187 16.4531 3.5C16.4531 2.67188 15.7812 2 14.9531 2H1.95312ZM0.453125 5.5V12C0.453125 13.1031 1.35 14 2.45312 14H14.4531C15.5562 14 16.4531 13.1031 16.4531 12V5.5L9.65312 10.6C8.94063 11.1344 7.96563 11.1344 7.25313 10.6L0.453125 5.5Z" fill="#4B5563"/> </g> <defs> <clipPath id="clip0_34_2950"> <path d="M0.453125 0H16.4531V16H0.453125V0Z" fill="white"/> </clipPath> </defs> </svg> </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  )
}
