"use client";
import React, { useState } from "react";
import axios from "axios";
import { ArrowLeft, ChevronDown, X, Map, Info, User, Settings, Store } from "lucide-react";
const Link = ({ to, children, className }) => (
  <a href={to} className={className}>
    {children}
  </a>
);

const FormSection = ({ icon, title, children }) => (
  <div className="bg-white p-6 rounded-lg shadow-sm">
    <div className="flex items-center mb-4">
      <div className="p-2 mr-3 bg-gray-100 rounded-full">{React.cloneElement(icon, { className: "h-6 w-6 text-gray-600" })}</div>
      <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
    </div>
    <div className="space-y-4">{children}</div>
  </div>
);

const InputField = ({ label, placeholder, type = "text", name, value, onChange }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#2563EB] focus:border-[#2563EB] sm:text-sm"
    />
  </div>
);

const SelectField = ({ label, options, name, value, onChange }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <div className="relative">
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full appearance-none px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white focus:outline-none focus:ring-[#2563EB] focus:border-[#2563EB] sm:text-sm"
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDown className="h-5 w-5 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
    </div>
  </div>
);

const TagsInput = ({ tags, setTags }) => {
  const [inputValue, setInputValue] = useState("");
  const handleKeyDown = e => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      e.preventDefault();
      if (!tags.includes(inputValue.trim().toLowerCase())) {
        setTags([...tags, inputValue.trim().toLowerCase()]);
      }
      setInputValue("");
    }
  };
  const removeTag = tagToRemove => setTags(tags.filter(tag => tag !== tagToRemove));
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
      <div className="w-full flex flex-wrap items-center px-3 py-2 border border-gray-300 rounded-md shadow-sm">
        {tags.map(tag => (
          <span
            key={tag}
            className="flex items-center bg-[#2563EB] text-white text-sm font-medium mr-2 mb-1 mt-1 px-2.5 py-0.5 rounded-full"
          >
            {tag}
            <button onClick={() => removeTag(tag)} className="ml-1.5 focus:outline-none">
              <X className="h-3 w-3" />
            </button>
          </span>
        ))}
        <input
          type="text"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type and press Enter to add tags"
          className="flex-grow bg-transparent focus:outline-none sm:text-sm placeholder-gray-400"
        />
      </div>
    </div>
  );
};

