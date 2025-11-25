"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import {
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  MoreVertical, // Used for the three dots menu
  Loader2,
  Truck,
  User,
} from "lucide-react";
import { SideBar } from "../components/SideBar";
import { AdminNav } from "../components/AdminNav";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useConvex } from "convex/react";
import { api } from "../../convex/_generated/api";

const DeliveryAgentStatus = {
  ONLINE: "Online",
  BUSY: "Busy",
};

// --- START: Dropdown Component ---
const ActionDropdown = ({ order, onAssignAgentClick, onDetailsClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const isAssigned = !!order.deliveryAgentStatus;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleAction = (action) => {
    setIsOpen(false);
    if (action === 'assign') onAssignAgentClick(order);
    if (action === 'details') onDetailsClick(order);
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-1 rounded-full text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <MoreVertical className="w-4 h-4" />
      </button>

      {isOpen && (
        <div className="absolute right-0 z-20 w-56 mt-2 origin-top-right bg-white border border-gray-200 rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
          <div className="py-1">
            {/* ACTION: Assign Agent / View Agent Details */}
            <button
              onClick={() => handleAction(isAssigned ? 'details' : 'assign')}
              className={`w-full text-left px-4 py-2 text-sm ${isAssigned ? 'text-green-700 hover:bg-green-50' : 'text-blue-700 hover:bg-blue-50'}`}
            >
              {isAssigned ? (
                <span className="flex items-center gap-2"><Truck className="w-4 h-4" /> View Assigned Agent</span>
              ) : (
                <span className="flex items-center gap-2"><User className="w-4 h-4" /> Assign Delivery Agent</span>
              )}
            </button>

          </div>
        </div>
      )}
    </div>
  );
};
// --- END: Dropdown Component ---

// --- START: Agent Assignment Modal ---
const AgentAssignmentModal = ({ order, onlineAgentsQuery, onClose, onAssign }) => {
  const [instructions, setInstructions] = useState("");
  const [selectedAgentId, setSelectedAgentId] = useState("");
  const [isAssigning, setIsAssigning] = useState(false);
  const modalRef = useRef(null);

  const assignedAgentName = order?.deliveryAgent?.fullName || order?.deliveryAgent || "N/A";

  // FIX: Close modal when clicking on the backdrop
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };
    // Attach listener to the whole document
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const handleAssign = async () => {
    if (!selectedAgentId) return;
    setIsAssigning(true);
    try {
      await onAssign(order._id, selectedAgentId, instructions);
    } finally {
      // The final UI state (modal close) is handled in handleAssignAgent now
    }
  };

  return (
    <div 
        className="fixed inset-0 bg-transparent backdrop-blur-[2px] flex justify-center items-center z-50" 
        role="dialog" 
        aria-modal="true"
    >
      <div 
        className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md transform transition-all duration-300 border-2 border-gray-400"
        ref={modalRef} 
      >
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          {order.deliveryAgent ? "Delivery Agent Details" : "Assign Delivery Agent"}
        </h2>

        <div className="mb-4 p-3 bg-gray-50 rounded-md border border-gray-200">
          <p className="text-sm font-medium text-gray-700">
            Order ID: <span className="text-blue-600 font-bold">{order._id}</span>
          </p>
          <p className="text-sm text-gray-600">City: {order.address?.city || "N/A"}</p>
          <p className="text-sm text-gray-600">
            Total: ₹
            {(
              order.items?.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 0), 0) || 0
            ).toFixed(2)}
          </p>
        </div>

        {order.deliveryAgentStatus ? (
          <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg">
            <User className="w-6 h-6 text-blue-600" />
            <div>
              <p className="font-semibold text-blue-800">Agent Name: {order.deliveryAgent.fullName}</p>
              <p className="text-sm font-semibold text-blue-700">Agent ID: {order.deliveryAgent.employeeId}</p>
              {order.instructions && (
                <p className="text-sm text-semibold text-blue-600">Instructions: {order.instructions}</p>
              )}
            </div>
          </div>
        ) : (
          <>
            <label htmlFor="agent-select" className="block text-sm font-medium text-gray-700 mb-2">
              Select Online Delivery Agent
            </label>

            <select
              id="agent-select"
              value={selectedAgentId}
              onChange={(e) => setSelectedAgentId(e.target.value)}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              disabled={onlineAgentsQuery.isLoading || (onlineAgentsQuery.data?.length ?? 0) === 0}
            >
              <option value="" disabled>
                {onlineAgentsQuery.isLoading
                  ? "Loading agents..."
                  : (onlineAgentsQuery.data?.length ?? 0) === 0
                  ? "No agents online"
                  : "Choose an agent"}
              </option>

              {onlineAgentsQuery.data?.map((agent) => (
                <option key={agent._id} value={agent._id}>
                  {agent.fullName} (ID: {agent.employeeId})
                </option>
              ))}
            </select>
            <textarea
              placeholder="Enter delivery instructions…"
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              className="w-full mt-4 p-2 border rounded-md text-sm"
              rows={3}
            />
          </>
        )}

        <div className="mt-6 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Close
          </button>

          {!order.deliveryAgent && (
            <button
              onClick={handleAssign}
              disabled={!selectedAgentId || isAssigning || onlineAgentsQuery.isLoading}
              className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 disabled:bg-blue-400 flex items-center"
            >
              {isAssigning && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isAssigning ? "Assigning..." : "Assign Agent"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
// --- END: Agent Assignment Modal ---

export default function AdminOrders() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 10;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const queryClient = useQueryClient();
  const convex = useConvex();

  // Orders query
  const {
    data: orders = [],
    isLoading: loading,
    error,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: () => convex.query(api.orders.getAllOrders, {}),
    staleTime: 1000 * 30,
  });
  

  // Online agents query (only fetch when assigning)
  const onlineAgentsQuery = useQuery({
    queryKey: ["agents-online"],
    queryFn: () =>
      convex.query(api.deliveryAgents.getAgentsByStatus, {
        status: DeliveryAgentStatus.ONLINE,
      }),
    enabled: isModalOpen && !selectedOrder?.deliveryAgent,
    staleTime: 1000 * 10,
  });

  const assignAgentMutation = useMutation({
    mutationFn: (args) => convex.mutation(api.orders.assignDeliveryAgent, args),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({ queryKey: ["agents-online"] });
    },
    onError: (err) => {
      console.error("Assignment mutation failed:", err);
      throw err;
    },
  });

  const updateAgentStatusMutation = useMutation({
    mutationFn: (args) => convex.mutation(api.deliveryAgents.updateAgentStatus, args),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["agents-online"] });
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
    onError: (err) => {
      console.error("Update agent status mutation failed:", err);
      throw err;
    },
  });

  const handleAssignAgent = async (orderId, agentId, instructions) => {
    try {
      await assignAgentMutation.mutateAsync({ id: orderId, deliveryAgentId: agentId, instructions: instructions });
      await updateAgentStatusMutation.mutateAsync({ agentId, status: DeliveryAgentStatus.BUSY });
      
      // FIX: Replace alert with a console log placeholder for Toast
      console.log(`TOAST: Agent assigned to order ${orderId} and set to Busy.`); 
      
      setIsModalOpen(false);
    } catch (err) {
      console.error("Assignment sequence error:", err);
      
      // FIX: Replace alert with a console log placeholder for Toast
      console.log(`TOAST ERROR: Failed to assign agent: ${err?.message || "Unknown error"}`);
      
      setIsModalOpen(false);
    }
  };

  const openAssignModal = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const filteredOrders = useMemo(() => {
    const sortedOrders = [...orders].sort((a, b) => b.createdAt - a.createdAt);
    const q = search.trim().toLowerCase();
    if (!q) return sortedOrders;
    return (sortedOrders || []).filter(
      (o) =>
        o._id.toLowerCase().includes(q) ||
        (o.address?.city || "").toLowerCase().includes(q)
    );
  }, [orders, search]);

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.max(1, Math.ceil((filteredOrders.length || 0) / ordersPerPage));

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
              <div className="p-8 text-center text-red-500 text-sm">Error: {error.message}</div>
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
                    const totalAmount =
                      (o.items?.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 0), 0) || 0).toFixed(2);

                    return (
                      <tr key={o._id} className="border border-[#E5E7EB] hover:bg-gray-50">
                        <td className="px-4 py-3 text-blue-600 font-medium">{o._id}</td>
                        <td className="px-4 py-3">{o.address?.city || "—"}</td>
                        <td className="px-4 py-3">{o.items?.length || 0}</td>
                        <td className="px-4 py-3">₹{totalAmount}</td>
                        <td className="px-4 py-3">{new Date(o.createdAt).toLocaleDateString("en-IN")}</td>
                        <td className="px-4 py-3 relative">
                          <ActionDropdown 
                            order={o}
                            onAssignAgentClick={openAssignModal}
                            onDetailsClick={openAssignModal}
                          />
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
                      currentPage === i + 1 ? "bg-blue-600 border-blue-600 text-white" : "border-gray-300 hover:bg-gray-100"
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

      {isModalOpen && selectedOrder && (
        <AgentAssignmentModal
          order={selectedOrder}
          onlineAgentsQuery={onlineAgentsQuery}
          onClose={() => setIsModalOpen(false)}
          onAssign={handleAssignAgent}
        />
      )}
    </div>
  );
}