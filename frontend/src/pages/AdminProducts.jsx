"use client"
import { Star, Eye, Edit, Trash2, Check, X, Store, ShieldCheck, Clock } from "lucide-react"
import { SideBar } from "../components/SideBar"
import { AdminNav } from "../components/AdminNav"

export default function AdminProducts() {
  const products = [
  {
    name: "Organic Apples",
    sku: "PRD001",
    image: "https://via.placeholder.com/40",
    category: "Fruits",
    store: "Fresh Foods Market",
    price: "$4.99 / lb",
    discount: "10% off",
    stock: "152 in stock",
    lowStock: false,
    sold: "1,247 sold",
    revenue: "$6,210",
    status: "Active",
  },
  {
    name: "Whole Wheat Bread",
    sku: "PRD002",
    image: "https://via.placeholder.com/40",
    category: "Bakery",
    store: "Quick Mart Express",
    price: "$3.49",
    discount: "No discount",
    stock: "23 in stock",
    lowStock: true,
    sold: "892 sold",
    revenue: "$3,120",
    status: "Active",
  },
  {
    name: "Bluetooth Headphones",
    sku: "PRD003",
    image: "https://via.placeholder.com/40",
    category: "Electronics",
    store: "Elite Electronics",
    price: "$79.99",
    discount: "15% off",
    stock: "0 in stock",
    lowStock: true,
    sold: "456 sold",
    revenue: "$25,480",
    status: "Out of Stock",
  },
  {
    name: "Almond Milk",
    sku: "PRD004",
    image: "https://via.placeholder.com/40",
    category: "Dairy",
    store: "Fresh Foods Market",
    price: "$2.99",
    discount: "5% off",
    stock: "310 in stock",
    lowStock: false,
    sold: "2,150 sold",
    revenue: "$6,420",
    status: "Active",
  },
]


  return (
    <div className="flex min-h-screen bg-gray-50">
        <SideBar route={"products & categories"}/>
      <div className="flex-1">
        <AdminNav />
        <main className="p-6 space-y-6">
         <div className="-mt-5 flex justify-between">
            <div>
            <h1 className="text-xl font-semibold">Products & Categories</h1>
            <p className="text-sm text-gray-500">
            Manage product catalog across all stores
            </p>
            </div>
            <div className="flex gap-5">
             <button className="rounded-md bg-blue-600 px-3 py-2 text-sm text-white">
                Add Product
              </button>
              <button className="rounded-md bg-[#E5E7EB] px-3 py-2 text-sm text-black">
                Manage Categories
              </button>
              </div>
          </div>
          <div className="grid grid-cols-4 gap-4">
            <div className="flex justify-between gap-3 rounded-lg bg-white p-4 shadow">
              <div>
                <p className="text-sm text-gray-500">Total Products</p>
                <p className="text-2xl font-bold">2,847</p>
              </div>
             <svg className="mt-2" width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M40 0C44.4183 0 48 3.58172 48 8V40C48 44.4183 44.4183 48 40 48H8C3.58172 48 0 44.4183 0 40V8C5.15405e-07 3.58172 3.58172 0 8 0H40Z" fill="#DBEAFE"/>
<path d="M40 0C44.4183 0 48 3.58172 48 8V40C48 44.4183 44.4183 48 40 48H8C3.58172 48 0 44.4183 0 40V8C5.15405e-07 3.58172 3.58172 0 8 0H40Z" stroke="#E5E7EB"/>
<path d="M32.75 38H15.25V10H32.75V38Z"/>
<g clip-path="url(#clip0_38_4289)">
<path d="M17.2305 15.7852L15.25 19.75H23.375V14.75H18.9102C18.1992 14.75 17.5508 15.1523 17.2305 15.7852ZM24.625 19.75H32.75L30.7695 15.7852C30.4492 15.1523 29.8008 14.75 29.0898 14.75H24.625V19.75ZM32.75 21H15.25V29.75C15.25 31.1289 16.3711 32.25 17.75 32.25H30.25C31.6289 32.25 32.75 31.1289 32.75 29.75V21Z" fill="#3B82F6"/>
</g>
<defs>
<clipPath id="clip0_38_4289">
<path d="M15.25 13.5H32.75V33.5H15.25V13.5Z" fill="white"/>
</clipPath>
</defs>
</svg>



            </div>
            <div className="flex justify-between gap-3 rounded-lg bg-white p-4 py-6 shadow">
              <div>
                <p className="text-sm text-gray-500">Categories</p>
                <p className="text-2xl font-bold">24</p>
              </div>
              <svg className="mt-2" width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M40 0C44.4183 0 48 3.58172 48 8V40C48 44.4183 44.4183 48 40 48H8C3.58172 48 0 44.4183 0 40V8C5.15405e-07 3.58172 3.58172 0 8 0H40Z" fill="#F3E8FF"/>
<path d="M40 0C44.4183 0 48 3.58172 48 8V40C48 44.4183 44.4183 48 40 48H8C3.58172 48 0 44.4183 0 40V8C5.15405e-07 3.58172 3.58172 0 8 0H40Z" stroke="#E5E7EB"/>
<path d="M34 38H14V10H34V38Z"/>
<g clip-path="url(#clip0_38_4291)">
<path d="M27.4766 15.0273L32.4688 20.0781C34.5156 22.1484 34.5156 25.4766 32.4688 27.5469L28.0938 31.9727C27.7305 32.3398 27.1367 32.3438 26.7695 31.9805C26.4023 31.6172 26.3984 31.0234 26.7617 30.6562L31.1328 26.2305C32.457 24.8906 32.457 22.7383 31.1328 21.3984L26.1445 16.3477C25.7812 15.9805 25.7852 15.3867 26.1523 15.0234C26.5195 14.6602 27.1133 14.6641 27.4766 15.0313V15.0273ZM14 22.4648V16.625C14 15.5898 14.8398 14.75 15.875 14.75H21.7148C22.3789 14.75 23.0156 15.0117 23.4844 15.4805L30.0469 22.043C31.0234 23.0195 31.0234 24.6016 30.0469 25.5781L24.832 30.793C23.8555 31.7695 22.2734 31.7695 21.2969 30.793L14.7344 24.2305C14.2617 23.7617 14 23.1289 14 22.4648ZM19.625 19.125C19.625 18.7935 19.4933 18.4755 19.2589 18.2411C19.0245 18.0067 18.7065 17.875 18.375 17.875C18.0435 17.875 17.7255 18.0067 17.4911 18.2411C17.2567 18.4755 17.125 18.7935 17.125 19.125C17.125 19.4565 17.2567 19.7745 17.4911 20.0089C17.7255 20.2433 18.0435 20.375 18.375 20.375C18.7065 20.375 19.0245 20.2433 19.2589 20.0089C19.4933 19.7745 19.625 19.4565 19.625 19.125Z" fill="#9333EA"/>
</g>
<defs>
<clipPath id="clip0_38_4291">
<path d="M14 13.5H34V33.5H14V13.5Z" fill="white"/>
</clipPath>
</defs>
</svg>

            </div>
            <div className="flex justify-between gap-3 rounded-lg bg-white p-4 shadow">
              <div>
                <p className="text-sm text-gray-500">Out of Stock</p>
                <p className="text-2xl font-bold">156</p>
              </div>
              <svg className="mt-2" width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M40 0C44.4183 0 48 3.58172 48 8V40C48 44.4183 44.4183 48 40 48H8C3.58172 48 0 44.4183 0 40V8C5.15405e-07 3.58172 3.58172 0 8 0H40Z" fill="#FEE2E2"/>
<path d="M40 0C44.4183 0 48 3.58172 48 8V40C48 44.4183 44.4183 48 40 48H8C3.58172 48 0 44.4183 0 40V8C5.15405e-07 3.58172 3.58172 0 8 0H40Z" stroke="#E5E7EB"/>
<path d="M34 38H14V10H34V38Z"/>
<g clip-path="url(#clip0_38_4293)">
<path d="M24 14.75C24.5547 14.75 25.0664 15.043 25.3476 15.5234L33.7851 29.8984C34.0703 30.3828 34.0703 30.9805 33.793 31.4648C33.5156 31.9492 32.9961 32.25 32.4375 32.25H15.5625C15.0039 32.25 14.4844 31.9492 14.207 31.4648C13.9297 30.9805 13.9336 30.3789 14.2148 29.8984L22.6523 15.5234C22.9336 15.043 23.4453 14.75 24 14.75ZM24 19.75C23.4805 19.75 23.0625 20.168 23.0625 20.6875V25.0625C23.0625 25.582 23.4805 26 24 26C24.5195 26 24.9375 25.582 24.9375 25.0625V20.6875C24.9375 20.168 24.5195 19.75 24 19.75ZM25.25 28.5C25.25 28.1685 25.1183 27.8505 24.8839 27.6161C24.6495 27.3817 24.3315 27.25 24 27.25C23.6685 27.25 23.3505 27.3817 23.1161 27.6161C22.8817 27.8505 22.75 28.1685 22.75 28.5C22.75 28.8315 22.8817 29.1495 23.1161 29.3839C23.3505 29.6183 23.6685 29.75 24 29.75C24.3315 29.75 24.6495 29.6183 24.8839 29.3839C25.1183 29.1495 25.25 28.8315 25.25 28.5Z" fill="#DC2626"/>
</g>
<defs>
<clipPath id="clip0_38_4293">
<path d="M14 13.5H34V33.5H14V13.5Z" fill="white"/>
</clipPath>
</defs>
</svg>


            </div>
            <div className="flex justify-between gap-3 rounded-lg bg-white p-4 shadow">
              <div>
                <p className="text-sm text-gray-500">Avg Price</p>
                <p className="text-2xl font-bold ">$8.45</p>
              </div>
              <svg className="mt-2" width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M40 0C44.4183 0 48 3.58172 48 8V40C48 44.4183 44.4183 48 40 48H8C3.58172 48 0 44.4183 0 40V8C5.15405e-07 3.58172 3.58172 0 8 0H40Z" fill="#DCFCE7"/>
<path d="M40 0C44.4183 0 48 3.58172 48 8V40C48 44.4183 44.4183 48 40 48H8C3.58172 48 0 44.4183 0 40V8C5.15405e-07 3.58172 3.58172 0 8 0H40Z" stroke="#E5E7EB"/>
<path d="M30.25 38H17.75V10H30.25V38Z"/>
<g clip-path="url(#clip0_38_4295)">
<path d="M24 13.5C24.6914 13.5 25.25 14.0586 25.25 14.75V16.1445C25.3125 16.1523 25.3711 16.1602 25.4336 16.1719C25.4492 16.1758 25.4609 16.1758 25.4766 16.1797L27.3516 16.5234C28.0312 16.6484 28.4805 17.3008 28.3555 17.9766C28.2305 18.6523 27.5781 19.1055 26.9023 18.9805L25.0469 18.6406C23.8242 18.4609 22.7461 18.582 21.9883 18.8828C21.2305 19.1836 20.9258 19.5977 20.8555 19.9805C20.7773 20.3984 20.8359 20.6328 20.9023 20.7773C20.9727 20.9297 21.1172 21.1016 21.4023 21.293C22.0391 21.7109 23.0156 21.9844 24.2812 22.3203L24.3945 22.3516C25.5117 22.6484 26.8789 23.0078 27.8945 23.6719C28.4492 24.0352 28.9727 24.5273 29.2969 25.2148C29.6289 25.9141 29.6992 26.6953 29.5469 27.5273C29.2773 29.0117 28.2539 30.0039 26.9844 30.5234C26.4492 30.7422 25.8672 30.8828 25.25 30.9531V32.25C25.25 32.9414 24.6914 33.5 24 33.5C23.3086 33.5 22.75 32.9414 22.75 32.25V30.8867C22.7344 30.8828 22.7148 30.8828 22.6992 30.8789H22.6914C21.7383 30.7305 20.1719 30.3203 19.1172 29.8516C18.4883 29.5703 18.2031 28.832 18.4844 28.2031C18.7656 27.5742 19.5039 27.2891 20.1328 27.5703C20.9492 27.9336 22.293 28.293 23.0703 28.4141C24.3164 28.5977 25.3437 28.4922 26.0391 28.207C26.6992 27.9375 27 27.5469 27.0859 27.0781C27.1602 26.6641 27.1016 26.4258 27.0352 26.2812C26.9609 26.125 26.8164 25.9531 26.5273 25.7617C25.8867 25.3438 24.9062 25.0703 23.6367 24.7344L23.5273 24.707C22.4141 24.4102 21.0469 24.0469 20.0312 23.3828C19.4766 23.0195 18.957 22.5234 18.6328 21.8359C18.3047 21.1367 18.2383 20.3555 18.3945 19.5234C18.6758 18.0312 19.793 17.0625 21.0625 16.5586C21.582 16.3516 22.1523 16.2109 22.75 16.1289V14.75C22.75 14.0586 23.3086 13.5 24 13.5Z" fill="#16A34A"/>
</g>
<defs>
<clipPath id="clip0_38_4295">
<path d="M17.75 13.5H30.25V33.5H17.75V13.5Z" fill="white"/>
</clipPath>
</defs>
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
                  <th className="px-4 py-3">Product Details</th>
                  <th className="px-4 py-3">Category & Store</th>
                  <th className="px-4 py-3">Pricing</th>
                  <th className="px-4 py-3">Inventory</th>
                  <th className="px-4 py-3">Performance</th>
                  <th className="px-4 py-3">Status</th>
                   <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
  {products.map((product, i) => (
    <tr
      key={i}
      className="border-t border-[#E5E7EB] hover:bg-gray-50"
    >
      <td className="px-4 py-3 flex gap-3">
        <img
          src={product.image}
          alt={product.name}
          className="w-10 h-10 rounded-md object-cover"
        />
        <div>
          <p className="font-medium">{product.name}</p>
          <p className="text-xs text-gray-500">{product.sku}</p>
        </div>
      </td>
      <td className="px-4 py-3">
        <p className="font-medium">{product.category}</p>
        <p className="text-xs text-gray-500">{product.store}</p>
      </td>
      <td className="px-4 py-3">
        <p className="font-medium">{product.price}</p>
        <p className="text-xs text-green-600">{product.discount}</p>
      </td>
      <td className="px-4 py-3">
        <p
          className={`font-medium ${
            product.lowStock ? "text-red-600" : "text-gray-700"
          }`}
        >
          {product.stock}
        </p>
      </td>
      <td className="px-4 py-3">
        <p className="text-xs text-gray-500">{product.sold}</p>
        <p className="text-sm font-medium text-green-600">
          {product.revenue}
        </p>
      </td>
      <td className="px-4 py-3">
        <span
          className={`rounded px-2 py-1 text-xs font-medium ${
            product.status === "Active"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {product.status}
        </span>
      </td>
      <td className="px-4 py-3 flex gap-3">
        <svg width="19" height="14" viewBox="0 0 19 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9.45314 0C6.92814 0 4.90626 1.15 3.43439 2.51875C1.97189 3.875 0.993762 5.5 0.531262 6.61562C0.428137 6.8625 0.428137 7.1375 0.531262 7.38437C0.993762 8.5 1.97189 10.125 3.43439 11.4812C4.90626 12.85 6.92814 14 9.45314 14C11.9781 14 14 12.85 15.4719 11.4812C16.9344 10.1219 17.9125 8.5 18.3781 7.38437C18.4813 7.1375 18.4813 6.8625 18.3781 6.61562C17.9125 5.5 16.9344 3.875 15.4719 2.51875C14 1.15 11.9781 0 9.45314 0ZM4.95314 7C4.95314 5.80653 5.42724 4.66193 6.27116 3.81802C7.11507 2.97411 8.25966 2.5 9.45314 2.5C10.6466 2.5 11.7912 2.97411 12.6351 3.81802C13.479 4.66193 13.9531 5.80653 13.9531 7C13.9531 8.19347 13.479 9.33807 12.6351 10.182C11.7912 11.0259 10.6466 11.5 9.45314 11.5C8.25966 11.5 7.11507 11.0259 6.27116 10.182C5.42724 9.33807 4.95314 8.19347 4.95314 7ZM9.45314 5C9.45314 6.10313 8.55626 7 7.45314 7C7.23126 7 7.01876 6.9625 6.81876 6.89687C6.64689 6.84062 6.44689 6.94688 6.45314 7.12813C6.46251 7.34375 6.49376 7.55937 6.55314 7.775C6.98126 9.375 8.62814 10.325 10.2281 9.89688C11.8281 9.46875 12.7781 7.82188 12.35 6.22188C12.0031 4.925 10.8563 4.05312 9.58126 4C9.40001 3.99375 9.29376 4.19062 9.35001 4.36562C9.41564 4.56562 9.45314 4.77812 9.45314 5Z" fill="#9CA3AF"/>
</svg>

        <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15.1906 0.67832C14.5063 -0.0060547 13.4 -0.0060547 12.7156 0.67832L11.775 1.61582L14.8344 4.6752L15.775 3.73457C16.4594 3.0502 16.4594 1.94395 15.775 1.25957L15.1906 0.67832ZM5.84062 7.55332C5.65 7.74395 5.50312 7.97832 5.41875 8.2377L4.49375 11.0127C4.40313 11.2814 4.475 11.5783 4.675 11.7814C4.875 11.9846 5.17188 12.0533 5.44375 11.9627L8.21875 11.0377C8.475 10.9533 8.70937 10.8064 8.90312 10.6158L14.1313 5.38457L11.0688 2.32207L5.84062 7.55332ZM3.45312 2.0002C1.79688 2.0002 0.453125 3.34395 0.453125 5.0002V13.0002C0.453125 14.6564 1.79688 16.0002 3.45312 16.0002H11.4531C13.1094 16.0002 14.4531 14.6564 14.4531 13.0002V10.0002C14.4531 9.44707 14.0063 9.0002 13.4531 9.0002C12.9 9.0002 12.4531 9.44707 12.4531 10.0002V13.0002C12.4531 13.5533 12.0063 14.0002 11.4531 14.0002H3.45312C2.9 14.0002 2.45312 13.5533 2.45312 13.0002V5.0002C2.45312 4.44707 2.9 4.0002 3.45312 4.0002H6.45312C7.00625 4.0002 7.45312 3.55332 7.45312 3.0002C7.45312 2.44707 7.00625 2.0002 6.45312 2.0002H3.45312Z" fill="#9CA3AF"/>
</svg>
<svg width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4.67812 0.553125L4.45312 1H1.45312C0.9 1 0.453125 1.44687 0.453125 2C0.453125 2.55312 0.9 3 1.45312 3H13.4531C14.0063 3 14.4531 2.55312 14.4531 2C14.4531 1.44687 14.0063 1 13.4531 1H10.4531L10.2281 0.553125C10.0594 0.2125 9.7125 0 9.33438 0H5.57188C5.19375 0 4.84687 0.2125 4.67812 0.553125ZM13.4531 4H1.45312L2.11563 14.5938C2.16562 15.3844 2.82188 16 3.6125 16H11.2937C12.0844 16 12.7406 15.3844 12.7906 14.5938L13.4531 4Z" fill="#9CA3AF"/>
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