export default function AdminStoreAdd() {
  const initialFormState = {
    storeName: "",
    description: "",
    category: "Fashion",
    tags: [],
    address: {
      street: "",
      city: "",
      state: "",
      country: "",
      zip: ""
    },
    contact: {
      phone: "",
      email: ""
    },
    settings: {
      status: true, // This will be controlled by storeStatus
      storeType: "",
      businessType: ""
    },
    owner: {
      fullName: "",
      phone: "",
      email: ""
    },
    kycStatus: "Pending",
    storeStatus: "Active"
  };

  const [formState, setFormState] = useState(initialFormState);
  const [loading, setLoading] = useState(false);

  const handleInputChange = e => {
    const { name, value } = e.target;
    const keys = name.split(".");
    if (keys.length > 1) {
      setFormState(prev => ({
        ...prev,
        [keys[0]]: { ...prev[keys[0]], [keys[1]]: value }
      }));
    } else {
      if (name === "storeStatus") {
        setFormState(prev => ({
          ...prev,
          storeStatus: value,
          settings: { ...prev.settings, status: value === "Active" }
        }));
      } else {
        setFormState(prev => ({ ...prev, [name]: value }));
      }
    }
  };

  const handleTagsChange = newTags => setFormState(prev => ({ ...prev, tags: newTags }));

  const handleSubmit = async () => {
    if (!formState.storeName || !formState.owner.email) {
      alert("Store Name and Owner Email are required!");
      return;
    }
    const payload = {
      ...formState,
      partnerName: formState.owner.fullName,
      email: formState.owner.email,
      phone: formState.owner.phone,
      status: formState.storeStatus,
      role: 'Store Partner',
      joinedAt: new Date().toISOString(),
    };

    console.log("Submitting transformed payload:", payload);
    setLoading(true);
    try {
      const VITE_BASE_URL = "https://snazzl-backend-deploy.vercel.app";
      const res = await axios.post(
        `${VITE_BASE_URL}/api/store-partners/add`,
        payload,
        { headers: { "Content-Type": "application/json" } }
      );

      alert("Store added successfully!");
      console.log("API Response:", res.data);
      setFormState(initialFormState);
    } catch (err) {
      console.error("Error submitting form:", err);
      if (err.response) {
        alert(`Error: ${err.response.data.message || "An error occurred on the server."}`);
      } else if (err.request) {
        alert("Could not connect to the server. Please check your network connection.");
      } else {
        alert(`An error occurred: ${err.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <header className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <Link to="/admin/store" className="p-2 rounded-full hover:bg-gray-200 mr-2">
              <ArrowLeft className="h-5 w-5 text-gray-600" />
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Add New Store</h1>
          </div>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div className="space-y-8">
            <FormSection icon={<Store />} title="Store Information">
              <InputField label="Store Name" name="storeName" value={formState.storeName} onChange={handleInputChange} placeholder="e.g. Trendy Threads Boutique"/>
              <InputField label="Description" name="description" value={formState.description} onChange={handleInputChange} placeholder="A short description of the store"/>
              <SelectField
                label="Category"
                name="category"
                value={formState.category}
                onChange={handleInputChange}
                options={[
                  { value: "Fashion", label: "Fashion" },
                  { value: "Electronics", label: "Electronics" },
                  { value: "Groceries", label: "Groceries" },
                  { value: "Home Goods", label: "Home Goods" },
                  { value: "Other", label: "Other" }
                ]}
              />
              <TagsInput tags={formState.tags} setTags={handleTagsChange} />
            </FormSection>

            <FormSection icon={<Map />} title="Address & Contact">
              <InputField label="Street Address" name="address.street" value={formState.address.street} onChange={handleInputChange} placeholder="e.g. 123 Main St"/>
              <InputField label="City" name="address.city" value={formState.address.city} onChange={handleInputChange} placeholder="e.g. Jaipur"/>
              <InputField label="State / Province" name="address.state" value={formState.address.state} onChange={handleInputChange} placeholder="e.g. Rajasthan"/>
              <InputField label="Country" name="address.country" value={formState.address.country} onChange={handleInputChange} placeholder="e.g. India"/>
              <InputField label="ZIP / Postal Code" name="address.zip" value={formState.address.zip} onChange={handleInputChange} placeholder="e.g. 302017"/>
              <InputField label="Contact Phone" name="contact.phone" value={formState.contact.phone} onChange={handleInputChange} placeholder="+91-xxxxxxxxxx"/>
              <InputField label="Contact Email" name="contact.email" value={formState.contact.email} onChange={handleInputChange} placeholder="support@example.com"/>
            </FormSection>
          </div>
          <div className="space-y-8">
            <FormSection icon={<User />} title="Owner Details">
              <InputField label="Full Name" name="owner.fullName" value={formState.owner.fullName} onChange={handleInputChange} placeholder="e.g. Rahul Mehta"/>
              <InputField label="Phone" name="owner.phone" value={formState.owner.phone} onChange={handleInputChange} placeholder="+91-xxxxxxxxxx"/>
              <InputField label="Email" name="owner.email" value={formState.owner.email} onChange={handleInputChange} placeholder="owner@example.com"/>
            </FormSection>

            <FormSection icon={<Settings />} title="Store Settings">
              <SelectField
                label="Store Status"
                name="storeStatus"
                value={formState.storeStatus}
                onChange={handleInputChange}
                options={[
                  { value: "Active", label: "Active" },
                  { value: "Inactive", label: "Inactive" }
                ]}
              />
               <InputField label="Store Type" name="settings.storeType" value={formState.settings.storeType} onChange={handleInputChange} placeholder="e.g. Retail, Online"/>
              <InputField label="Business Type" name="settings.businessType" value={formState.settings.businessType} onChange={handleInputChange} placeholder="e.g. Clothing, Electronics"/>
              <SelectField
                label="KYC Status"
                name="kycStatus"
                value={formState.kycStatus}
                onChange={handleInputChange}
                options={[
                  { value: "Pending", label: "Pending" },
                  { value: "Verified", label: "Verified" },
                  { value: "Rejected", label: "Rejected" },
                ]}
              />
            </FormSection>
          </div>
        </main>

        <footer className="mt-8 flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => setFormState(initialFormState)}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`px-6 py-2 text-sm font-medium text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2563EB] ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-[#2563EB] hover:bg-[#1e4ca1]"
            }`}
          >
            {loading ? "Saving..." : "Save Store"}
          </button>
        </footer>
      </div>
    </div>
  );
}

