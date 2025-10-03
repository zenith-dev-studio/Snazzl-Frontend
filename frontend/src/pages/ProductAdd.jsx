import { useState, useRef } from "react";
import { Upload, X } from "lucide-react";
import { NavBar } from "../components/NavBar";

export default function ProductsAdd() {
  const [tags, setTags] = useState([
    "Sneaker",
    "Shoes",
    "Footwear",
    "Mens",
    "Blue",
    "Fashion",
  ]);
  const [inputTag, setInputTag] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    color: "",
    category: "",
    size: "",
    subCategory: "",
    fit: "",
    price: "",
    fabric: "",
    sustainable: "",
    materialCare: "",
    details: ["", "", ""],
    description: "",
    images: [],
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

  const handleDetailChange = (i, value) => {
    const updated = [...formData.details];
    updated[i] = value;
    setFormData({ ...formData, details: updated });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData({ ...formData, images: files });
  };

  const handleSubmit = async () => {
    try {
      // Step 1: Add product without images
      const productRes = await fetch(
        "https://snazzl-backend.vercel.app/api/products/add",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...formData,
            images: [],
            tags: tags,
          }),
        }
      );

      const productData = await productRes.json();
      if (!productRes.ok) {
        alert("Failed to create product: " + productData.message);
        return;
      }

      const productId = productData._id || productData.id;
      if (!productId) {
        alert("Product created but no ID returned from backend");
        return;
      }

      // Step 2: Upload images
      if (formData.images.length > 0) {
        const fd = new FormData();
        formData.images.forEach((file) => fd.append("images", file));

        const imgRes = await fetch(
          `https://snazzl-backend.vercel.app/api/products/upload/images/${productId}`,
          {
            method: "POST",
            body: fd,
          }
        );

        if (!imgRes.ok) {
          alert("Product created, but image upload failed!");
          return;
        }
      }

      alert("Product and images added successfully!");
      setFormData({
        name: "",
        color: "",
        category: "",
        size: "",
        subCategory: "",
        fit: "",
        price: "",
        fabric: "",
        sustainable: "",
        materialCare: "",
        details: ["", "", ""],
        description: "",
        images: [],
      });
      setTags([]);
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
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
            <p className="mt-2 text-sm font-medium text-[#2A85FF]">
              Upload Image
            </p>
            <p className="mt-1 text-xs text-gray-500 text-center">
              Upload a cover image for your product.
              <br />
              File Format jpeg, png <br /> Recommended Size 600×600 (1:1)
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
              {
                label: "Product Name",
                field: "name",
                placeholder: "Black plain nike Shoes",
              },
              { label: "Product Color", field: "color", placeholder: "Black" },
              { label: "Category", field: "category", placeholder: "Mens" },
              { label: "Product Size", field: "size", placeholder: "Size 9" },
              {
                label: "Sub Category",
                field: "subCategory",
                placeholder: "Nike Shoes",
              },
              {
                label: "Product Fit",
                field: "fit",
                placeholder: "Regular Fit",
              },
              { label: "Price", field: "price", placeholder: "3999" },
              {
                label: "Product Fabric",
                field: "fabric",
                placeholder: "Leather",
              },
              {
                label: "Sustainable",
                field: "sustainable",
                placeholder: "Regular",
              },
              {
                label: "Material & Care",
                field: "materialCare",
                placeholder: "Cotton, Machine Wash",
              },
            ].map((field, i) => (
              <div key={i}>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  {field.label}
                </label>
                <input
                  type="text"
                  placeholder={field.placeholder}
                  value={formData[field.field]}
                  onChange={(e) => handleChange(e, field.field)}
                  className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-[#2A85FF] focus:ring-2 focus:ring-[#2A85FF] outline-none"
                />
              </div>
            ))}
          </div>

          <div className="mt-4 space-y-2">
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Product Details
            </label>
            {formData.details.map((detail, i) => (
              <input
                key={i}
                type="text"
                value={detail}
                onChange={(e) => handleDetailChange(i, e.target.value)}
                placeholder="Detail"
                className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-[#2A85FF] focus:ring-2 focus:ring-[#2A85FF] outline-none"
              />
            ))}
          </div>

          <div className="mt-4">
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Tags
            </label>
            <div className="flex flex-wrap gap-2 mb-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="flex items-center gap-1 rounded-full bg-blue-50 px-3 py-1 text-sm text-blue-600"
                >
                  {tag}
                  <button
                    onClick={() => removeTag(tag)}
                    className="ml-1 text-blue-400 hover:text-red-500"
                  >
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
                className="flex-1 rounded-md border border-gray-200 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-[#2A85FF] focus:ring-2 focus:ring-[#2A85FF] outline-none"
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
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleChange(e, "description")}
              placeholder="Enter product description"
              rows={4}
              className="w-full resize-none rounded-md border border-gray-200 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-[#2A85FF] focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
