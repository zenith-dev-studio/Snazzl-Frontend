import { useState } from "react";
import { NavBar } from "../components/NavBar";

export default function SettingsPage() {
  const [selected, setSelected] = useState("account");
  const [notificationType, setNotificationType] = useState("sound");

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar tab="settings" />
      <main className="p-6 bg-white mt-5 rounded-2xl max-w-[1400px] ml-8">
        <h2 className="text-xl font-semibold mb-4">Settings</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="col-span-1 bg-white rounded-2xl shadow p-4">
            <h3 className="font-semibold mb-3">Additional Settings</h3>
            <div className="flex flex-col gap-3">
              <div
                onClick={() => setSelected("account")}
                className={`flex items-start gap-3 p-3 rounded-lg cursor-pointer ${
                  selected === "account"
                    ? "bg-blue-50 border border-[#2A85FF]"
                    : "hover:bg-gray-100 border border-transparent"
                }`}
              >
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-gray-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5.121 17.804A13.937 13.937 0 0112 15c2.21 0 4.29.534 6.121 1.476M15 10a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div>
                  <p
                    className={`font-medium ${
                      selected === "account" ? "text-[#2A85FF]" : "text-black"
                    }`}
                  >
                    Account
                  </p>
                  <p className="text-sm text-gray-500">Admin Data Settings</p>
                </div>
              </div>
              <div
                onClick={() => setSelected("notifications")}
                className={`flex items-start gap-3 p-3 rounded-lg cursor-pointer ${
                  selected === "notifications"
                    ? "bg-blue-50 border border-[#2A85FF]"
                    : "hover:bg-gray-100 border border-transparent"
                }`}
              >
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-gray-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 17h5l-1.405-1.405M19.5 12A7.5 7.5 0 1112 4.5a7.5 7.5 0 017.5 7.5z"
                    />
                  </svg>
                </div>
                <div>
                  <p
                    className={`font-medium ${
                      selected === "notifications"
                        ? "text-[#2A85FF]"
                        : "text-black"
                    }`}
                  >
                    Notifications
                  </p>
                  <p className="text-sm text-gray-500">Notification Settings</p>
                </div>
              </div>
              <div
                onClick={() => setSelected("logout")}
                className={`flex items-start gap-3 p-3 rounded-lg cursor-pointer ${
                  selected === "logout"
                    ? "bg-blue-50 border border-[#2A85FF]"
                    : "hover:bg-gray-100 border border-transparent"
                }`}
              >
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-gray-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7"
                    />
                  </svg>
                </div>
                <div>
                  <p
                    className={`font-medium ${
                      selected === "logout" ? "text-[#2A85FF]" : "text-black"
                    }`}
                  >
                    Logout
                  </p>
                  <p className="text-sm text-gray-500">Account Logout</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-2 bg-white rounded-2xl shadow p-6 relative">
            {selected === "account" && (
              <>
                <h3 className="text-lg font-semibold mb-6">Account</h3>
                <form className="space-y-5 max-w-md">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      User ID
                    </label>
                    <input
                      type="text"
                      value="User 1234"
                      disabled
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 bg-gray-100 text-gray-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Name
                    </label>
                    <input
                      type="text"
                      placeholder="User name"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 placeholder-gray-400"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      type="email"
                      placeholder="User123456@gmail.com"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 placeholder-gray-400"
                    />
                  </div>
                </form>
              </>
            )}

            {selected === "notifications" && (
              <div>
                <h3 className="text-lg font-semibold mb-6">Notification</h3>
                <div className="space-y-4">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="notification"
                      value="email"
                      checked={notificationType === "email"}
                      onChange={() => setNotificationType("email")}
                      className="mt-1 h-4 w-4 text-[#2A85FF] border-gray-300 focus:ring-[#2A85FF]"
                    />
                    <div>
                      <p className="font-medium">Email Notification</p>
                      <p className="text-sm text-gray-500">
                        You will be notified when a new email arrives.
                      </p>
                    </div>
                  </label>
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="notification"
                      value="sound"
                      checked={notificationType === "sound"}
                      onChange={() => setNotificationType("sound")}
                      className="mt-1 h-4 w-4 text-[#2A85FF] border-gray-300 focus:ring-[#2A85FF]"
                    />
                    <div>
                      <p className="font-medium">Sound Notification</p>
                      <p className="text-sm text-gray-500">
                        You will be notified with sound when you receive notification.
                      </p>
                    </div>
                  </label>
                </div>
              </div>
            )}

            {selected === "logout" && (
              <div>
                <h3 className="text-lg font-semibold">Logout</h3>
                <p className="text-gray-500 mt-1">Are you sure to logout</p>
                <div className="mt-6 border border-gray-200 rounded-xl p-6 max-w-sm">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gray-200"></div>
                    <p className="font-medium text-gray-800">Account Name</p>
                  </div>
                  <div className="flex gap-3 mt-6">
                    <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100">
                      Cancel
                    </button>
                    <button className="px-4 py-2 bg-[#2A85FF] text-white rounded-lg hover:bg-[#1A6EDD]">
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
