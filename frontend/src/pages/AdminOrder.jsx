"use client";

import { useState } from "react";
import {
  Phone,
  Mail,
  RefreshCcw,
  Edit,
  UserPlus,
} from "lucide-react";

export default function AdminOrderPage() {
  const [status, setStatus] = useState("Pending");

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="bg-white rounded-lg shadow-sm border border-[#E5E7EB] p-4 flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-semibold">Order #5832 Details</h1>
          <span className="px-3 py-1 text-sm rounded-full bg-yellow-100 text-yellow-700">
            {status}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Update Status
          </button>
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
            Assign Agent
          </button>
          <div className="flex gap-1">
            <button className="p-2 rounded-lg border hover:bg-gray-100">
              <Phone className="w-4 h-4" />
            </button>
            <button className="p-2 rounded-lg border hover:bg-gray-100">
              <Mail className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-[#E5E7EB] p-6">
            <h2 className="text-lg font-medium mb-4">Customer Information</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="font-medium">Sarah Johnson</p>
                <p className="text-gray-500">sarah.johnson@email.com</p>
                <p className="text-gray-500">+1 (555) 123-4567</p>
                <p className="text-gray-500">Downtown Market Store</p>
              </div>
              <div>
                <p className="text-gray-700">123 Main Street, Apt 4B</p>
                <p className="text-gray-700">New York, NY 10001</p>
                <p className="text-gray-500">Preferred: Email</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-[#E5E7EB] p-6">
            <h2 className="text-lg font-medium mb-4">Order Items</h2>
            <table className="w-full text-sm">
              <thead className="border-b border-[#E5E7EB] text-gray-600">
                <tr>
                  <th className="py-2 text-left">Item</th>
                  <th className="py-2 text-left">Quantity</th>
                  <th className="py-2 text-left">Price</th>
                  <th className="py-2 text-left">Total</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-[#E5E7EB]">
                  <td className="py-2">
                    <p className="font-medium">
                        Organic Apples</p>
                    <p className="text-gray-500 text-xs">Fresh produce</p>
                  </td>
                  <td>2 lbs</td>
                  <td>$4.99/lb</td>
                  <td>$9.98</td>
                </tr>
                <tr>
                  <td className="py-2">
                    <p className="font-medium">Whole Wheat Bread</p>
                    <p className="text-gray-500 text-xs">Bakery</p>
                  </td>
                  <td>1</td>
                  <td>$3.99</td>
                  <td>$3.99</td>
                </tr>
              </tbody>
            </table>

            <div className="mt-4 text-sm text-gray-700 space-y-1">
              <p className="flex justify-between">
                <span>Subtotal</span> <span>$13.97</span>
              </p>
              <p className="flex justify-between">
                <span>Taxes</span> <span>$1.12</span>
              </p>
              <p className="flex justify-between">
                <span>Delivery Fee</span> <span>$2.99</span>
              </p>
              <p className="flex justify-between font-semibold border-t pt-2">
                <span>Total</span> <span>$18.08</span>
              </p>
            </div>

            <div className="mt-3 text-sm">
              <p className="font-medium">
                Payment Method:{" "}
                <span className="text-green-600">Paid Online</span>
              </p>
              <p className="text-gray-500">Credit Card ending in 4567</p>
              <p className="text-gray-500 text-xs">TXN# ABC123456</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-[#E5E7EB] p-6">
            <h2 className="text-lg font-medium mb-4">Delivery Details</h2>
            <div className="grid grid-cols-2 gap-5">
              <div>
                <p className="flex items-center gap-4 mb-4 text-gray-700">
                  <svg width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.2001 0.199951C25.0366 0.199951 32.2001 7.3634 32.2001 16.2C32.2001 25.0365 25.0366 32.2 16.2001 32.2C7.36352 32.2 0.200073 25.0365 0.200073 16.2C0.200073 7.3634 7.36352 0.199951 16.2001 0.199951Z" fill="#DBEAFE"/>
<path d="M16.2001 0.199951C25.0366 0.199951 32.2001 7.3634 32.2001 16.2C32.2001 25.0365 25.0366 32.2 16.2001 32.2C7.36352 32.2 0.200073 25.0365 0.200073 16.2C0.200073 7.3634 7.36352 0.199951 16.2001 0.199951Z" stroke="#E5E7EB"/>
<path d="M21.8003 25.8H10.6001V6.59985H21.8003V25.8Z" stroke="#E5E7EB"/>
<g clip-path="url(#clip0_64_651)">
<path d="M16.2001 16.2C17.0488 16.2 17.8627 15.8629 18.4628 15.2628C19.063 14.6627 19.4001 13.8487 19.4001 13C19.4001 12.1514 19.063 11.3374 18.4628 10.7373C17.8627 10.1372 17.0488 9.80005 16.2001 9.80005C15.3514 9.80005 14.5375 10.1372 13.9374 10.7373C13.3372 11.3374 13.0001 12.1514 13.0001 13C13.0001 13.8487 13.3372 14.6627 13.9374 15.2628C14.5375 15.8629 15.3514 16.2 16.2001 16.2ZM15.0576 17.4C12.5951 17.4 10.6001 19.395 10.6001 21.8575C10.6001 22.2675 10.9326 22.6 11.3426 22.6H21.0576C21.4676 22.6 21.8001 22.2675 21.8001 21.8575C21.8001 19.395 19.8051 17.4 17.3426 17.4H15.0576Z" fill="#2563EB"/>
</g>
<defs>
<clipPath id="clip0_64_651">
<path d="M10.6001 9.80005H21.8001V22.6H10.6001V9.80005Z" fill="white"/>
</clipPath>
</defs>
</svg>

                  Not Assigned
                </p>
                <p className="flex items-center gap-4 mb-3 text-gray-700">
                 <svg width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.2001 0.199951C25.0366 0.199951 32.2001 7.3634 32.2001 16.2C32.2001 25.0365 25.0366 32.2 16.2001 32.2C7.36352 32.2 0.200073 25.0365 0.200073 16.2C0.200073 7.3634 7.36352 0.199951 16.2001 0.199951Z" fill="#DCFCE7"/>
<path d="M16.2001 0.199951C25.0366 0.199951 32.2001 7.3634 32.2001 16.2C32.2001 25.0365 25.0366 32.2 16.2001 32.2C7.36352 32.2 0.200073 25.0365 0.200073 16.2C0.200073 7.3634 7.36352 0.199951 16.2001 0.199951Z" stroke="#E5E7EB"/>
<path d="M24.2001 25.8H8.20007V6.59985H24.2001V25.8Z" stroke="#E5E7EB"/>
<g clip-path="url(#clip0_64_653)">
<path d="M15.2001 10.6002C14.8676 10.6002 14.6001 10.8677 14.6001 11.2002C14.6001 11.5327 14.8676 11.8002 15.2001 11.8002H16.6426L17.0526 12.5577L14.6001 14.6002L13.4676 13.4677C13.1676 13.1677 12.7601 13.0002 12.3351 13.0002H9.80007C9.35757 13.0002 9.00007 13.3577 9.00007 13.8002V14.6002H11.4001C13.6101 14.6002 15.4001 16.3902 15.4001 18.6002C15.4001 18.8752 15.3726 19.1427 15.3201 19.4002H17.0801C17.0276 19.1427 17.0001 18.8752 17.0001 18.6002C17.0001 17.2952 17.6251 16.1352 18.5926 15.4052L18.9776 16.1202C18.2601 16.7077 17.8001 17.6002 17.8001 18.6002C17.8001 20.3677 19.2326 21.8002 21.0001 21.8002C22.7676 21.8002 24.2001 20.3677 24.2001 18.6002C24.2001 16.8327 22.7676 15.4002 21.0001 15.4002C20.6626 15.4002 20.3376 15.4527 20.0326 15.5502L18.6551 13.0002H20.2001C20.6426 13.0002 21.0001 12.6427 21.0001 12.2002V11.4002C21.0001 10.9577 20.6426 10.6002 20.2001 10.6002H19.6901C19.5026 10.6002 19.3226 10.6652 19.1776 10.7852L17.9926 11.7727L17.6426 11.1227C17.4676 10.8002 17.1301 10.5977 16.7626 10.5977H15.2001V10.6002ZM19.7676 17.5802L20.4726 18.8852C20.6301 19.1777 20.9951 19.2852 21.2851 19.1277C21.5751 18.9702 21.6851 18.6052 21.5276 18.3152L20.8226 17.0102C20.8801 17.0027 20.9401 17.0002 21.0001 17.0002C21.8826 17.0002 22.6001 17.7177 22.6001 18.6002C22.6001 19.4827 21.8826 20.2002 21.0001 20.2002C20.1176 20.2002 19.4001 19.4827 19.4001 18.6002C19.4001 18.2127 19.5376 17.8577 19.7676 17.5802ZM12.8826 19.2002C12.6451 19.7877 12.0701 20.2002 11.4001 20.2002C10.5176 20.2002 9.80007 19.4827 9.80007 18.6002C9.80007 17.7177 10.5176 17.0002 11.4001 17.0002C12.0726 17.0002 12.6476 17.4127 12.8826 18.0002H14.5426C14.2626 16.5202 12.9626 15.4002 11.4001 15.4002C9.63257 15.4002 8.20007 16.8327 8.20007 18.6002C8.20007 20.3677 9.63257 21.8002 11.4001 21.8002C12.9626 21.8002 14.2626 20.6802 14.5451 19.2002H12.8826ZM11.4001 19.4002C11.6122 19.4002 11.8157 19.3159 11.9658 19.1658C12.1158 19.0158 12.2001 18.8123 12.2001 18.6002C12.2001 18.388 12.1158 18.1845 11.9658 18.0345C11.8157 17.8844 11.6122 17.8002 11.4001 17.8002C11.1879 17.8002 10.9844 17.8844 10.8344 18.0345C10.6844 18.1845 10.6001 18.388 10.6001 18.6002C10.6001 18.8123 10.6844 19.0158 10.8344 19.1658C10.9844 19.3159 11.1879 19.4002 11.4001 19.4002Z" fill="#16A34A"/>
</g>
<defs>
<clipPath id="clip0_64_653">
<path d="M8.20007 9.80005H24.2001V22.6H8.20007V9.80005Z" fill="white"/>
</clipPath>
</defs>
</svg>

                  Bike Delivery
                </p>
                <p className="flex items-center gap-4 text-gray-700">
                 <svg width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.2001 0.199951C25.0366 0.199951 32.2001 7.3634 32.2001 16.2C32.2001 25.0365 25.0366 32.2 16.2001 32.2C7.36352 32.2 0.200073 25.0365 0.200073 16.2C0.200073 7.3634 7.36352 0.199951 16.2001 0.199951Z" fill="#FEF9C3"/>
<path d="M16.2001 0.199951C25.0366 0.199951 32.2001 7.3634 32.2001 16.2C32.2001 25.0365 25.0366 32.2 16.2001 32.2C7.36352 32.2 0.200073 25.0365 0.200073 16.2C0.200073 7.3634 7.36352 0.199951 16.2001 0.199951Z" stroke="#E5E7EB"/>
<path d="M22.6 25.8H9.80017V6.59985H22.6V25.8Z" stroke="#E5E7EB"/>
<g clip-path="url(#clip0_64_655)">
<path d="M16.2002 9.80005C17.8976 9.80005 19.5254 10.4743 20.7257 11.6746C21.9259 12.8748 22.6002 14.5027 22.6002 16.2C22.6002 17.8974 21.9259 19.5253 20.7257 20.7255C19.5254 21.9258 17.8976 22.6 16.2002 22.6C14.5028 22.6 12.8749 21.9258 11.6747 20.7255C10.4745 19.5253 9.80017 17.8974 9.80017 16.2C9.80017 14.5027 10.4745 12.8748 11.6747 11.6746C12.8749 10.4743 14.5028 9.80005 16.2002 9.80005ZM15.6002 12.8V16.2C15.6002 16.4 15.7002 16.5875 15.8677 16.7L18.2677 18.3C18.5427 18.485 18.9152 18.41 19.1002 18.1325C19.2852 17.855 19.2102 17.485 18.9327 17.3L16.8002 15.88V12.8C16.8002 12.4675 16.5327 12.2 16.2002 12.2C15.8677 12.2 15.6002 12.4675 15.6002 12.8Z" fill="#CA8A04"/>
</g>
<defs>
<clipPath id="clip0_64_655">
<path d="M9.80017 9.80005H22.6002V22.6H9.80017V9.80005Z" fill="white"/>
</clipPath>
</defs>
</svg>

                  30-45 mins
                </p>
              </div>
              <div className="space-y-2">
                <p className="flex items-center gap-2 text-sm">
                  <span className="w-3 h-3 rounded-full bg-green-500"></span>
                  Order Placed - Dec 15, 2:30 PM
                </p>
                <p className="flex items-center gap-2 text-sm">
                  <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                  Preparing - In Progress
                </p>
                <p className="flex items-center gap-2 text-sm text-gray-400">
                  <span className="w-3 h-3 rounded-full bg-gray-300"></span>
                  Out for Delivery - Pending
                </p>
                <p className="flex items-center gap-2 text-sm text-gray-400">
                  <span className="w-3 h-3 rounded-full bg-gray-300"></span>
                  Delivered - Pending
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-[#E5E7EB] p-6">
            <h2 className="text-lg font-medium mb-4">Admin Notes</h2>
            <textarea
              placeholder="Add internal notes for this order..."
              className="w-full border rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              rows="3"
            />
            <div className="flex justify-between mt-3">
              <div className="flex gap-2">
                <span className="px-2 py-1 bg-blue-100 text-blue-600 text-xs rounded-full">
                  Support
                </span>
                <span className="px-2 py-1 bg-green-100 text-green-600 text-xs rounded-full">
                  Delivery Team
                </span>
              </div>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Save Note
              </button>
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-[#E5E7EB] p-6 space-y-3">
            <h2 className="text-lg font-medium">Quick Actions</h2>
            <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2">
              <Phone className="w-4 h-4" /> Call Customer
            </button>
            <button className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center justify-center gap-2">
              <Mail className="w-4 h-4" /> Email Customer
            </button>
            <button className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center justify-center gap-2">
              <RefreshCcw className="w-4 h-4" /> Re-send Invoice
            </button>

            <div className="mt-4">
              <label className="text-sm font-medium text-gray-700">
                Update Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="mt-1 w-full border rounded-lg px-3 py-2 text-gray-600"
              >
                <option>Pending</option>
                <option>Preparing</option>
                <option>In Transit</option>
                <option>Delivered</option>
                <option>Cancelled</option>
              </select>
            </div>

            <button className="w-full flex gap-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
              Cancel Order
            </button>
            <button className="w-full px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600">
              Process Refund
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
