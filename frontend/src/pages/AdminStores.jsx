"use client"
import { useEffect, useState } from "react"
import { Star, Eye, Edit, Trash2, Check, X, ShieldCheck, Clock } from "lucide-react"
import { SideBar } from "../components/SideBar"
import { AdminNav } from "../components/AdminNav"
import { Link } from "react-router-dom"
import axios from "axios"

export default function AdminStore() {
  const [stores, setStores] = useState([])
  const [stats, setStats] = useState({ totalStores: 0, totalActiveStores: 0, totalPendingKyc: 0 })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storesRes = await axios.get("https://snazzl-backend.vercel.app/api/stores/get/all")
        setStores(storesRes.data.stores)

        const statsRes = await axios.get("https://snazzl-backend.vercel.app/api/stores/stats")
        setStats(statsRes.data.stats)
      } catch (error) {
        console.error("Error fetching store data:", error)
      }
    }
    fetchData()
  }, [])

  return (
    <div className="flex min-h-screen bg-gray-50">
      <SideBar route={"stores"} />
      <div className="flex-1">
        <AdminNav />
        <main className="p-6 space-y-6">
          <div className="-mt-5">
            <h1 className="text-xl font-semibold">Store Partners</h1>
            <p className="text-sm text-gray-500">
              Manage store partnerships and approval workflows
            </p>
          </div>
          <div className="grid grid-cols-4 gap-4">
            <div className="flex justify-between gap-3 rounded-lg bg-white p-4 shadow">
              <div>
                <p className="text-sm text-gray-500">Total Stores</p>
                <p className="text-2xl font-bold">{stats.totalStores}</p>
              </div>
<svg width="48" className="mt-2" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M40 0C44.4183 0 48 3.58172 48 8V40C48 44.4183 44.4183 48 40 48H8C3.58172 48 0 44.4183 0 40V8C5.15405e-07 3.58172 3.58172 0 8 0H40Z" fill="#DBEAFE"/>
<path d="M40 0C44.4183 0 48 3.58172 48 8V40C48 44.4183 44.4183 48 40 48H8C3.58172 48 0 44.4183 0 40V8C5.15405e-07 3.58172 3.58172 0 8 0H40Z" stroke="#E5E7EB"/>
<path d="M35.25 38H12.75V10H35.25V38Z" />
<g clip-path="url(#clip0_34_1153)">
<path d="M34.1406 17.5547L31.9023 14.0117C31.7031 13.6953 31.3477 13.5 30.9688 13.5H17.0313C16.6523 13.5 16.2969 13.6953 16.0977 14.0117L13.8555 17.5547C12.6992 19.3828 13.7227 21.9258 15.8828 22.2188C16.0391 22.2383 16.1992 22.25 16.3555 22.25C17.375 22.25 18.2813 21.8047 18.9023 21.1172C19.5234 21.8047 20.4297 22.25 21.4492 22.25C22.4688 22.25 23.375 21.8047 23.9961 21.1172C24.6172 21.8047 25.5234 22.25 26.543 22.25C27.5664 22.25 28.4688 21.8047 29.0898 21.1172C29.7148 21.8047 30.6172 22.25 31.6367 22.25C31.7969 22.25 31.9531 22.2383 32.1094 22.2188C34.2773 21.9297 35.3047 19.3867 34.1445 17.5547H34.1406ZM32.2695 23.457H32.2656C32.0586 23.4844 31.8477 23.5 31.6328 23.5C31.1484 23.5 30.6836 23.4258 30.25 23.293V28.5H17.75V23.2891C17.3125 23.4258 16.8438 23.5 16.3594 23.5C16.1445 23.5 15.9297 23.4844 15.7227 23.457H15.7188C15.5586 23.4336 15.4023 23.4062 15.25 23.3672V28.5V31C15.25 32.3789 16.3711 33.5 17.75 33.5H30.25C31.6289 33.5 32.75 32.3789 32.75 31V28.5V23.3672C32.5938 23.4062 32.4375 23.4375 32.2695 23.457Z" fill="#2563EB"/>
</g>
<defs>
<clipPath id="clip0_34_1153">
<path d="M12.75 13.5H35.25V33.5H12.75V13.5Z" fill="white"/>
</clipPath>
</defs>
</svg>

            </div>
            <div className="flex justify-between gap-3 rounded-lg bg-white p-4 py-6 shadow">
              <div>
                <p className="text-sm text-gray-500">Active Stores</p>
                <p className="text-2xl font-bold">{stats.totalActiveStores}</p>
              </div>
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M40 0C44.4183 0 48 3.58172 48 8V40C48 44.4183 44.4183 48 40 48H8C3.58172 48 0 44.4183 0 40V8C5.15405e-07 3.58172 3.58172 0 8 0H40Z" fill="#DCFCE7"/>
<path d="M40 0C44.4183 0 48 3.58172 48 8V40C48 44.4183 44.4183 48 40 48H8C3.58172 48 0 44.4183 0 40V8C5.15405e-07 3.58172 3.58172 0 8 0H40Z" stroke="#E5E7EB"/>
<path d="M34 38H14V10H34V38Z"/>
<g clip-path="url(#clip0_34_1155)">
<path d="M24 33.5C26.6522 33.5 29.1957 32.4464 31.0711 30.5711C32.9464 28.6957 34 26.1522 34 23.5C34 20.8478 32.9464 18.3043 31.0711 16.4289C29.1957 14.5536 26.6522 13.5 24 13.5C21.3478 13.5 18.8043 14.5536 16.9289 16.4289C15.0536 18.3043 14 20.8478 14 23.5C14 26.1522 15.0536 28.6957 16.9289 30.5711C18.8043 32.4464 21.3478 33.5 24 33.5ZM28.4141 21.6641L23.4141 26.6641C23.0469 27.0312 22.4531 27.0312 22.0898 26.6641L19.5898 24.1641C19.2227 23.7969 19.2227 23.2031 19.5898 22.8398C19.957 22.4766 20.5508 22.4727 20.9141 22.8398L22.75 24.6758L27.0859 20.3359C27.4531 19.9688 28.0469 19.9688 28.4102 20.3359C28.7734 20.7031 28.7773 21.2969 28.4102 21.6602L28.4141 21.6641Z" fill="#16A34A"/>
</g>
<defs>
<clipPath id="clip0_34_1155">
<path d="M14 13.5H34V33.5H14V13.5Z" fill="white"/>
</clipPath>
</defs>
</svg>

            </div>
            <div className="flex justify-between gap-3 rounded-lg bg-white p-4 shadow">
              <div>
                <p className="text-sm text-gray-500">Pending Approval</p>
                <p className="text-2xl font-bold">{stats.totalPendingKyc}</p>
              </div>
              <svg className="mt-2" width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M40 0C44.4183 0 48 3.58172 48 8V40C48 44.4183 44.4183 48 40 48H8C3.58172 48 0 44.4183 0 40V8C5.15405e-07 3.58172 3.58172 0 8 0H40Z" fill="#FEF9C3"/>
<path d="M40 0C44.4183 0 48 3.58172 48 8V40C48 44.4183 44.4183 48 40 48H8C3.58172 48 0 44.4183 0 40V8C5.15405e-07 3.58172 3.58172 0 8 0H40Z" stroke="#E5E7EB"/>
<path d="M34 38H14V10H34V38Z"/>
<g clip-path="url(#clip0_34_1157)">
<path d="M24 13.5C26.6522 13.5 29.1957 14.5536 31.0711 16.4289C32.9464 18.3043 34 20.8478 34 23.5C34 26.1522 32.9464 28.6957 31.0711 30.5711C29.1957 32.4464 26.6522 33.5 24 33.5C21.3478 33.5 18.8043 32.4464 16.9289 30.5711C15.0536 28.6957 14 26.1522 14 23.5C14 20.8478 15.0536 18.3043 16.9289 16.4289C18.8043 14.5536 21.3478 13.5 24 13.5ZM23.0625 18.1875V23.5C23.0625 23.8125 23.2188 24.1055 23.4805 24.2812L27.2305 26.7812C27.6602 27.0703 28.2422 26.9531 28.5312 26.5195C28.8203 26.0859 28.7031 25.5078 28.2695 25.2188L24.9375 23V18.1875C24.9375 17.668 24.5195 17.25 24 17.25C23.4805 17.25 23.0625 17.668 23.0625 18.1875Z" fill="#CA8A04"/>
</g>
<defs>
<clipPath id="clip0_34_1157">
<path d="M14 13.5H34V33.5H14V13.5Z" fill="white"/>
</clipPath>
</defs>
</svg>

            </div>
            <div className="flex justify-between gap-3 rounded-lg bg-white p-4 shadow">
              <div>
                <p className="text-sm text-gray-500">Avg Rating</p>
                <p className="text-2xl font-bold ">4.6</p>
              </div>
             <svg className="mt-2" width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M40 0C44.4183 0 48 3.58172 48 8V40C48 44.4183 44.4183 48 40 48H8C3.58172 48 0 44.4183 0 40V8C5.15405e-07 3.58172 3.58172 0 8 0H40Z" fill="#F3E8FF"/>
<path d="M40 0C44.4183 0 48 3.58172 48 8V40C48 44.4183 44.4183 48 40 48H8C3.58172 48 0 44.4183 0 40V8C5.15405e-07 3.58172 3.58172 0 8 0H40Z" stroke="#E5E7EB"/>
<path d="M35.25 38H12.75V10H35.25V38Z"/>
<g clip-path="url(#clip0_34_1159)">
<path d="M25.1289 14.2031C24.9219 13.7734 24.4844 13.5 24.0039 13.5C23.5234 13.5 23.0899 13.7734 22.8789 14.2031L20.3672 19.3711L14.7578 20.1992C14.2891 20.2695 13.8984 20.5977 13.7539 21.0469C13.6094 21.4961 13.7266 21.9922 14.0625 22.3242L18.1328 26.3516L17.1719 32.043C17.0938 32.5117 17.2891 32.9883 17.6758 33.2656C18.0625 33.543 18.5742 33.5781 18.9961 33.3555L24.0078 30.6797L29.0195 33.3555C29.4414 33.5781 29.9531 33.5469 30.3399 33.2656C30.7266 32.9844 30.9219 32.5117 30.8438 32.043L29.8789 26.3516L33.9492 22.3242C34.2852 21.9922 34.4063 21.4961 34.2578 21.0469C34.1094 20.5977 33.7227 20.2695 33.2539 20.1992L27.6406 19.3711L25.1289 14.2031Z" fill="#9333EA"/>
</g>
<defs>
<clipPath id="clip0_34_1159">
<path d="M12.75 13.5H35.25V33.5H12.75V13.5Z" fill="white"/>
</clipPath>
</defs>
</svg>

            </div>
          </div>

          <div className="flex items-center justify-between bg-white p-4 py-6">
            <input
              type="text"
              placeholder="Search stores, owners, or categories..."
              className="w-1/3 rounded-md border border-[#E5E7EB] px-3 py-2 text-sm"
            />
            <div className="flex gap-3">
              <select className="rounded-md border border-[#E5E7EB] px-3 py-2 text-sm">
                <option>All Status</option>
                <option>Active</option>
                <option>Pending</option>
              </select>
              <button className="rounded-md border border-[#E5E7EB] px-3 py-2 text-sm">More Filters</button>
              <button className="rounded-md border border-[#E5E7EB] px-3 py-2 text-sm">Export Data</button>
              <Link to={"/admin/store/add"} className="rounded-md bg-blue-600 px-3 py-2 text-sm text-white">
                Add New Store
              </Link>
            </div>
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
                      <p className="text-xs text-gray-500">— orders</p>
                      <p className="text-sm font-medium text-green-600">—</p>
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
                    <td className="px-4 py-3 flex gap-2">
                      <Eye className="h-4 w-4 cursor-pointer text-gray-600" />
                      <Edit className="h-4 w-4 cursor-pointer text-blue-600" />
                      <Check className="h-4 w-4 cursor-pointer text-green-600" />
                      <X className="h-4 w-4 cursor-pointer text-red-600" />
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
