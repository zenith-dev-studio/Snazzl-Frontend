import { useEffect, useRef, useState } from "react";
import { Search, ChevronDown, Plus, ArrowUpRight } from "lucide-react";
import { NavBar } from "../components/NavBar";
import { Link } from "react-router-dom";

const categories = [
  "All Products",
  "Most Purchased",
  "Apparel",
  "Shoes",
  "Electronics",
  "Beauty",
  "Fashion",
  "Appliances",
];

const timeFilters = ["Past 14 days", "Past 28 days", "Past 90 days", "Past 365 days"];

function TimeFilterPopover({ open, value, onChange, onClose, anchorClass = "" }) {
  const ref = useRef(null);

  useEffect(() => {
    function onDoc(e) {
      if (ref.current && !ref.current.contains(e.target)) onClose?.();
    }
    if (open) document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div
      ref={ref}
      className={`absolute z-20 mt-2 w-64 rounded-xl border bg-white shadow-lg ${anchorClass}`}
    >
      <div className="p-2">
        {timeFilters.map((t) => {
          const checked = t === value;
          return (
            <button
              key={t}
              onClick={() => onChange(t)}
              className="w-full flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-gray-50 text-left"
            >
              <span
                className={`h-4 w-4 rounded-full border ${
                  checked ? "border-[#2A85FF] ring-4 ring-blue-100" : "border-gray-300"
                } relative`}
              >
                {checked && <span className="absolute inset-[3px] rounded-full bg-[#2A85FF]" />}
              </span>
              <span className={`text-sm ${checked ? "font-medium" : "text-gray-700"}`}>{t}</span>
            </button>
          );
        })}
      </div>
      <div className="flex items-center justify-between border-t px-3 py-2">
        <button
          onClick={() => onChange("Past 28 days")}
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          Reset
        </button>
        <button onClick={onClose} className="text-sm font-medium text-[#2A85FF]">
          Show Result
        </button>
      </div>
    </div>
  );
}

export default function ProductDashboard() {
  const [activeCategory, setActiveCategory] = useState("All Products");
  const [timeOpen, setTimeOpen] = useState(false);
  const [timeLabel, setTimeLabel] = useState("Past 28 days");
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch(import.meta.env.VITE_BASE_URL + "/api/products/get/all");
        const data = await res.json();
        setAllProducts(data);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const products =
    activeCategory === "All Products"
      ? allProducts
      : allProducts.filter((p) => p.category === activeCategory);

  return (
    <div className="min-h-screen">
      <NavBar tab={"product"} />
      <main className="px-6 py-5 mt-4 bg-white rounded-4xl">
        <div className="flex justify-between">
          <h1 className="text-2xl font-semibold">Products</h1>
          <div className="flex gap-6">
            <div className="relative">
              <input
                placeholder="Search"
                className="h-10 w-64 rounded-full border bg-white pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            </div>
            <Link
              to={"/shop/products/add"}
              className="inline-flex items-center gap-2 rounded-full bg-[#2A85FF] px-10 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700"
            >
              Add <Plus className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between gap-4">
          <div className="flex gap-3 overflow-x-auto pb-1">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setActiveCategory(c)}
                className={`whitespace-nowrap rounded-full px-4 py-2 text-sm ${
                  activeCategory === c
                    ? "bg-[#2A85FF] text-white"
                    : "text-gray-700  hover:bg-gray-50"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="mt-5 flex items-center gap-3">
              <button className="inline-flex items-center justify-between gap-2 rounded-lg border border-gray-100 bg-white px-4 py-2 text-sm">
                Out Of Stock <ChevronDown className="h-4 w-4 text-gray-500" />
              </button>

              <div className="relative">
                <button
                  onClick={() => setTimeOpen((s) => !s)}
                  className="inline-flex items-center justify-between gap-2 rounded-lg border border-gray-100 bg-white px-4 py-2 text-sm"
                >
                  Last week <ChevronDown className="h-4 w-4 text-gray-500" />
                </button>

                <TimeFilterPopover
                  open={timeOpen}
                  value={timeLabel}
                  onChange={(v) => setTimeLabel(v)}
                  onClose={() => setTimeOpen(false)}
                  anchorClass="right-0"
                />
              </div>
            </div>
          </div>
        </div>

        {loading ? (
          <p className="mt-6 text-center text-gray-500">Loading products...</p>
        ) : products.length === 0 ? (
          <p className="mt-6 text-center text-gray-500">No products in this category.</p>
        ) : (
          <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {products.map((p, i) => (
              <article
                key={p._id || i}
                className="group relative rounded-2xl bg-white p-3 shadow-sm transition hover:shadow-md"
              >
                <div className="relative overflow-hidden rounded-xl">
                  <img
                    src={p.images?.[0]?.url || "/Tshirt.png"}
                    alt={p.name}
                    className="h-40 w-full object-cover"
                  />
                </div>

                <div className="mt-3">
                  <h3 className="text-sm font-medium text-gray-900">{p.name}</h3>

                  <div className="mt-1 flex items-center gap-2">
                    <span className="text-base font-semibold">
                      ₹{p.price?.[0] || "N/A"}
                    </span>
                    <button
                      aria-label="Open"
                      className="ml-auto inline-flex h-11 w-11 items-center justify-center 
                                 rounded-full bg-[#2A85FF] text-white shadow-sm 
                                 opacity-0 group-hover:opacity-100 transition"
                    >
                      <ArrowUpRight className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="mt-1 text-xs text-gray-600">
                    Stock:{" "}
                    <span className="font-medium text-gray-900">
                      {p.quantity?.reduce((a, b) => a + b, 0) || 0}
                    </span>
                    <span className="mx-1">·</span>
                    Status:{" "}
                    <span className="font-medium text-gray-900">{p.status}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
