import { useEffect, useState } from "react"
import axios from "axios"
import { Eye, Edit, Trash2, Store, ShieldCheck, Clock } from "lucide-react"
import { SideBar } from "../components/SideBar"
import { AdminNav } from "../components/AdminNav"

export default function AdminProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const BASE_URL = import.meta.env.VITE_BASE_URL || "https://snazzl-backend.vercel.app"

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/products/get/all`)
        setProducts(res.data.products || res.data)
      } catch (err) {
        console.error(err)
        setError("Failed to fetch products")
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [BASE_URL])

  if (loading)
    return <div className="flex justify-center items-center h-screen text-lg">Loading products...</div>

  if (error)
    return <div className="flex justify-center items-center h-screen text-red-600">{error}</div>

  return (
    <div className="flex min-h-screen bg-gray-100">
      <SideBar route={"products"} />
      <div className="flex-1">
        <AdminNav title="Product Management" />
        <div className="mt-6 bg-white shadow-lg sm:p-6">
          <div className="flex items-center justify-between mb-4 ">
            <h2 className="text-xl font-semibold text-gray-800">All Products</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="shadow-md p-4 rounded-lg flex items-center gap-3">
              <Store className="text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Total Products</p>
                <h3 className="text-lg font-semibold">{products.length}</h3>
              </div>
            </div>
            <div className="shadow-md p-4 rounded-lg flex items-center gap-3">
              <ShieldCheck className="text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Active Products</p>
                <h3 className="text-lg font-semibold">
                  {products.filter(p => p.status === "Active").length}
                </h3>
              </div>
            </div>
            <div className="shadow-md p-4 rounded-lg flex items-center gap-3">
              <Clock className="text-yellow-600" />
              <div>
                <p className="text-sm text-gray-600">Inactive Products</p>
                <h3 className="text-lg font-semibold">
                  {products.filter(p => p.status !== "Active").length}
                </h3>
              </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 rounded-lg text-gray-50">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-gray-600 font-semibold">Image</th>
                  <th className="px-4 py-2 text-left text-gray-600 font-semibold">Product Name</th>
                  <th className="px-4 py-2 text-left text-gray-600 font-semibold">Category</th>
                  <th className="px-4 py-2 text-left text-gray-600 font-semibold">Sizes</th>
                  <th className="px-4 py-2 text-left text-gray-600 font-semibold">Price Range</th>
                  <th className="px-4 py-2 text-left text-gray-600 font-semibold">Total Stock</th>
                  <th className="px-4 py-2 text-left text-gray-600 font-semibold">Status</th>
                  <th className="px-4 py-2 text-left text-gray-600 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p, index) => (
                  <tr key={index} className="border-t hover:bg-gray-50">
                    <td className="px-4 py-2">
                      <img
                        src={p.images?.[0]?.url || "/placeholder.jpg"}
                        alt={p.name}
                        className="w-16 h-16 rounded-md object-cover"
                      />
                    </td>
                    <td className="px-4 py-2 font-medium text-gray-800">{p.name}</td>
                    <td className="px-4 py-2 text-gray-700">{p.category}</td>
                    <td className="px-4 py-2 text-gray-700">{p.size?.join(", ")}</td>
                    <td className="px-4 py-2 text-gray-700">
                      ₹{Math.min(...p.price)} - ₹{Math.max(...p.price)}
                    </td>
                    <td className="px-4 py-2 text-gray-700">
                      {p.quantity?.reduce((a, b) => a + b, 0)}
                    </td>
                    <td className="px-4 py-2">
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          p.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {p.status}
                      </span>
                    </td>
                    <td className="px-4 py-2 flex items-center gap-2">
                      <button className="text-blue-600 hover:text-blue-800">
                        <Eye size={18} />
                      </button>
                      <button className="text-green-600 hover:text-green-800">
                        <Edit size={18} />
                      </button>
                      <button className="text-red-600 hover:text-red-800">
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
