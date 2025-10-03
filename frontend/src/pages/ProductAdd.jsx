import { useState, useRef } from "react";
import { Upload, X } from "lucide-react";
import { NavBar } from "../components/NavBar";

export default function ProductsAdd() {
  const [tags, setTags] = useState(["Sneaker", "Shoes", "Footwear"]);
  const [inputTag, setInputTag] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    color: "",
    category: "",
    size: [""],
    subCategory: "",
    fit: "",
    price: [0],
    fabric: "",
    sustainable: "",
    materialCare: "",
    availability: ["Available"],
    details: ["", "", ""],
    description: "",
    images: [],
    quantity: [1],
  });
  const fileInputRef = useRef(null);

  const addTag = (e) => {
    e.preventDefault();
    if (inputTag.trim() && !tags.includes(inputTag.trim())) {
      setTags([...tags, inputTag.trim()]);
    }
    setInputTag("");
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleChange = (e, field) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleArrayChange = (field, index, value) => {
    const updated = [...formData[field]];
    updated[index] = value;
    setFormData({ ...formData, [field]: updated });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData({ ...formData, images: files });
  };

  const handleSubmit = async () => {
    try {
      // 1️⃣ Add product first
      const payload = {
        ...formData,
        tags,
      };

      const res = await fetch("https://snazzl-backend.vercel.app/api/products/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to add product");

      const productId = data.result.productId; // Convex backend returns this

      // 2️⃣ Upload images separately
      if (formData.images.length) {
        const fd = new FormData();
        formData.images.forEach((file) => fd.append("images", file));

        const imgRes = await fetch(
          `https://snazzl-backend.vercel.app/api/products/upload/images/${productId}`,
          { method: "POST", body: fd }
        );

        if (!imgRes.ok) {
          const errData = await imgRes.json();
          throw new Error(errData.error || "Failed to upload images");
        }
      }

      alert("Product added successfully!");
      setFormData({
        name: "",
        color: "",
        category: "",
        size: [""],
        subCategory: "",
        fit: "",
        price: [0],
        fabric: "",
        sustainable: "",
        materialCare: "",
        availability: ["Available"],
        details: ["", "", ""],
        description: "",
        images: [],
        quantity: [1],
      });
      setTags([]);
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar tab={"product"} />
      <div className="flex items-center justify-between bg-white px-6 py-4 mt-5 rounded-4xl shadow">
        <h1 className="text-lg font-semibold">Add Products</h1>
        <button
          onClick={handleSubmit}
          className="rounded-full bg-[#2A85FF] px-5 py-2 text-sm font-medium text-white shadow hover:bg-blue-700"
        >
          Publish
        </button>
      </div>

      <div className="mx-auto mt-6 grid max-w-7xl grid-cols-1 gap-6 px-6 lg:grid-cols-3">
        <div className="rounded-xl shadow-md bg-white p-4 h-[550px] pt-5">
          <div
            className="flex h-64 flex-col items-center justify-center rounded-xl bg-[#F2F2F2] cursor-pointer"
            onClick={() => fileInputRef.current.click()}
          >
            <Upload className="h-10 w-10 text-[#2A85FF]" />
            <p className="mt-2 text-sm font-medium text-[#2A85FF]">Upload Image</p>
            <p className="mt-1 text-xs text-gray-500 text-center">
              Upload cover images. jpeg/png, recommended 600×600.
            </p>
            <input
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              ref={fileInputRef}
              onChange={handleFileChange}
            />
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {formData.images.map((file, i) => (
              <div key={i} className="relative">
                <img
                  src={URL.createObjectURL(file)}
                  alt="preview"
                  className="h-20 w-20 rounded object-cover border"
                />
                <button
                  className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow"
                  onClick={() =>
                    setFormData({
                      ...formData,
                      images: formData.images.filter((_, idx) => idx !== i),
                    })
                  }
                >
                  <X size={14} className="text-red-500" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl bg-white p-6 lg:col-span-2 shadow-md pt-5">
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Product Name", field: "name" },
              { label: "Color", field: "color" },
              { label: "Category", field: "category" },
              { label: "Sub Category", field: "subCategory" },
              { label: "Fit", field: "fit" },
              { label: "Fabric", field: "fabric" },
              { label: "Sustainable", field: "sustainable" },
              { label: "Material & Care", field: "materialCare" },
            ].map((item) => (
              <div key={item.field}>
                <label className="mb-1 block text-sm font-medium text-gray-700">{item.label}</label>
                <input
                  type="text"
                  value={formData[item.field]}
                  onChange={(e) => handleChange(e, item.field)}
                  className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm text-gray-900 focus:border-[#2A85FF] focus:ring-2 focus:ring-[#2A85FF] outline-none"
                />
              </div>
            ))}
          </div>

          <div className="mt-4 space-y-2">
            <label className="mb-1 block text-sm font-medium text-gray-700">Product Details</label>
            {formData.details.map((detail, i) => (
              <input
                key={i}
                type="text"
                value={detail}
                onChange={(e) => handleArrayChange("details", i, e.target.value)}
                placeholder={`Detail ${i + 1}`}
                className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm text-gray-900 focus:border-[#2A85FF] focus:ring-2 focus:ring-[#2A85FF] outline-none"
              />
            ))}
          </div>

          <div className="mt-4">
            <label className="mb-2 block text-sm font-medium text-gray-700">Tags</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="flex items-center gap-1 rounded-full bg-blue-50 px-3 py-1 text-sm text-blue-600"
                >
                  {tag}
                  <button onClick={() => removeTag(tag)} className="ml-1 text-blue-400 hover:text-red-500">
                    <X size={14} />
                  </button>
                </span>
              ))}
            </div>
            <form onSubmit={addTag} className="flex gap-2">
              <input
                type="text"
                value={inputTag}
                onChange={(e) => setInputTag(e.target.value)}
                placeholder="Add a tag"
                className="flex-1 rounded-md border border-gray-200 px-3 py-2 text-sm text-gray-900 focus:border-[#2A85FF] focus:ring-2 focus:ring-[#2A85FF] outline-none"
              />
              <button
                type="submit"
                className="rounded-md bg-[#2A85FF] px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
              >
                Add
              </button>
            </form>
          </div>

          <div className="mt-4">
            <label className="mb-1 block text-sm font-medium text-gray-700">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => handleChange(e, "description")}
              rows={4}
              className="w-full resize-none rounded-md border border-gray-200 px-3 py-2 text-sm text-gray-900 focus:border-[#2A85FF] focus:ring-2 focus:ring-[#2A85FF] outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
