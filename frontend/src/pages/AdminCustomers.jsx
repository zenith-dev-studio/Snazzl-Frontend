"use client"
import { Star, Eye, Edit, Trash2, Check, X, Store, ShieldCheck, Clock } from "lucide-react"
import { SideBar } from "../components/SideBar"
import { AdminNav } from "../components/AdminNav"

export default function AdminCustomers() {
  const stores = [
    {
      name: "Fresh Foods Market",
      id: "ST001 • Grocery",
      address: "123 Main St, New York, NY 10001",
      owner: { name: "John Smith", email: "john@freshfoods.com", phone: "+1 234-567-8900" },
      rating: 4.8,
      orders: 1247,
      revenue: "$45,280",
      kyc: "2,450 pts",
      status: "Active",
    },
    {
      name: "Quick Mart Express",
      id: "ST002 • Convenience",
      address: "456 Oak Ave, Los Angeles, CA 90210",
      owner: { name: "Sarah Johnson", email: "sarah@quickmart.com", phone: "+1 555-123-4567" },
      rating: 4.5,
      orders: 892,
      revenue: "$32,150",
      kyc: "Under Review",
      status: "Inactive",
    },
    {
      name: "Elite Electronics",
      id: "ST003 • Electronics",
      address: "789 Tech Blvd, San Francisco, CA 94105",
      owner: { name: "Mike Chen", email: "mike@eliteelectronics.com", phone: "+1 415-987-6543" },
      rating: 4.9,
      orders: 2156,
      revenue: "$78,920",
      kyc: "Approved",
      status: "Active",
    },
  ]

  return (
    <div className="flex min-h-screen bg-gray-50">
        <SideBar route={"customers"}/>
      <div className="flex-1">
        <AdminNav />
        <main className="p-6 space-y-6">
          <div className="-mt-5">
            <h1 className="text-xl font-semibold">Customer Management</h1>
            <p className="text-sm text-gray-500">
             Manage and track all customer accounts and activities
            </p>
          </div>
          <div className="grid grid-cols-4 gap-4">
            <div className="flex justify-between gap-3 rounded-lg bg-white p-4 shadow">
              <div>
                <p className="text-sm text-gray-500">Total Customers</p>
                <p className="text-2xl font-bold">8,549</p>
              </div>
             <svg width="49" height="52" viewBox="0 0 49 52" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M41 0C45.4183 0 49 3.58172 49 8V44C49 48.4183 45.4183 52 41 52H8C3.58172 52 0 48.4183 0 44V8C0 3.58172 3.58172 0 8 0H41Z" fill="#DBEAFE"/>
<path d="M41 0C45.4183 0 49 3.58172 49 8V44C49 48.4183 45.4183 52 41 52H8C3.58172 52 0 48.4183 0 44V8C0 3.58172 3.58172 0 8 0H41Z" stroke="#E5E7EB"/>
<path d="M37 38H12V14H37V38Z"/>
<g clip-path="url(#clip0_34_2732)">
<path d="M17.625 15.5C18.4538 15.5 19.2487 15.8292 19.8347 16.4153C20.4208 17.0013 20.75 17.7962 20.75 18.625C20.75 19.4538 20.4208 20.2487 19.8347 20.8347C19.2487 21.4208 18.4538 21.75 17.625 21.75C16.7962 21.75 16.0013 21.4208 15.4153 20.8347C14.8292 20.2487 14.5 19.4538 14.5 18.625C14.5 17.7962 14.8292 17.0013 15.4153 16.4153C16.0013 15.8292 16.7962 15.5 17.625 15.5ZM32 15.5C32.8288 15.5 33.6237 15.8292 34.2097 16.4153C34.7958 17.0013 35.125 17.7962 35.125 18.625C35.125 19.4538 34.7958 20.2487 34.2097 20.8347C33.6237 21.4208 32.8288 21.75 32 21.75C31.1712 21.75 30.3763 21.4208 29.7903 20.8347C29.2042 20.2487 28.875 19.4538 28.875 18.625C28.875 17.7962 29.2042 17.0013 29.7903 16.4153C30.3763 15.8292 31.1712 15.5 32 15.5ZM12 27.168C12 24.8672 13.8672 23 16.168 23H17.8359C18.457 23 19.0469 23.1367 19.5781 23.3789C19.5273 23.6602 19.5039 23.9531 19.5039 24.25C19.5039 25.7422 20.1602 27.082 21.1953 28C21.1875 28 21.1797 28 21.168 28H12.832C12.375 28 12 27.625 12 27.168ZM27.832 28C27.8242 28 27.8164 28 27.8047 28C28.8438 27.082 29.4961 25.7422 29.4961 24.25C29.4961 23.9531 29.4688 23.6641 29.4219 23.3789C29.9531 23.1328 30.543 23 31.1641 23H32.832C35.1328 23 37 24.8672 37 27.168C37 27.6289 36.625 28 36.168 28H27.832ZM20.75 24.25C20.75 23.2554 21.1451 22.3016 21.8483 21.5983C22.5516 20.8951 23.5054 20.5 24.5 20.5C25.4946 20.5 26.4484 20.8951 27.1517 21.5983C27.8549 22.3016 28.25 23.2554 28.25 24.25C28.25 25.2446 27.8549 26.1984 27.1517 26.9017C26.4484 27.6049 25.4946 28 24.5 28C23.5054 28 22.5516 27.6049 21.8483 26.9017C21.1451 26.1984 20.75 25.2446 20.75 24.25ZM17 34.457C17 31.582 19.332 29.25 22.207 29.25H26.793C29.668 29.25 32 31.582 32 34.457C32 35.0312 31.5352 35.5 30.957 35.5H18.043C17.4688 35.5 17 35.0352 17 34.457Z" fill="#2563EB"/>
</g>
<defs>
<clipPath id="clip0_34_2732">
<path d="M12 15.5H37V35.5H12V15.5Z" fill="white"/>
</clipPath>
</defs>
</svg>


            </div>
            <div className="flex justify-between gap-3 rounded-lg bg-white p-4 py-6 shadow">
              <div>
                <p className="text-sm text-gray-500">Active Customers</p>
                <p className="text-2xl font-bold">7,234</p>
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
                <p className="text-sm text-gray-500">New This Month</p>
                <p className="text-2xl font-bold">234</p>
              </div>
              <svg width="42" height="52" viewBox="0 0 42 52" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M34 0C38.4183 0 42 3.58172 42 8V44C42 48.4183 38.4183 52 34 52H8.5C4.08172 52 0.5 48.4183 0.5 44V8C0.5 3.58172 4.08172 0 8.5 0H34Z" fill="#F3E8FF"/>
<path d="M34 0C38.4183 0 42 3.58172 42 8V44C42 48.4183 38.4183 52 34 52H8.5C4.08172 52 0.5 48.4183 0.5 44V8C0.5 3.58172 4.08172 0 8.5 0H34Z" stroke="#E5E7EB"/>
<path d="M30 38H12.5V14H30V38Z"/>
<g clip-path="url(#clip0_34_2736)">
<path d="M16.25 16.75V18H14.375C13.3398 18 12.5 18.8398 12.5 19.875V21.75H30V19.875C30 18.8398 29.1602 18 28.125 18H26.25V16.75C26.25 16.0586 25.6914 15.5 25 15.5C24.3086 15.5 23.75 16.0586 23.75 16.75V18H18.75V16.75C18.75 16.0586 18.1914 15.5 17.5 15.5C16.8086 15.5 16.25 16.0586 16.25 16.75ZM30 23H12.5V33.625C12.5 34.6602 13.3398 35.5 14.375 35.5H28.125C29.1602 35.5 30 34.6602 30 33.625V23Z" fill="#9333EA"/>
</g>
<defs>
<clipPath id="clip0_34_2736">
<path d="M12.5 15.5H30V35.5H12.5V15.5Z" fill="white"/>
</clipPath>
</defs>
</svg>

            </div>
            <div className="flex justify-between gap-3 rounded-lg bg-white p-4 shadow">
              <div>
                <p className="text-sm text-gray-500">Avg Order Value</p>
                <p className="text-2xl font-bold ">$32.45</p>
              </div>
              <svg width="44" height="52" viewBox="0 0 44 52" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M36 0C40.4183 0 44 3.58172 44 8V44C44 48.4183 40.4183 52 36 52H8C3.58172 52 0 48.4183 0 44V8C0 3.58172 3.58172 0 8 0H36Z" fill="#FFEDD5"/>
<path d="M36 0C40.4183 0 44 3.58172 44 8V44C44 48.4183 40.4183 52 36 52H8C3.58172 52 0 48.4183 0 44V8C0 3.58172 3.58172 0 8 0H36Z" stroke="#E5E7EB"/>
<path d="M32 38H12V14H32V38Z"/>
<path d="M32 35.5H12V15.5H32V35.5Z" stroke="#E5E7EB"/>
<path d="M14.5 16.75C13.1211 16.75 12 17.8711 12 19.25V31.75C12 33.1289 13.1211 34.25 14.5 34.25H29.5C30.8789 34.25 32 33.1289 32 31.75V23C32 21.6211 30.8789 20.5 29.5 20.5H15.125C14.7812 20.5 14.5 20.2188 14.5 19.875C14.5 19.5312 14.7812 19.25 15.125 19.25H29.5C30.1914 19.25 30.75 18.6914 30.75 18C30.75 17.3086 30.1914 16.75 29.5 16.75H14.5ZM28.25 26.125C28.5815 26.125 28.8995 26.2567 29.1339 26.4911C29.3683 26.7255 29.5 27.0435 29.5 27.375C29.5 27.7065 29.3683 28.0245 29.1339 28.2589C28.8995 28.4933 28.5815 28.625 28.25 28.625C27.9185 28.625 27.6005 28.4933 27.3661 28.2589C27.1317 28.0245 27 27.7065 27 27.375C27 27.0435 27.1317 26.7255 27.3661 26.4911C27.6005 26.2567 27.9185 26.125 28.25 26.125Z" fill="#EA580C"/>
</svg>

            </div>
          </div>
          <div className="flex items-center justify-between bg-white p-4 py-6">
            <input
              type="text"
              placeholder="Search customers by name, email, or phone..."
              className="w-1/3 rounded-md border border-[#E5E7EB] px-3 py-2 text-sm"
            />
            <div className="flex gap-3">
                 <button className="rounded-md bg-blue-600 px-3 py-2 text-sm text-white">
                Export Customers
              </button>
              <select className="rounded-md border border-[#E5E7EB] px-3 py-2 text-sm">
                <option>All Status</option>
                <option>Active</option>
                <option>Pending</option>
              </select>
              <button className="rounded-md border border-[#E5E7EB] px-3 py-2 text-sm">More Filters</button>
              {/* <button className="rounded-md border border-[#E5E7EB] px-3 py-2 text-sm">Export Data</button> */}
            </div>
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
                {stores.map((store, i) => (
                  <tr key={i} className="border-t border-[#E5E7EB] hover:bg-gray-50">
                    <td className="px-4 py-3 flex gap-3">
                        <img
                src={`https://i.pravatar.cc/40?img=${i + 1}`}
                className="w-10 h-10 rounded-full"
              />
              <div>
              <p className="font-medium">{store.name}</p>
                      <p className="text-xs text-gray-500">{store.id}</p>
                      <p className="text-xs text-gray-400">{store.address}</p>
                      </div>
                    </td>
                    
                    <td className="px-4 py-3">
                      <p className="font-medium">{store.owner.name}</p>
                      <p className="text-xs text-gray-500">{store.owner.email}</p>
                      <p className="text-xs text-gray-400">{store.owner.phone}</p>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center text-yellow-600">
                        <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9.68437 0.5625C9.51875 0.21875 9.16875 0 8.78438 0C8.4 0 8.05312 0.21875 7.88437 0.5625L5.875 4.69688L1.3875 5.35938C1.0125 5.41563 0.7 5.67812 0.584375 6.0375C0.46875 6.39687 0.5625 6.79375 0.83125 7.05937L4.0875 10.2812L3.31875 14.8344C3.25625 15.2094 3.4125 15.5906 3.72187 15.8125C4.03125 16.0344 4.44062 16.0625 4.77812 15.8844L8.7875 13.7437L12.7969 15.8844C13.1344 16.0625 13.5437 16.0375 13.8531 15.8125C14.1625 15.5875 14.3188 15.2094 14.2563 14.8344L13.4844 10.2812L16.7406 7.05937C17.0094 6.79375 17.1062 6.39687 16.9875 6.0375C16.8687 5.67812 16.5594 5.41563 16.1844 5.35938L11.6938 4.69688L9.68437 0.5625Z" fill="#FACC15"/>
</svg>

                        {store.rating}
                      </div>
                      <p className="text-xs text-gray-500">{store.orders} orders</p>
                      <p className="text-sm font-medium text-green-600">{store.revenue}</p>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className="px-2 py-1 text-xs font-medium flex flex-col"
                      >
                        {store.kyc}
                        <p className="bg-gray-50">Credit Card</p>
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded px-2 py-1 text-xs font-medium ${
                          store.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {store.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 flex gap-2">
                      <svg width="19" height="16" viewBox="0 0 19 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_34_2946)">
<g clip-path="url(#clip1_34_2946)">
<path d="M9.45314 1C6.92814 1 4.90626 2.15 3.43439 3.51875C1.97189 4.875 0.993762 6.5 0.531262 7.61562C0.428137 7.8625 0.428137 8.1375 0.531262 8.38437C0.993762 9.5 1.97189 11.125 3.43439 12.4812C4.90626 13.85 6.92814 15 9.45314 15C11.9781 15 14 13.85 15.4719 12.4812C16.9344 11.1219 17.9125 9.5 18.3781 8.38437C18.4813 8.1375 18.4813 7.8625 18.3781 7.61562C17.9125 6.5 16.9344 4.875 15.4719 3.51875C14 2.15 11.9781 1 9.45314 1ZM4.95314 8C4.95314 6.80653 5.42724 5.66193 6.27116 4.81802C7.11507 3.97411 8.25966 3.5 9.45314 3.5C10.6466 3.5 11.7912 3.97411 12.6351 4.81802C13.479 5.66193 13.9531 6.80653 13.9531 8C13.9531 9.19347 13.479 10.3381 12.6351 11.182C11.7912 12.0259 10.6466 12.5 9.45314 12.5C8.25966 12.5 7.11507 12.0259 6.27116 11.182C5.42724 10.3381 4.95314 9.19347 4.95314 8ZM9.45314 6C9.45314 7.10313 8.55626 8 7.45314 8C7.23126 8 7.01876 7.9625 6.81876 7.89687C6.64689 7.84062 6.44689 7.94688 6.45314 8.12813C6.46251 8.34375 6.49376 8.55937 6.55314 8.775C6.98126 10.375 8.62814 11.325 10.2281 10.8969C11.8281 10.4688 12.7781 8.82188 12.35 7.22188C12.0031 5.925 10.8563 5.05312 9.58126 5C9.40001 4.99375 9.29376 5.19062 9.35001 5.36562C9.41564 5.56562 9.45314 5.77812 9.45314 6Z" fill="#2563EB"/>
</g>
</g>
<defs>
<clipPath id="clip0_34_2946">
<rect width="18" height="16" fill="white" transform="translate(0.453125)"/>
</clipPath>
<clipPath id="clip1_34_2946">
<path d="M0.453125 0H18.4531V16H0.453125V0Z" fill="white"/>
</clipPath>
</defs>
</svg>

                      <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_34_2950)">
<path d="M1.95312 2C1.125 2 0.453125 2.67188 0.453125 3.5C0.453125 3.97187 0.675 4.41562 1.05313 4.7L7.85313 9.8C8.20937 10.0656 8.69688 10.0656 9.05313 9.8L15.8531 4.7C16.2312 4.41562 16.4531 3.97187 16.4531 3.5C16.4531 2.67188 15.7812 2 14.9531 2H1.95312ZM0.453125 5.5V12C0.453125 13.1031 1.35 14 2.45312 14H14.4531C15.5562 14 16.4531 13.1031 16.4531 12V5.5L9.65312 10.6C8.94063 11.1344 7.96563 11.1344 7.25313 10.6L0.453125 5.5Z" fill="#4B5563"/>
</g>
<defs>
<clipPath id="clip0_34_2950">
<path d="M0.453125 0H16.4531V16H0.453125V0Z" fill="white"/>
</clipPath>
</defs>
</svg>

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
