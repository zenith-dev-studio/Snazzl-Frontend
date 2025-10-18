import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { Upload, X } from "lucide-react";
import { NavBar } from "../components/NavBar";

// Default Product Data for Testing
const defaultProductData = {
  name: "",
  color: "",
  category: "",
  subCategory: "",
  fit: "",
  fabric: "",
  sustainable: "",
  materialCare: "",
  details: "",
  description: "",
  size: [],
  price: [],
  quantity: [],
  availability: [],
  status: "Active",
};

const defaultTags = [];

export default function ProductsAdd() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false); 
  const [tags, setTags] = useState(defaultTags);
  const [inputTag, setInputTag] = useState("");
  const [formData, setFormData] = useState({
    ...defaultProductData,
    storeId: "k57atqdhfsczhpcv1mfm36xym57s2b70", // Hardcoded storeId, Please use clerk id whenever you integrate the clerk portion on the store part, else I have done for you :)
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
    setTags(tags.filter((t) => t !== tagToRemove));
  };

  const handleChange = (e, field) => {
    let { value } = e.target;
    let newFormData = { ...formData };

    if (["size", "price", "quantity", "availability"].includes(field)) {
        const valueArray = value.split(",").map((v) => v.trim()).filter(Boolean);
        
        if (field === "size") {
            newFormData.size = valueArray;
            const sizeCount = valueArray.length;
            const safeSlice = (arr) => arr.slice(0, sizeCount);
            newFormData.price = safeSlice(newFormData.price);
            newFormData.quantity = safeSlice(newFormData.quantity);
            newFormData.availability = safeSlice(newFormData.availability);
            while (newFormData.price.length < sizeCount) newFormData.price.push('');
            while (newFormData.quantity.length < sizeCount) newFormData.quantity.push('');
            while (newFormData.availability.length < sizeCount) newFormData.availability.push('Available');
        } else if (field === "price" || field === "quantity") {
            newFormData[field] = valueArray.map(v => isNaN(Number(v)) ? 0 : Number(v));
        } else {
            newFormData[field] = valueArray;
        }
    } else {
        newFormData[field] = value;
    }
    
    setFormData(newFormData);
  };


  const handleFileChange = (e) => {
    setFormData({ ...formData, images: [...formData.images, ...Array.from(e.target.files)] });
  };
  
  const removeImage = (indexToRemove) => {
    setFormData({ ...formData, images: formData.images.filter((_, index) => index !== indexToRemove) });
  };


  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const fd = new FormData();
      const arrayFields = ["size", "price", "availability", "quantity"];

      Object.keys(formData).forEach((key) => {
        if (key === "images") {
          formData.images.forEach((file) => fd.append("images", file));
        } else if (arrayFields.includes(key)) {
          fd.append(key, JSON.stringify(formData[key]));
        } else {
          fd.append(key, formData[key]);
        }
      });
      
      fd.append("tags", JSON.stringify(tags));

      const res = await fetch(
        import.meta.env.VITE_BASE_URL + "/api/products/addProductWithImages",
        { method: "POST", body: fd }
      );

      const data = await res.json();
      
      if (res.ok) {
        alert("Product added successfully!");
        navigate("/shop/products"); // Redirect on success
      } else {
        console.error("Server responded with an error:", data);
        alert(`Failed to add product: ${data.error || data.message || 'Unknown server error'}`);
      }
    } catch (err) {
      console.error("Submission error:", err);
      alert("Something went wrong. Please check the console for details.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const formFields = [
    { label: "Product Name", field: "name", placeholder: "e.g., Aviator Leather Jacket" },
    { label: "Product Color", field: "color", placeholder: "e.g., Blue" },
    { label: "Category", field: "category", placeholder: "e.g., Men" },
    { label: "Sub Category", field: "subCategory", placeholder: "e.g., Aviator Leather Jacket" },
    { label: "Product Size", field: "size", placeholder: "S, M, L (comma-separated)" },
    { label: "Price", field: "price", placeholder: "3715, 3915, 4115 (for each size)" },
    { label: "Quantity", field: "quantity", placeholder: "30, 73, 65 (for each size)" },
    { label: "Availability", field: "availability", placeholder: "Available, Not Available" },
    { label: "Product Fit", field: "fit", placeholder: "e.g., Slim" },
    { label: "Product Fabric", field: "fabric", placeholder: "e.g., Wool Blend" },
    { label: "Sustainable", field: "sustainable", placeholder: "e.g., No" },
    { label: "Material & Care", field: "materialCare", placeholder: "e.g., Machine wash cold" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar tab={"product"} />
      <div className="flex items-center justify-between bg-white px-6 py-4 mt-5 rounded-4xl shadow mx-auto max-w-7xl">
        <h1 className="text-lg font-semibold">Add Products</h1>
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="rounded-full bg-[#2A85FF] px-5 py-2 text-sm font-medium text-white shadow hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Publishing..." : "Publish"}
        </button>
      </div>

      <div className="mx-auto mt-6 grid max-w-7xl grid-cols-1 gap-6 px-6 lg:grid-cols-3">
        {/* Image Upload Section */}
        <div className="space-y-4 lg:col-span-1">
            <div className="rounded-xl shadow-md bg-white p-4">
                <div
                    className="flex h-64 flex-col items-center justify-center rounded-xl bg-[#F2F2F2] cursor-pointer border-2 border-dashed border-gray-300 hover:border-blue-500 transition-all"
                    onClick={() => fileInputRef.current && fileInputRef.current.click()}
                >
                    <Upload className="h-10 w-10 text-[#2A85FF]" />
                    <p className="mt-2 text-sm font-medium text-[#2A85FF]">Click to Upload Images</p>
                    <p className="mt-1 text-xs text-gray-500 text-center px-2">
                        File Format: jpeg, png. Recommended Size: 600×600 (1:1)
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
            </div>
            {formData.images.length > 0 && (
                <div className="rounded-xl shadow-md bg-white p-4">
                    <h3 className="text-sm font-medium text-gray-700 mb-3">Image Previews</h3>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                        {formData.images.map((file, i) => (
                            <div key={i} className="relative aspect-square">
                                <img
                                    src={URL.createObjectURL(file)}
                                    alt={`preview ${i}`}
                                    className="h-full w-full rounded-md object-cover border"
                                />
                                <button
                                    className="absolute -top-2 -right-2 bg-white rounded-full p-0.5 shadow-lg border"
                                    onClick={() => removeImage(i)}
                                >
                                    <X size={14} className="text-red-500 hover:text-red-700" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>


        {/* Product Details Form */}
        <div className="rounded-xl bg-white p-6 lg:col-span-2 shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {formFields.map((f) => (
              <div key={f.field}>
                <label className="mb-1 block text-sm font-medium text-gray-700">{f.label}</label>
                <input
                  type="text"
                  placeholder={f.placeholder}
                  value={Array.isArray(formData[f.field]) ? formData[f.field].join(", ") : formData[f.field]}
                  onChange={(e) => handleChange(e, f.field)}
                  className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-[#2A85FF] focus:ring-2 focus:ring-[#2A85FF] outline-none"
                />
              </div>
            ))}
          </div>
          
          <div className="mt-4">
            <label className="mb-1 block text-sm font-medium text-gray-700">Product Details</label>
            <textarea
              value={formData.details}
              onChange={(e) => handleChange(e, 'details')}
              placeholder="e.g., Slim fit aviator leather jacket crafted with attention to comfort and durability."
              rows={3}
              className="w-full resize-none rounded-md border border-gray-200 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-[#2A85FF] focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div className="mt-4">
            <label className="mb-1 block text-sm font-medium text-gray-700">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => handleChange(e, 'description')}
              placeholder="e.g., Stylish aviator leather jacket made from premium wool blend, perfect for modern men."
              rows={4}
              className="w-full resize-none rounded-md border border-gray-200 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-[#2A85FF] focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div className="mt-4">
            <label className="mb-2 block text-sm font-medium text-gray-700">Tags</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {tags.map((tag) => (
                <span key={tag} className="flex items-center gap-1 rounded-full bg-blue-50 px-3 py-1 text-sm text-blue-600">
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
                placeholder="Add a tag and press enter"
                className="flex-1 rounded-md border border-gray-200 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-[#2A85FF] focus:ring-2 focus:ring-[#2A85FF] outline-none"
              />
              <button type="submit" className="rounded-md bg-[#2A85FF] px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
                Add
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}