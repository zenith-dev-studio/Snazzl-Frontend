"use client"
import { useEffect, useState } from "react"
import { SideBar } from "../components/SideBar"
import { AdminNav } from "../components/AdminNav"

export default function AdminDelivery() {
  const [agents, setAgents] = useState([])
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState("All")
  const [zoneFilter, setZoneFilter] = useState("")
  const [search, setSearch] = useState("")

  const baseUrl = import.meta.env.VITE_BASE_URL + "/api/agents"

  const fetchAgents = async () => {
    setLoading(true)
    try {
      let url = `${baseUrl}/get/all`

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

  const updateStatus = async (agentId, newStatus) => {
    try {
      const res = await fetch(`${baseUrl}/update/status`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ agentId, status: newStatus }),
      })
      const data = await res.json()
      if (data.success) fetchAgents()
    } catch (err) {
      console.error("Error updating status:", err)
    }
  }

  const updateLicenseStatus = async (agentId, newStatus) => {
    try {
      const res = await fetch(`${baseUrl}/update/license-status`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ agentId, licenseStatus: newStatus }),
      })
      const data = await res.json()
      if (data.success) fetchAgents()
    } catch (err) {
      console.error("Error updating license:", err)
    }
  }

  const updatePerformance = async (agentId, newPerformance) => {
    try {
      const res = await fetch(`${baseUrl}/update/performance`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ agentId, ...newPerformance }),
      })
      const data = await res.json()
      if (data.success) fetchAgents()
    } catch (err) {
      console.error("Error updating performance:", err)
    }
  }

  useEffect(() => {
    fetchAgents()
  }, [statusFilter, zoneFilter])

  const filteredAgents = agents.filter(
    (agent) =>
      agent.fullName?.toLowerCase().includes(search.toLowerCase()) ||
      agent.email?.toLowerCase().includes(search.toLowerCase()) ||
      agent.phone?.includes(search)
  )

  return (
    <div className="flex min-h-screen bg-gray-50">
      <SideBar route={"delivery agents"} />
      <div className="flex-1">
        <AdminNav />
        <main className="p-6 space-y-6">
          <div className="-mt-5 flex justify-between">
            <div>
              <h1 className="text-xl font-semibold">Delivery Agents</h1>
              <p className="text-sm text-gray-500">
                Manage delivery partners and track performance
              </p>
            </div>
            <div className="flex gap-5">
              <button className="rounded-md bg-blue-600 px-3 py-2 text-sm text-white">
                Add New Agent
              </button>
              <button className="rounded-md bg-[#E5E7EB] px-3 py-2 text-sm text-black">
                Zone Management
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between bg-white p-4 py-6 rounded-md">
            <input
              type="text"
              placeholder="Search agents by name, email, or phone..."
              className="w-1/3 rounded-md border border-[#E5E7EB] px-3 py-2 text-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div className="flex gap-3">
              <select
                className="rounded-md border border-[#E5E7EB] px-3 py-2 text-sm"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option>All</option>
                <option>Online</option>
                <option>Busy</option>
                <option>Offline</option>
              </select>
              <input
                type="text"
                placeholder="Filter by zone"
                className="rounded-md border border-[#E5E7EB] px-3 py-2 text-sm"
                value={zoneFilter}
                onChange={(e) => setZoneFilter(e.target.value)}
              />
              <button
                className="rounded-md border border-[#E5E7EB] px-3 py-2 text-sm"
                onClick={fetchAgents}
              >
                Apply Filters
              </button>
            </div>
          </div>

          <div className="overflow-hidden rounded-lg bg-white shadow">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 text-[#6B7280]">
                <tr>
                  <th className="px-4 py-3">Agent Details</th>
                  <th className="px-4 py-3">Contact & Zone</th>
                  <th className="px-4 py-3">Performance</th>
                  <th className="px-4 py-3">Vehicle & License</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={6} className="text-center py-4 text-gray-500">
                      Loading...
                    </td>
                  </tr>
                ) : filteredAgents.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-4 text-gray-500">
                      No agents found
                    </td>
                  </tr>
                ) : (
                  filteredAgents.map((agent, i) => (
                    <tr
                      key={i}
                      className="border-t border-gray-200 hover:bg-gray-50"
                    >
                      <td className="px-4 py-3 flex gap-3 items-center">
                        <img
                          src={`https://i.pravatar.cc/40?img=${i + 10}`}
                          alt={agent.fullName}
                          className="w-10 h-10 rounded-full"
                        />
                        <div>
                          <p className="font-medium">{agent.fullName}</p>
                          <p className="text-xs text-gray-500">
                            {agent.employeeId}
                          </p>
                          <div className="flex items-center text-yellow-600 text-xs">
                            ⭐ {agent.rating}
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <p className="text-sm">{agent.email}</p>
                        <p className="text-xs text-gray-500">{agent.phone}</p>
                        <p className="text-xs text-blue-600 underline cursor-pointer">
                          {agent.zone}
                        </p>
                      </td>
                      <td className="px-4 py-3">
                        <p className="font-medium">
                          {agent.deliveries} deliveries
                        </p>
                        <p className="text-xs text-gray-500">
                          {agent.completionRate}% completion
                        </p>
                        <p className="text-xs text-gray-500">
                          Avg: {agent.avgDeliveryTime}
                        </p>
                        <p className="text-sm text-green-600 font-medium">
                          ${agent.earnings}
                        </p>
                      </td>
                      <td className="px-4 py-3">
                        <p className="text-sm">{agent.vehicleType}</p>
                        <span
                          className={`text-xs font-medium px-2 py-1 rounded cursor-pointer ${
                            agent.licenseStatus === "Verified"
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                          onClick={() =>
                            updateLicenseStatus(
                              agent._id,
                              agent.licenseStatus === "Verified"
                                ? "Pending"
                                : "Verified"
                            )
                          }
                        >
                          {agent.licenseStatus}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <select
                          className={`px-2 py-1 rounded text-xs font-medium border ${
                            agent.status === "Online"
                              ? "bg-green-100 text-green-700"
                              : agent.status === "Busy"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-gray-100 text-gray-500"
                          }`}
                          value={agent.status}
                          onChange={(e) =>
                            updateStatus(agent._id, e.target.value)
                          }
                        >
                          <option>Online</option>
                          <option>Busy</option>
                          <option>Offline</option>
                        </select>
                      </td>
                      <td className="px-4 py-3 flex gap-2 text-gray-600">
                        <button
                          onClick={() =>
                            updatePerformance(agent._id, {
                              deliveries: agent.deliveries + 1,
                            })
                          }
                          className="text-blue-600 text-xs underline"
                        >
                          +1 Delivery
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  )
}
