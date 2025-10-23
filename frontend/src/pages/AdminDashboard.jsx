"use client";

import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, Area } from "recharts";

import { SideBar } from "../components/SideBar";
import { AdminNav } from "../components/AdminNav";
import axios from "axios";



export default function AdminDashboard() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
      const [customers, setCustomers] = useState([])
        const [stores, setStores] = useState([])
        const [agents, setAgents] = useState([])
         const [statusFilter, setStatusFilter] = useState("All")
  const [zoneFilter, setZoneFilter] = useState("")
        
  const [stat, setStats] = useState({ totalStores: 0, totalActiveStores: 0, totalPendingKyc: 0 })
  const baseUrl = import.meta.env.VITE_BASE_URL;

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${baseUrl}/api/orders/get/all`);
      setOrders(res.data || []);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

 const fetchAgents = async () => {
    setLoading(true)
    try {
      let url = `${baseUrl}/api/agents/get/all`

      if (statusFilter !== "All") {
        url = `${baseUrl}/get/by-status?status=${statusFilter}`
      } else if (zoneFilter) {
        url = `${baseUrl}/get/by-zone?zone=${zoneFilter}`
      }

      const res = await fetch(url)
      const data = await res.json()
      if (data.success) setAgents(data.agents)
    } catch (err) {
      console.error("Error fetching agents:", err)
    } finally {
      setLoading(false)
    }
  }
    useEffect(() => {
    fetchAgents()
  }, [baseUrl])

    const fetchData = async () => {
    try {
      const storesRes = await axios.get(`${baseUrl}/api/stores/get/all`)
      setStores(storesRes.data.stores)

      const statsRes = await axios.get(`${baseUrl}/api/stores/stats`)
      setStats(statsRes.data.stats)
    } catch (error) {
      console.error("Error fetching store data:", error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [baseUrl])

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

useEffect(()=>{
  fetchOrders();
},[])

const stats = [
  { title: "Total Orders", value: loading ? "..." : orders.length, sub: "68 today",icon: <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M20 16H0V0H20V16Z" stroke="#E5E7EB"/>
<path d="M1.84063 1.31568C1.93438 1.12506 2.14063 1.01568 2.35 1.04381L10 2.00006L17.65 1.04381C17.8594 1.01881 18.0656 1.12818 18.1594 1.31568L19.4625 3.92193C19.7438 4.48131 19.4438 5.15943 18.8438 5.33131L13.7375 6.79068C13.3031 6.91568 12.8375 6.73131 12.6063 6.34381L10 2.00006L7.39375 6.34381C7.1625 6.73131 6.69688 6.91568 6.2625 6.79068L1.15938 5.33131C0.556252 5.15943 0.259377 4.48131 0.540627 3.92193L1.84063 1.31568ZM10.0344 4.00006L11.75 6.85631C12.2156 7.63131 13.1438 8.00006 14.0156 7.75006L18 6.61256V11.8313C18 12.5188 17.5313 13.1188 16.8625 13.2876L10.4844 14.8813C10.1656 14.9626 9.83125 14.9626 9.51563 14.8813L3.1375 13.2876C2.46875 13.1157 2 12.5157 2 11.8282V6.60943L5.9875 7.75006C6.85625 8.00006 7.7875 7.63131 8.25313 6.85631L9.96563 4.00006H10.0344Z" fill="#2563EB"/>
</svg>

},
  { title: "Active Customers",  value: loading ? "..." : customers.length, sub: "156 new today", change: "+8%",icon:<svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_5_241)">
<g clip-path="url(#clip1_5_241)">
<path d="M4.5 0C5.16304 0 5.79893 0.263392 6.26777 0.732233C6.73661 1.20107 7 1.83696 7 2.5C7 3.16304 6.73661 3.79893 6.26777 4.26777C5.79893 4.73661 5.16304 5 4.5 5C3.83696 5 3.20107 4.73661 2.73223 4.26777C2.26339 3.79893 2 3.16304 2 2.5C2 1.83696 2.26339 1.20107 2.73223 0.732233C3.20107 0.263392 3.83696 0 4.5 0ZM16 0C16.663 0 17.2989 0.263392 17.7678 0.732233C18.2366 1.20107 18.5 1.83696 18.5 2.5C18.5 3.16304 18.2366 3.79893 17.7678 4.26777C17.2989 4.73661 16.663 5 16 5C15.337 5 14.7011 4.73661 14.2322 4.26777C13.7634 3.79893 13.5 3.16304 13.5 2.5C13.5 1.83696 13.7634 1.20107 14.2322 0.732233C14.7011 0.263392 15.337 0 16 0ZM0 9.33438C0 7.49375 1.49375 6 3.33437 6H4.66875C5.16562 6 5.6375 6.10938 6.0625 6.30312C6.02187 6.52812 6.00313 6.7625 6.00313 7C6.00313 8.19375 6.52812 9.26562 7.35625 10C7.35 10 7.34375 10 7.33437 10H0.665625C0.3 10 0 9.7 0 9.33438ZM12.6656 10C12.6594 10 12.6531 10 12.6438 10C13.475 9.26562 13.9969 8.19375 13.9969 7C13.9969 6.7625 13.975 6.53125 13.9375 6.30312C14.3625 6.10625 14.8344 6 15.3313 6H16.6656C18.5063 6 20 7.49375 20 9.33438C20 9.70312 19.7 10 19.3344 10H12.6656ZM7 7C7 6.20435 7.31607 5.44129 7.87868 4.87868C8.44129 4.31607 9.20435 4 10 4C10.7956 4 11.5587 4.31607 12.1213 4.87868C12.6839 5.44129 13 6.20435 13 7C13 7.79565 12.6839 8.55871 12.1213 9.12132C11.5587 9.68393 10.7956 10 10 10C9.20435 10 8.44129 9.68393 7.87868 9.12132C7.31607 8.55871 7 7.79565 7 7ZM4 15.1656C4 12.8656 5.86562 11 8.16562 11H11.8344C14.1344 11 16 12.8656 16 15.1656C16 15.625 15.6281 16 15.1656 16H4.83437C4.375 16 4 15.6281 4 15.1656Z" fill="#059669"/>
</g>
</g>
<defs>
<clipPath id="clip0_5_241">
<rect width="20" height="16" fill="white"/>
</clipPath>
<clipPath id="clip1_5_241">
<path d="M0 0H20V16H0V0Z" fill="white"/>
</clipPath>
</defs>
</svg>
 },
  { title: "Store Partners",  value: loading ? "..." : stat.totalActiveStores, sub: "12 pending approval",icon: <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_5_246)">
<g clip-path="url(#clip1_5_246)">
<path d="M17.1125 3.24375L15.3219 0.409375C15.1625 0.15625 14.8781 0 14.575 0H3.42499C3.12187 0 2.83749 0.15625 2.67812 0.409375L0.884367 3.24375C-0.0406331 4.70625 0.778117 6.74062 2.50624 6.975C2.63124 6.99062 2.75937 7 2.88437 7C3.69999 7 4.42499 6.64375 4.92187 6.09375C5.41874 6.64375 6.14374 7 6.95937 7C7.77499 7 8.49999 6.64375 8.99687 6.09375C9.49374 6.64375 10.2187 7 11.0344 7C11.8531 7 12.575 6.64375 13.0719 6.09375C13.5719 6.64375 14.2937 7 15.1094 7C15.2375 7 15.3625 6.99062 15.4875 6.975C17.2219 6.74375 18.0437 4.70938 17.1156 3.24375H17.1125ZM15.6156 7.96562H15.6125C15.4469 7.9875 15.2781 8 15.1062 8C14.7187 8 14.3469 7.94062 14 7.83437V12H3.99999V7.83125C3.64999 7.94063 3.27499 8 2.88749 8C2.71562 8 2.54374 7.9875 2.37812 7.96562H2.37499C2.24687 7.94687 2.12187 7.925 1.99999 7.89375V12V14C1.99999 15.1031 2.89687 16 3.99999 16H14C15.1031 16 16 15.1031 16 14V12V7.89375C15.875 7.925 15.75 7.95 15.6156 7.96562Z" fill="#4F46E5"/>
</g>
</g>
<defs>
<clipPath id="clip0_5_246">
<rect width="18" height="16" fill="white"/>
</clipPath>
<clipPath id="clip1_5_246">
<path d="M0 0H18V16H0V0Z" fill="white"/>
</clipPath>
</defs>
</svg>

},
  { title: "Delivery Agents", value: loading ? "..." : agents.length, sub: "85 active now", change: "-3%",icon:<svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_5_251)">
<path d="M20 16H0V0H20V16Z" stroke="#E5E7EB"/>
<path d="M8.75 0.999951C8.33438 0.999951 8 1.33433 8 1.74995C8 2.16558 8.33438 2.49995 8.75 2.49995H10.5531L11.0656 3.44683L8 5.99995L6.58437 4.58433C6.20937 4.20933 5.7 3.99995 5.16875 3.99995H2C1.44687 3.99995 1 4.44683 1 4.99995V5.99995H4C6.7625 5.99995 9 8.23745 9 11C9 11.3437 8.96562 11.6781 8.9 12H11.1C11.0344 11.6781 11 11.3437 11 11C11 9.3687 11.7812 7.9187 12.9906 7.0062L13.4719 7.89995C12.575 8.63433 12 9.74995 12 11C12 13.2093 13.7906 15 16 15C18.2094 15 20 13.2093 20 11C20 8.79058 18.2094 6.99995 16 6.99995C15.5781 6.99995 15.1719 7.06558 14.7906 7.18745L13.0688 3.99995H15C15.5531 3.99995 16 3.55308 16 2.99995V1.99995C16 1.44683 15.5531 0.999951 15 0.999951H14.3625C14.1281 0.999951 13.9031 1.0812 13.7219 1.2312L12.2406 2.46558L11.8031 1.65308C11.5844 1.24995 11.1625 0.996826 10.7031 0.996826H8.75V0.999951ZM14.4594 9.72495L15.3406 11.3562C15.5375 11.7218 15.9938 11.8562 16.3563 11.6593C16.7188 11.4625 16.8562 11.0062 16.6594 10.6437L15.7781 9.01245C15.85 9.00308 15.925 8.99995 16 8.99995C17.1031 8.99995 18 9.89683 18 11C18 12.1031 17.1031 13 16 13C14.8969 13 14 12.1031 14 11C14 10.5156 14.1719 10.0718 14.4594 9.72495ZM5.85313 11.75C5.55625 12.4843 4.8375 13 4 13C2.89687 13 2 12.1031 2 11C2 9.89683 2.89687 8.99995 4 8.99995C4.84062 8.99995 5.55938 9.51558 5.85313 10.25H7.92812C7.57812 8.39995 5.95312 6.99995 4 6.99995C1.79063 6.99995 0 8.79058 0 11C0 13.2093 1.79063 15 4 15C5.95312 15 7.57812 13.6 7.93125 11.75H5.85313ZM4 12C4.26522 12 4.51957 11.8946 4.70711 11.7071C4.89464 11.5195 5 11.2652 5 11C5 10.7347 4.89464 10.4804 4.70711 10.2928C4.51957 10.1053 4.26522 9.99995 4 9.99995C3.73478 9.99995 3.48043 10.1053 3.29289 10.2928C3.10536 10.4804 3 10.7347 3 11C3 11.2652 3.10536 11.5195 3.29289 11.7071C3.48043 11.8946 3.73478 12 4 12Z" fill="#D97706"/>
</g>
<defs>
<clipPath id="clip0_5_251">
<rect width="20" height="16" fill="white"/>
</clipPath>
</defs>
</svg>
 },
];

const revenueData = [
  { time: "10AM", value: 200 },
  { time: "11AM", value: 300 },
  { time: "12PM", value: 400 },
  { time: "1PM", value: 600 },
  { time: "2PM", value: 800 },
  { time: "3PM", value: 1000 },
  { time: "4PM", value: 1500 },
  { time: "5PM", value: 1200 },
  { time: "6PM", value: 900 },
];

const orderStatusData = [
  { name: "Cancelled", value: 6 },
  { name: "Pending", value: 12 },
  { name: "Preparing", value: 16 },
  { name: "In Transit", value: 24 },
  { name: "Delivered", value: 42 },
];
const COLORS = ["#FF6B6B", "#FFD93D", "#6BCB77", "#4D96FF", "#845EC2"];
  return (
    <div className="flex min-h-screen bg-gray-50">
      <SideBar route={"dashboard"}/>
      <div className="flex-1 mt-">
        <AdminNav/>
        <div className="grid grid-cols-4 gap-4 mb-6 p-4">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white p-4 rounded-xl shadow">
              <h4 className="text-gray-500">{stat.title}</h4>
              <p className="text-2xl font-bold mt-4 ">{stat.value}</p>
              <p className="text-sm text-gray-400 ">{stat.sub}</p>
              <p className="ml-55"> {stat.icon}</p>
              {stat.change && <span className="text-green-500 text-sm">{stat.change}</span>}
            </div>
           
          ))}
        </div>
        <div className="grid grid-cols-3 gap-6 mb-6 p-4">
  <div className="col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
  <div className="flex justify-between items-center mb-4">
    <h4 className="font-semibold text-gray-700">Revenue Summary</h4>
    <div className="flex space-x-2 text-sm">
      {["Today", "Weekly", "Monthly"].map((tab, i) => (
        <button
          key={i}
          className={`px-3 py-1 rounded-md ${
            i === 0
              ? "bg-blue-100 text-[#1D4ED8]"
              : "text-gray-500 hover:text-[#1D4ED8]"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  </div>

  <ResponsiveContainer width="100%" height={200}>
    <LineChart data={revenueData}>
      <XAxis dataKey="time" />
      <YAxis domain={["auto", "auto"]} />
      <Tooltip />

      <defs>
        <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4D96FF" stopOpacity={0.4} />
          <stop offset="80%" stopColor="#4D96FF" stopOpacity={0.05} />
          <stop offset="100%" stopColor="#4D96FF" stopOpacity={0} />
        </linearGradient>
      </defs>

      <Area
        type="monotone"
        dataKey="value"
        stroke="none"
        fill="url(#blueGradient)"
        activeDot={false}
        isAnimationActive={false}
      />
      <Line
        type="monotone"
        dataKey="value"
        stroke="#4D96FF"
        strokeWidth={2}
        dot={false}
      />
    </LineChart>
  </ResponsiveContainer>
</div>

  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
    <div className="flex justify-between items-center mb-4">
      <h4 className="font-semibold text-gray-700">Order Status</h4>
      <button className="text-gray-400 hover:text-gray-600">⋮</button>
    </div>
    <ResponsiveContainer width="100%" height={240}>
      <PieChart>
        <Pie
          data={orderStatusData}
          dataKey="value"
          nameKey="name"
          innerRadius={50}
          outerRadius={80}
          paddingAngle={3}
        >
          {orderStatusData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  </div>
</div>
<div className="grid grid-cols-2 gap-6 mb-6 p-4">
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
    <h4 className="mb-4 font-semibold text-gray-700">Active Agent Overview</h4>
    <table className="w-full text-sm">
      <thead className="text-left text-gray-500">
        <tr>
          <th className="pb-3 bg-gray-50 p-2">Agent Details</th>
          <th className="pb-3 bg-gray-50 p-2">Contact & Zone</th>
          <th className="pb-3 bg-gray-50 p-2 text-right">Actions</th>
        </tr>
      </thead>
      <tbody className="divide-y">
        {agents.map((agent, i) => (
          <tr key={i} className="hover:bg-gray-50">
            <td className="py-3 flex items-center gap-3">
              <img
                src={`https://i.pravatar.cc/40?img=${i + 1}`}
                alt={agent.name}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="font-medium">{agent.name}</p>
                <p className="text-sm text-gray-400">{agent.id}</p>
                <p className="flex mt-1 text-xs"><svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_64_193)">
<path d="M8.17008 1.16401C8.03344 0.88042 7.74469 0.699951 7.42758 0.699951C7.11047 0.699951 6.8243 0.88042 6.68508 1.16401L5.02734 4.57487L1.32516 5.12144C1.01578 5.16784 0.75797 5.3844 0.662579 5.68089C0.567188 5.97737 0.644532 6.30479 0.866251 6.52394L3.55266 9.18198L2.91844 12.9383C2.86688 13.2477 2.99578 13.5622 3.25102 13.7453C3.50625 13.9283 3.84398 13.9515 4.12242 13.8046L7.43016 12.0385L10.7379 13.8046C11.0163 13.9515 11.3541 13.9309 11.6093 13.7453C11.8645 13.5596 11.9934 13.2477 11.9419 12.9383L11.3051 9.18198L13.9915 6.52394C14.2132 6.30479 14.2931 5.97737 14.1952 5.68089C14.0972 5.3844 13.842 5.16784 13.5326 5.12144L9.82781 4.57487L8.17008 1.16401Z" fill="#FACC15"/>
</g>
<defs>
<clipPath id="clip0_64_193">
<path d="M1.52588e-05 0.699951H14.85V13.9H1.52588e-05V0.699951Z" fill="white"/>
</clipPath>
</defs>
</svg>
 {agent.rating}</p>
              </div>
            </td>
            <td className="py-3">
              <p className="text-gray-600">{agent.email}</p>
              <p className="text-gray-500">{agent.phone}</p>
              <p className="text-[#2563EB] text-sm">{agent.zone}</p>
            </td>
            <td className="py-3 flex justify-end gap-3 text-gray-400">
              <button><svg width="21" height="18" viewBox="0 0 21 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_64_223)">
<g clip-path="url(#clip1_64_223)">
<path d="M10.3 1.19995C7.52252 1.19995 5.29846 2.46495 3.67939 3.97058C2.07064 5.46245 0.994707 7.24995 0.485957 8.47714C0.37252 8.7487 0.37252 9.0512 0.485957 9.32276C0.994707 10.55 2.07064 12.3375 3.67939 13.8293C5.29846 15.335 7.52252 16.6 10.3 16.6C13.0775 16.6 15.3016 15.335 16.9206 13.8293C18.5294 12.334 19.6053 10.55 20.1175 9.32276C20.231 9.0512 20.231 8.7487 20.1175 8.47714C19.6053 7.24995 18.5294 5.46245 16.9206 3.97058C15.3016 2.46495 13.0775 1.19995 10.3 1.19995ZM5.35002 8.89995C5.35002 7.58713 5.87154 6.32808 6.79984 5.39977C7.72815 4.47147 8.9872 3.94995 10.3 3.94995C11.6128 3.94995 12.8719 4.47147 13.8002 5.39977C14.7285 6.32808 15.25 7.58713 15.25 8.89995C15.25 10.2128 14.7285 11.4718 13.8002 12.4001C12.8719 13.3284 11.6128 13.85 10.3 13.85C8.9872 13.85 7.72815 13.3284 6.79984 12.4001C5.87154 11.4718 5.35002 10.2128 5.35002 8.89995ZM10.3 6.69995C10.3 7.91339 9.31346 8.89995 8.10002 8.89995C7.85596 8.89995 7.62221 8.8587 7.40221 8.78651C7.21314 8.72464 6.99314 8.84151 7.00002 9.04089C7.01033 9.27808 7.04471 9.51526 7.11002 9.75245C7.58096 11.5125 9.39252 12.5575 11.1525 12.0865C12.9125 11.6156 13.9575 9.80401 13.4866 8.04401C13.105 6.61745 11.8435 5.65839 10.441 5.59995C10.2416 5.59308 10.1247 5.80964 10.1866 6.00214C10.2588 6.22214 10.3 6.45589 10.3 6.69995Z" fill="#9CA3AF"/>
</g>
</g>
<defs>
<clipPath id="clip0_64_223">
<rect width="19.8" height="17.6" fill="white" transform="translate(0.400024 0.0998535)"/>
</clipPath>
<clipPath id="clip1_64_223">
<path d="M0.400024 0.0998535H20.2V17.6999H0.400024V0.0998535Z" fill="white"/>
</clipPath>
</defs>
</svg>
</button>
              <button><svg width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_64_227)">
<g clip-path="url(#clip1_64_227)">
<path d="M7.41469 17.2599C9.17813 15.053 13.2 9.70423 13.2 6.69985C13.2 3.0561 10.2438 0.0998535 6.6 0.0998535C2.95625 0.0998535 0 3.0561 0 6.69985C0 9.70423 4.02188 15.053 5.78531 17.2599C6.20813 17.7858 6.99188 17.7858 7.41469 17.2599ZM6.6 4.49985C7.18348 4.49985 7.74306 4.73164 8.15563 5.14422C8.56822 5.5568 8.8 6.11638 8.8 6.69985C8.8 7.28333 8.56822 7.84291 8.15563 8.25549C7.74306 8.66807 7.18348 8.89985 6.6 8.89985C6.01652 8.89985 5.45694 8.66807 5.04436 8.25549C4.63178 7.84291 4.4 7.28333 4.4 6.69985C4.4 6.11638 4.63178 5.5568 5.04436 5.14422C5.45694 4.73164 6.01652 4.49985 6.6 4.49985Z" fill="#9CA3AF"/>
</g>
</g>
<defs>
<clipPath id="clip0_64_227">
<rect width="13.2" height="17.6" fill="white" transform="translate(0 0.0998535)"/>
</clipPath>
<clipPath id="clip1_64_227">
<path d="M0 0.0998535H13.2V17.6999H0V0.0998535Z" fill="white"/>
</clipPath>
</defs>
</svg>

</button>
              <button><svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_64_232)">
<path d="M5.66844 0.945521C5.40375 0.306146 4.70594 -0.0341663 4.03906 0.148021L1.01406 0.973021C0.415938 1.13802 0 1.68115 0 2.2999C0 10.8043 6.89563 17.6999 15.4 17.6999C16.0188 17.6999 16.5619 17.284 16.7269 16.6858L17.5519 13.6608C17.7341 12.994 17.3937 12.2961 16.7544 12.0315L13.4544 10.6565C12.8941 10.4227 12.2444 10.5843 11.8628 11.0552L10.4741 12.7499C8.05406 11.6052 6.09469 9.64583 4.95 7.22583L6.64469 5.84052C7.11563 5.45552 7.27719 4.80927 7.04344 4.24896L5.66844 0.948959V0.945521Z" fill="#9CA3AF"/>
</g>
<defs>
<clipPath id="clip0_64_232">
<path d="M0 0.0998535H17.6V17.6999H0V0.0998535Z" fill="white"/>
</clipPath>
</defs>
</svg>

</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
    <div className="flex justify-between items-center mb-4">
      <h4 className="font-semibold text-gray-700">Recent Activity</h4>
      <button className="text-[#2563EB] text-sm font-medium">View All</button>
    </div>
    <ul className="space-y-5 text-sm">
      <li className="flex items-start gap-3">
        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-100 text-blue-600"><svg width="29" height="32" viewBox="0 0 29 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14.2812 0C21.9873 0 28.2344 6.24703 28.2344 13.9531V18.0469C28.2344 25.753 21.9873 32 14.2812 32C6.57515 32 0.328125 25.753 0.328125 18.0469V13.9531C0.328125 6.24703 6.57515 0 14.2812 0Z" fill="#DBEAFE"/>
<path d="M14.2812 0C21.9873 0 28.2344 6.24703 28.2344 13.9531V18.0469C28.2344 25.753 21.9873 32 14.2812 32C6.57515 32 0.328125 25.753 0.328125 18.0469V13.9531C0.328125 6.24703 6.57515 0 14.2812 0Z" stroke="#E5E7EB"/>
<path d="M23.0312 26H5.53125V6H23.0312V26Z" stroke="#E5E7EB"/>
<g clip-path="url(#clip0_5_371)">
<path d="M7.14178 9.90114C7.22381 9.73435 7.40428 9.63864 7.58749 9.66325L14.2812 10.5L20.975 9.66325C21.1582 9.64138 21.3387 9.73708 21.4207 9.90114L22.5609 12.1816C22.807 12.6711 22.5445 13.2644 22.0195 13.4148L17.5515 14.6918C17.1715 14.8011 16.764 14.6398 16.5617 14.3008L14.2812 10.5L12.0008 14.3008C11.7984 14.6398 11.391 14.8011 11.0109 14.6918L6.54569 13.4148C6.01796 13.2644 5.75819 12.6711 6.00428 12.1816L7.14178 9.90114ZM14.3113 12.25L15.8125 14.7492C16.2199 15.4273 17.032 15.75 17.7949 15.5312L21.2812 14.5359V19.1023C21.2812 19.7039 20.8711 20.2289 20.2859 20.3765L14.7051 21.7711C14.4262 21.8422 14.1336 21.8422 13.8574 21.7711L8.27655 20.3765C7.69139 20.2261 7.28124 19.7011 7.28124 19.0996V14.5332L10.7703 15.5312C11.5305 15.75 12.3453 15.4273 12.7527 14.7492L14.2512 12.25H14.3113Z" fill="#2563EB"/>
</g>
<defs>
<clipPath id="clip0_5_371">
<path d="M5.53125 8.75H23.0312V22.75H5.53125V8.75Z" fill="white"/>
</clipPath>
</defs>
</svg>
</div>
        <div>
          <p className="font-medium text-gray-700">New order #5832</p>
          <p className="text-gray-500">Jane Cooper ordered 2 items from Healthy Foods Store</p>
          <p className="text-xs text-gray-400">5 minutes ago</p>
        </div>
      </li>
      <li className="flex items-start gap-3">
        <div className="w-8 h-8 flex items-center justify-center rounded-full text-green-600"><svg width="29" height="32" viewBox="0 0 29 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14.6406 0C22.5452 0 28.9531 6.40793 28.9531 14.3125V17.6875C28.9531 25.5921 22.5452 32 14.6406 32C6.73605 32 0.328125 25.5921 0.328125 17.6875V14.3125C0.328125 6.40793 6.73605 0 14.6406 0Z" stroke="#E5E7EB"/>
<g clip-path="url(#clip0_5_373)">
<g clip-path="url(#clip1_5_373)">
<path d="M20.5086 11.6321C20.8504 11.9739 20.8504 12.529 20.5086 12.8708L13.5086 19.8708C13.1668 20.2125 12.6117 20.2125 12.2699 19.8708L8.76993 16.3708C8.42813 16.029 8.42813 15.4739 8.76993 15.1321C9.11172 14.7903 9.6668 14.7903 10.0086 15.1321L12.8906 18.0114L19.2727 11.6321C19.6145 11.2903 20.1695 11.2903 20.5113 11.6321H20.5086Z" fill="#059669"/>
</g>
</g>
<defs>
<clipPath id="clip0_5_373">
<rect width="12.25" height="14" fill="white" transform="translate(8.51562 8.75)"/>
</clipPath>
<clipPath id="clip1_5_373">
<path d="M8.51562 8.75H20.7656V22.75H8.51562V8.75Z" fill="white"/>
</clipPath>
</defs>
</svg>
</div>
        <div>
          <p className="font-medium text-gray-700">Order #5831 delivered</p>
          <p className="text-gray-500">Order was successfully delivered by Michael Johnson</p>
          <p className="text-xs text-gray-400">12 minutes ago</p>
        </div>
      </li>
      <li className="flex items-start gap-3">
        <div className="w-8 h-8 flex items-center justify-center rounded-full text-orange-600"><svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15.9688 0C24.6068 0 31.6094 7.00255 31.6094 15.6406V16.3594C31.6094 24.9975 24.6068 32 15.9688 32C7.33067 32 0.328125 24.9975 0.328125 16.3594V15.6406C0.328125 7.00255 7.33067 0 15.9688 0Z" stroke="#E5E7EB"/>
<g clip-path="url(#clip0_5_375)">
<g clip-path="url(#clip1_5_375)">
<path d="M23.0672 11.5883L21.5004 9.1082C21.3609 8.88672 21.1121 8.75 20.8469 8.75H11.0906C10.8254 8.75 10.5766 8.88672 10.4371 9.1082L8.86758 11.5883C8.0582 12.868 8.77461 14.648 10.2867 14.8531C10.3961 14.8668 10.5082 14.875 10.6176 14.875C11.3313 14.875 11.9656 14.5633 12.4004 14.082C12.8352 14.5633 13.4695 14.875 14.1832 14.875C14.8969 14.875 15.5313 14.5633 15.966 14.082C16.4008 14.5633 17.0352 14.875 17.7488 14.875C18.4652 14.875 19.0969 14.5633 19.5316 14.082C19.9691 14.5633 20.6008 14.875 21.3145 14.875C21.4266 14.875 21.5359 14.8668 21.6453 14.8531C23.1629 14.6508 23.882 12.8707 23.0699 11.5883H23.0672ZM21.7574 15.7199H21.7547C21.6098 15.7391 21.4621 15.75 21.3117 15.75C20.9727 15.75 20.6473 15.698 20.3438 15.6051V19.25H11.5938V15.6023C11.2875 15.698 10.9594 15.75 10.6203 15.75C10.4699 15.75 10.3195 15.7391 10.1746 15.7199H10.1719C10.0598 15.7035 9.95039 15.6844 9.84375 15.657V19.25V21C9.84375 21.9652 10.6285 22.75 11.5938 22.75H20.3438C21.309 22.75 22.0938 21.9652 22.0938 21V19.25V15.657C21.9844 15.6844 21.875 15.7062 21.7574 15.7199Z" fill="#D97706"/>
</g>
</g>
<defs>
<clipPath id="clip0_5_375">
<rect width="15.75" height="14" fill="white" transform="translate(8.09375 8.75)"/>
</clipPath>
<clipPath id="clip1_5_375">
<path d="M8.09375 8.75H23.8438V22.75H8.09375V8.75Z" fill="white"/>
</clipPath>
</defs>
</svg>
</div>
        <div>
          <p className="font-medium text-gray-700">New store registration</p>
          <p className="text-gray-500">Fresh Groceries Store has submitted registration</p>
          <p className="text-xs text-gray-400">25 minutes ago</p>
        </div>
      </li>
      <li className="flex items-start gap-3">
        <div className="w-8 h-8 flex items-center justify-center rounded-full text-red-600"><svg width="29" height="32" viewBox="0 0 29 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14.5234 0C22.3633 0 28.7188 6.35546 28.7188 14.1953V17.8047C28.7188 25.6445 22.3633 32 14.5234 32C6.68358 32 0.328125 25.6445 0.328125 17.8047V14.1953C0.328125 6.35546 6.68358 0 14.5234 0Z" stroke="#E5E7EB"/>
<g clip-path="url(#clip0_5_377)">
<g clip-path="url(#clip1_5_377)">
<path d="M14.5156 9.625C14.9039 9.625 15.2621 9.83008 15.459 10.1664L21.3652 20.2289C21.5648 20.568 21.5648 20.9863 21.3707 21.3254C21.1766 21.6645 20.8129 21.875 20.4219 21.875H8.60937C8.21836 21.875 7.85469 21.6645 7.66054 21.3254C7.4664 20.9863 7.46914 20.5652 7.66601 20.2289L13.5723 10.1664C13.7691 9.83008 14.1273 9.625 14.5156 9.625ZM14.5156 13.125C14.152 13.125 13.8594 13.4176 13.8594 13.7812V16.8438C13.8594 17.2074 14.152 17.5 14.5156 17.5C14.8793 17.5 15.1719 17.2074 15.1719 16.8438V13.7812C15.1719 13.4176 14.8793 13.125 14.5156 13.125ZM15.3906 19.25C15.3906 19.0179 15.2984 18.7954 15.1343 18.6313C14.9702 18.4672 14.7477 18.375 14.5156 18.375C14.2836 18.375 14.061 18.4672 13.8969 18.6313C13.7328 18.7954 13.6406 19.0179 13.6406 19.25C13.6406 19.4821 13.7328 19.7046 13.8969 19.8687C14.061 20.0328 14.2836 20.125 14.5156 20.125C14.7477 20.125 14.9702 20.0328 15.1343 19.8687C15.2984 19.7046 15.3906 19.4821 15.3906 19.25Z" fill="#DC2626"/>
</g>
</g>
<defs>
<clipPath id="clip0_5_377">
<rect width="14" height="14" fill="white" transform="translate(7.51562 8.75)"/>
</clipPath>
<clipPath id="clip1_5_377">
<path d="M7.51562 8.75H21.5156V22.75H7.51562V8.75Z" fill="white"/>
</clipPath>
</defs>
</svg>
</div>
        <div>
          <p className="font-medium text-gray-700">Order #5830 canceled</p>
          <p className="text-gray-500">Customer canceled order from Tasty Bites Restaurant</p>
          <p className="text-xs text-gray-400">32 minutes ago</p>
        </div>
      </li>
      <li className="flex items-start gap-3">
        <div className="w-8 h-8 flex items-center justify-center rounded-full text-indigo-600"><svg width="33" height="32" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.3281 0C25.1647 0 32.3281 7.16344 32.3281 16C32.3281 24.8366 25.1647 32 16.3281 32C7.49157 32 0.328125 24.8366 0.328125 16C0.328125 7.16344 7.49157 0 16.3281 0Z" stroke="#E5E7EB"/>
<g clip-path="url(#clip0_5_379)">
<g clip-path="url(#clip1_5_379)">
<path d="M15.2344 9.62505C14.8707 9.62505 14.5781 9.91763 14.5781 10.2813C14.5781 10.645 14.8707 10.9375 15.2344 10.9375H16.8121L17.2605 11.7661L14.5781 14L13.3395 12.7614C13.0113 12.4333 12.5656 12.25 12.1008 12.25H9.32812C8.84414 12.25 8.45312 12.6411 8.45312 13.125V14H11.0781C13.4953 14 15.4531 15.9579 15.4531 18.375C15.4531 18.6758 15.423 18.9684 15.3656 19.25H17.2906C17.2332 18.9684 17.2031 18.6758 17.2031 18.375C17.2031 16.9477 17.8867 15.679 18.9449 14.8805L19.366 15.6625C18.5813 16.3051 18.0781 17.2813 18.0781 18.375C18.0781 20.3083 19.6449 21.875 21.5781 21.875C23.5113 21.875 25.0781 20.3083 25.0781 18.375C25.0781 16.4418 23.5113 14.875 21.5781 14.875C21.209 14.875 20.8535 14.9325 20.5199 15.0391L19.0133 12.25H20.7031C21.1871 12.25 21.5781 11.859 21.5781 11.375V10.5C21.5781 10.0161 21.1871 9.62505 20.7031 9.62505H20.1453C19.9402 9.62505 19.7434 9.69614 19.5848 9.82739L18.2887 10.9075L17.9059 10.1965C17.7145 9.8438 17.3453 9.62231 16.9434 9.62231H15.2344V9.62505ZM20.2301 17.2594L21.0012 18.6868C21.1734 19.0067 21.5727 19.1243 21.8898 18.952C22.207 18.7797 22.3273 18.3805 22.1551 18.0633L21.384 16.636C21.4469 16.6278 21.5125 16.625 21.5781 16.625C22.5434 16.625 23.3281 17.4098 23.3281 18.375C23.3281 19.3403 22.5434 20.125 21.5781 20.125C20.6129 20.125 19.8281 19.3403 19.8281 18.375C19.8281 17.9512 19.9785 17.5629 20.2301 17.2594ZM12.6996 19.0313C12.4398 19.6739 11.8109 20.125 11.0781 20.125C10.1129 20.125 9.32812 19.3403 9.32812 18.375C9.32812 17.4098 10.1129 16.625 11.0781 16.625C11.8137 16.625 12.4426 17.0762 12.6996 17.7188H14.5152C14.209 16.1 12.7871 14.875 11.0781 14.875C9.14492 14.875 7.57812 16.4418 7.57812 18.375C7.57812 20.3083 9.14492 21.875 11.0781 21.875C12.7871 21.875 14.209 20.65 14.518 19.0313H12.6996ZM11.0781 19.25C11.3102 19.25 11.5327 19.1579 11.6968 18.9938C11.8609 18.8297 11.9531 18.6071 11.9531 18.375C11.9531 18.143 11.8609 17.9204 11.6968 17.7563C11.5327 17.5922 11.3102 17.5 11.0781 17.5C10.8461 17.5 10.6235 17.5922 10.4594 17.7563C10.2953 17.9204 10.2031 18.143 10.2031 18.375C10.2031 18.6071 10.2953 18.8297 10.4594 18.9938C10.6235 19.1579 10.8461 19.25 11.0781 19.25Z" fill="#4F46E5"/>
</g>
</g>
<defs>
<clipPath id="clip0_5_379">
<rect width="17.5" height="14" fill="white" transform="translate(7.57812 8.75)"/>
</clipPath>
<clipPath id="clip1_5_379">
<path d="M7.57812 8.75H25.0781V22.75H7.57812V8.75Z" fill="white"/>
</clipPath>
</defs>
</svg>
</div>
        <div>
          <p className="font-medium text-gray-700">New delivery agent</p>
          <p className="text-gray-500">Robert Wilson has joined as a delivery agent</p>
          <p className="text-xs text-gray-400">45 minutes ago</p>
        </div>
      </li>
    </ul>
  </div>
</div>
{/* <div className="p-4">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
  <h4 className="mb-4 font-semibold text-gray-700">Recent Orders</h4>
  <div className="overflow-x-auto">
    <table className="w-full text-sm text-left">
      <thead className="bg-gray-50 text-gray-500">
        <tr>
          <th className="px-4 py-3">Order ID</th>
          <th className="px-4 py-3">Customer</th>
          <th className="px-4 py-3">Store</th>
          <th className="px-4 py-3">Date</th>
          <th className="px-4 py-3">Amount</th>
          <th className="px-4 py-3">Status</th>
          <th className="px-4 py-3">Agent</th>
          <th className="px-4 py-3">Actions</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-100">
        <tr className="hover:bg-gray-50 transition">
          <td className="px-4 py-3 font-medium text-[#2563EB]">#ORD-5832</td>
          <td className="px-4 py-3">Jane Cooper</td>
          <td className="px-4 py-3">Healthy Foods Store</td>
          <td className="px-4 py-3 text-gray-500">5 min ago</td>
          <td className="px-4 py-3 font-medium">$42.50</td>
          <td className="px-4 py-3">
            <span className="px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-600">
              Pending
            </span>
          </td>
          <td className="px-4 py-3 text-gray-500">-</td>
          <td className="px-4 py-3 flex gap-5 text-gray-500"><svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15.8594 20H0.109375V0H15.8594V20Z" stroke="#E5E7EB"/>
<g clip-path="url(#clip0_34_367)">
<g clip-path="url(#clip1_34_367)">
<path d="M7.98436 3.625C5.77499 3.625 4.00585 4.63125 2.71796 5.82891C1.43827 7.01562 0.58241 8.4375 0.177722 9.41367C0.0874878 9.62969 0.0874878 9.87031 0.177722 10.0863C0.58241 11.0625 1.43827 12.4844 2.71796 13.6711C4.00585 14.8687 5.77499 15.875 7.98436 15.875C10.1937 15.875 11.9629 14.8687 13.2508 13.6711C14.5305 12.4816 15.3863 11.0625 15.7937 10.0863C15.884 9.87031 15.884 9.62969 15.7937 9.41367C15.3863 8.4375 14.5305 7.01562 13.2508 5.82891C11.9629 4.63125 10.1937 3.625 7.98436 3.625ZM4.04686 9.75C4.04686 8.70571 4.46171 7.70419 5.20013 6.96577C5.93855 6.22734 6.94007 5.8125 7.98436 5.8125C9.02865 5.8125 10.0302 6.22734 10.7686 6.96577C11.507 7.70419 11.9219 8.70571 11.9219 9.75C11.9219 10.7943 11.507 11.7958 10.7686 12.5342C10.0302 13.2727 9.02865 13.6875 7.98436 13.6875C6.94007 13.6875 5.93855 13.2727 5.20013 12.5342C4.46171 11.7958 4.04686 10.7943 4.04686 9.75ZM7.98436 8C7.98436 8.96523 7.1996 9.75 6.23436 9.75C6.04022 9.75 5.85428 9.71719 5.67928 9.65977C5.52889 9.61055 5.35389 9.70352 5.35936 9.86211C5.36757 10.0508 5.39491 10.2395 5.44686 10.4281C5.82147 11.8281 7.26249 12.6594 8.66249 12.2848C10.0625 11.9102 10.8937 10.4691 10.5191 9.06914C10.2156 7.93438 9.2121 7.17148 8.09647 7.125C7.93788 7.11953 7.84491 7.2918 7.89413 7.44492C7.95155 7.61992 7.98436 7.80586 7.98436 8Z" fill="#2563EB"/>
</g>
</g>
<defs>
<clipPath id="clip0_34_367">
<rect width="15.75" height="14" fill="white" transform="translate(0.109375 2.75)"/>
</clipPath>
<clipPath id="clip1_34_367">
<path d="M0.109375 2.75H15.8594V16.75H0.109375V2.75Z" fill="white"/>
</clipPath>
</defs>
</svg>
<svg width="4" height="20" viewBox="0 0 4 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4 20H0.5V0H4V20Z" stroke="#E5E7EB"/>
<g clip-path="url(#clip0_34_371)">
<g clip-path="url(#clip1_34_371)">
<path d="M2.25 12.5938C1.84389 12.5938 1.45441 12.7551 1.16724 13.0422C0.880078 13.3294 0.71875 13.7189 0.71875 14.125C0.71875 14.5311 0.880078 14.9206 1.16724 15.2078C1.45441 15.4949 1.84389 15.6562 2.25 15.6562C2.65611 15.6562 3.04559 15.4949 3.33276 15.2078C3.61992 14.9206 3.78125 14.5311 3.78125 14.125C3.78125 13.7189 3.61992 13.3294 3.33276 13.0422C3.04559 12.7551 2.65611 12.5938 2.25 12.5938ZM2.25 8.21875C1.84389 8.21875 1.45441 8.38008 1.16724 8.66724C0.880078 8.95441 0.71875 9.34389 0.71875 9.75C0.71875 10.1561 0.880078 10.5456 1.16724 10.8328C1.45441 11.1199 1.84389 11.2812 2.25 11.2812C2.65611 11.2812 3.04559 11.1199 3.33276 10.8328C3.61992 10.5456 3.78125 10.1561 3.78125 9.75C3.78125 9.34389 3.61992 8.95441 3.33276 8.66724C3.04559 8.38008 2.65611 8.21875 2.25 8.21875ZM3.78125 5.375C3.78125 4.96889 3.61992 4.57941 3.33276 4.29224C3.04559 4.00508 2.65611 3.84375 2.25 3.84375C1.84389 3.84375 1.45441 4.00508 1.16724 4.29224C0.880078 4.57941 0.71875 4.96889 0.71875 5.375C0.71875 5.78111 0.880078 6.17059 1.16724 6.45776C1.45441 6.74492 1.84389 6.90625 2.25 6.90625C2.65611 6.90625 3.04559 6.74492 3.33276 6.45776C3.61992 6.17059 3.78125 5.78111 3.78125 5.375Z" fill="#4B5563"/>
</g>
</g>
<defs>
<clipPath id="clip0_34_371">
<rect width="3.5" height="14" fill="white" transform="translate(0.5 2.75)"/>
</clipPath>
<clipPath id="clip1_34_371">
<path d="M0.5 2.75H4V16.75H0.5V2.75Z" fill="white"/>
</clipPath>
</defs>
</svg>
</td>
        </tr>
        <tr className="hover:bg-gray-50 transition">
          <td className="px-4 py-3 font-medium text-[#2563EB]">#ORD-5831</td>
          <td className="px-4 py-3">Sarah Johnson</td>
          <td className="px-4 py-3">Tasty Bites</td>
          <td className="px-4 py-3 text-gray-500">12 min ago</td>
          <td className="px-4 py-3 font-medium">$68.25</td>
          <td className="px-4 py-3">
            <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-600">
              Delivered
            </span>
          </td>
          <td className="px-4 py-3 text-gray-500">Michael Johnson</td>
           <td className="px-4 py-3 flex gap-5 text-gray-500"><svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15.8594 20H0.109375V0H15.8594V20Z" stroke="#E5E7EB"/>
<g clip-path="url(#clip0_34_367)">
<g clip-path="url(#clip1_34_367)">
<path d="M7.98436 3.625C5.77499 3.625 4.00585 4.63125 2.71796 5.82891C1.43827 7.01562 0.58241 8.4375 0.177722 9.41367C0.0874878 9.62969 0.0874878 9.87031 0.177722 10.0863C0.58241 11.0625 1.43827 12.4844 2.71796 13.6711C4.00585 14.8687 5.77499 15.875 7.98436 15.875C10.1937 15.875 11.9629 14.8687 13.2508 13.6711C14.5305 12.4816 15.3863 11.0625 15.7937 10.0863C15.884 9.87031 15.884 9.62969 15.7937 9.41367C15.3863 8.4375 14.5305 7.01562 13.2508 5.82891C11.9629 4.63125 10.1937 3.625 7.98436 3.625ZM4.04686 9.75C4.04686 8.70571 4.46171 7.70419 5.20013 6.96577C5.93855 6.22734 6.94007 5.8125 7.98436 5.8125C9.02865 5.8125 10.0302 6.22734 10.7686 6.96577C11.507 7.70419 11.9219 8.70571 11.9219 9.75C11.9219 10.7943 11.507 11.7958 10.7686 12.5342C10.0302 13.2727 9.02865 13.6875 7.98436 13.6875C6.94007 13.6875 5.93855 13.2727 5.20013 12.5342C4.46171 11.7958 4.04686 10.7943 4.04686 9.75ZM7.98436 8C7.98436 8.96523 7.1996 9.75 6.23436 9.75C6.04022 9.75 5.85428 9.71719 5.67928 9.65977C5.52889 9.61055 5.35389 9.70352 5.35936 9.86211C5.36757 10.0508 5.39491 10.2395 5.44686 10.4281C5.82147 11.8281 7.26249 12.6594 8.66249 12.2848C10.0625 11.9102 10.8937 10.4691 10.5191 9.06914C10.2156 7.93438 9.2121 7.17148 8.09647 7.125C7.93788 7.11953 7.84491 7.2918 7.89413 7.44492C7.95155 7.61992 7.98436 7.80586 7.98436 8Z" fill="#2563EB"/>
</g>
</g>
<defs>
<clipPath id="clip0_34_367">
<rect width="15.75" height="14" fill="white" transform="translate(0.109375 2.75)"/>
</clipPath>
<clipPath id="clip1_34_367">
<path d="M0.109375 2.75H15.8594V16.75H0.109375V2.75Z" fill="white"/>
</clipPath>
</defs>
</svg>
<svg width="4" height="20" viewBox="0 0 4 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4 20H0.5V0H4V20Z" stroke="#E5E7EB"/>
<g clip-path="url(#clip0_34_371)">
<g clip-path="url(#clip1_34_371)">
<path d="M2.25 12.5938C1.84389 12.5938 1.45441 12.7551 1.16724 13.0422C0.880078 13.3294 0.71875 13.7189 0.71875 14.125C0.71875 14.5311 0.880078 14.9206 1.16724 15.2078C1.45441 15.4949 1.84389 15.6562 2.25 15.6562C2.65611 15.6562 3.04559 15.4949 3.33276 15.2078C3.61992 14.9206 3.78125 14.5311 3.78125 14.125C3.78125 13.7189 3.61992 13.3294 3.33276 13.0422C3.04559 12.7551 2.65611 12.5938 2.25 12.5938ZM2.25 8.21875C1.84389 8.21875 1.45441 8.38008 1.16724 8.66724C0.880078 8.95441 0.71875 9.34389 0.71875 9.75C0.71875 10.1561 0.880078 10.5456 1.16724 10.8328C1.45441 11.1199 1.84389 11.2812 2.25 11.2812C2.65611 11.2812 3.04559 11.1199 3.33276 10.8328C3.61992 10.5456 3.78125 10.1561 3.78125 9.75C3.78125 9.34389 3.61992 8.95441 3.33276 8.66724C3.04559 8.38008 2.65611 8.21875 2.25 8.21875ZM3.78125 5.375C3.78125 4.96889 3.61992 4.57941 3.33276 4.29224C3.04559 4.00508 2.65611 3.84375 2.25 3.84375C1.84389 3.84375 1.45441 4.00508 1.16724 4.29224C0.880078 4.57941 0.71875 4.96889 0.71875 5.375C0.71875 5.78111 0.880078 6.17059 1.16724 6.45776C1.45441 6.74492 1.84389 6.90625 2.25 6.90625C2.65611 6.90625 3.04559 6.74492 3.33276 6.45776C3.61992 6.17059 3.78125 5.78111 3.78125 5.375Z" fill="#4B5563"/>
</g>
</g>
<defs>
<clipPath id="clip0_34_371">
<rect width="3.5" height="14" fill="white" transform="translate(0.5 2.75)"/>
</clipPath>
<clipPath id="clip1_34_371">
<path d="M0.5 2.75H4V16.75H0.5V2.75Z" fill="white"/>
</clipPath>
</defs>
</svg>
</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
</div> */}

      </div>
    </div>
  );
}
