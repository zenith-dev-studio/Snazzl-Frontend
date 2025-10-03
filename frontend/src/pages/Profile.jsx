import { useState } from "react";
import { Eye, EyeOff, Upload } from "lucide-react";
import { NavBar } from "../components/NavBar";

export default function EditProfile() {
  const [showPassword, setShowPassword] = useState(false);
  const [image, setImage] = useState(null);

  const handleImageUpload = (e) => {
    if (e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />

      <div className="p-8 bg-white rounded-4xl mt-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-xl font-semibold">Edit Profile</h1>
          <div className="flex gap-3">
            <button className="px-5 py-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-100">
              Cancel
            </button>
            <button className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Save
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl p-6 shadow-md">
            <h2 className="font-semibold mb-4">Your Photo</h2>
            <label
              htmlFor="file-upload"
              className="flex flex-col items-center justify-center h-40 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:bg-gray-50"
            >
              {image ? (
                <img
                  src={image}
                  alt="Profile"
                  className="h-28 w-28 object-cover rounded-full"
                />
              ) : (
                <>
                  <Upload className="h-8 w-8 text-gray-400" />
                  <p className="text-sm text-gray-500 mt-2">
                    Drop image here or click to upload
                  </p>
                </>
              )}
              <input
                id="file-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </label>
          </div>
          <div className="bg-white rounded-xl shadow-md p-8">
            <h2 className="font-semibold mb-4">Account Password</h2>
            <div className="space-y-4">
                 <label className="text-sm font-medium text-gray-700 ml-2">
                    User Name
                    </label>
              <input
                type="text"
                placeholder="User Name"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2"
              />
              <div className="relative">
                 <label className="text-sm font-medium text-gray-700 ml-2">
                    Password
                    </label>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2"
                />
                <button
                  type="button"
                  className="absolute right-3 top-10.5 text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 md:col-span-1">
            <h2 className="font-semibold mb-6">Admin Personal Data</h2>
            <div className="grid grid-cols-1 gap-6">
  <div className="flex flex-col">
    <label className="text-sm font-medium text-gray-700 mb-1 ml-1">Name</label>
    <input
      type="text"
      placeholder="Admin name"
      className="w-full border border-gray-300 rounded-lg px-3 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>

  <div className="flex flex-col">
    <label className="text-sm font-medium text-gray-700 mb-1 ml-1">Email</label>
    <input
      type="email"
      placeholder="Adminemail@.com"
      className="w-full border border-gray-300 rounded-lg px-3 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>

  <div className="flex flex-col">
    <label className="text-sm font-medium text-gray-700 mb-1 ml-1">Phone</label>
    <input
      type="tel"
      placeholder="+19 1234567890"
      className="w-full border border-gray-300 rounded-lg px-3 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
</div>

          </div>
        </div>
      </div>
    </div>
  );
}
