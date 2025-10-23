"use client"
import { useEffect, useState } from "react"
import { Star, Eye, Edit, Trash2, Check, X } from "lucide-react"
import { SideBar } from "../components/SideBar"
import { AdminNav } from "../components/AdminNav"
import { Link } from "react-router-dom"
import axios from "axios"

export default function AdminStore() {
  const [stores, setStores] = useState([])
  const [stats, setStats] = useState({ totalStores: 0, totalActiveStores: 0, totalPendingKyc: 0 })

  const BASE_URL = import.meta.env.VITE_BASE_URL
  const fetchData = async () => {
    try {
      const storesRes = await axios.get(`${BASE_URL}/api/stores/get/all`)
      setStores(storesRes.data.stores)

      const statsRes = await axios.get(`${BASE_URL}/api/stores/stats`)
      setStats(statsRes.data.stats)
    } catch (error) {
      console.error("Error fetching store data:", error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [BASE_URL])

  const updateKycStatus = async (id, status) => {
    try {
      await axios.put(`${BASE_URL}/api/stores/update/kyc-status/${id}`, { kycStatus: status })
      fetchData()
    } catch (error) {
      console.error("Error updating KYC status:", error)
    }
  }

  const updateStoreStatus = async (id, status) => {
    try {
      await axios.put(`${BASE_URL}/api/stores/update/store-status/${id}`, { storeStatus: status })
      fetchData()
    } catch (error) {
      console.error("Error updating store status:", error)
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <SideBar route={"stores"} />
      <div className="flex-1">
        <AdminNav />
        <main className="p-6 space-y-6">
         <div className="-mt-5"> <h1 className="text-xl font-semibold">Store Partners</h1> <p className="text-sm text-gray-500"> Manage store partnerships and approval workflows </p> </div> <div className="grid grid-cols-4 gap-4"> <div className="flex justify-between gap-3 rounded-lg bg-white p-4 shadow"> <div> <p className="text-sm text-gray-500">Total Stores</p> <p className="text-2xl font-bold">{stats.totalStores}</p> </div> {/* SVG icon */} </div> <div className="flex justify-between gap-3 rounded-lg bg-white p-4 py-6 shadow"> <div> <p className="text-sm text-gray-500">Active Stores</p> <p className="text-2xl font-bold">{stats.totalActiveStores}</p> </div> </div> <div className="flex justify-between gap-3 rounded-lg bg-white p-4 shadow"> <div> <p className="text-sm text-gray-500">Pending Approval</p> <p className="text-2xl font-bold">{stats.totalPendingKyc}</p> </div> </div> <div className="flex justify-between gap-3 rounded-lg bg-white p-4 shadow"> <div> <p className="text-sm text-gray-500">Avg Rating</p> <p className="text-2xl font-bold">4.6</p> </div> </div> </div> <div className="flex items-center justify-between bg-white p-4 py-6"> <input type="text" placeholder="Search stores, owners, or categories..." className="w-1/3 rounded-md border border-[#E5E7EB] px-3 py-2 text-sm" /> <div className="flex gap-3"> <select className="rounded-md border border-[#E5E7EB] px-3 py-2 text-sm"> <option>All Status</option> <option>Active</option> <option>Pending</option> </select> <button className="rounded-md border border-[#E5E7EB] px-3 py-2 text-sm">More Filters</button> <button className="rounded-md border border-[#E5E7EB] px-3 py-2 text-sm">Export Data</button> <Link to={"/admin/store/add"} className="rounded-md bg-blue-600 px-3 py-2 text-sm text-white"> Add New Store </Link> </div> </div>
          <div className="grid grid-cols-4 gap-4">
          </div>
          <div className="overflow-hidden rounded-lg bg-white shadow">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 text-[#6B7280]">
                <tr>
                  <th className="px-4 py-3">Store Details</th>
                  <th className="px-4 py-3">Owner Info</th>
                  <th className="px-4 py-3">Performance</th>
                  <th className="px-4 py-3">KYC Status</th>
                  <th className="px-4 py-3">Store Status</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {stores.map((store, i) => (
                  <tr key={i} className="border-t border-[#E5E7EB] hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <p className="font-medium">{store.storeName}</p>
                      <p className="text-xs text-gray-500">{store._id} • {store.category}</p>
                      <p className="text-xs text-gray-400">
                        {store.address.street}, {store.address.city}, {store.address.state}, {store.address.zip}
                      </p>
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-medium">{store.owner.fullName}</p>
                      <p className="text-xs text-gray-500">{store.owner.email}</p>
                      <p className="text-xs text-gray-400">{store.owner.phone}</p>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center text-yellow-600">
                        <Star className="h-4 w-4 mr-1" /> 4.6
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded px-2 py-1 text-xs font-medium ${
                          store.kycStatus === "Verified"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {store.kycStatus}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded px-2 py-1 text-xs font-medium ${
                          store.storeStatus === "Active"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {store.storeStatus}
                      </span>
                    </td>
                    <td className="px-4 py-3 flex gap-2 mt-5">
                      <Eye className="h-4 w-4 cursor-pointer text-gray-600" />
                      <Edit className="h-4 w-4 cursor-pointer text-blue-600" />
                      <Check
                        className="h-4 w-4 cursor-pointer text-green-600"
                        onClick={() => updateKycStatus(store._id, "Verified")}
                      />
                      <X
                        className="h-4 w-4 cursor-pointer text-red-600"
                        onClick={() => updateKycStatus(store._id, "Pending")}
                      />
                      <Trash2 className="h-4 w-4 cursor-pointer text-gray-400" />
                    </td>
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
