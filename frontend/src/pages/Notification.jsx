import { useState } from "react";
import { X } from "lucide-react";
import { NavBar } from "../components/NavBar";

export default function NotificationsPage() {
  const [selected, setSelected] = useState(null);

  const notifications = [
    {
      id: 1,
      name: "Elora Threads",
      product: "BloomFit Floral Maxi Dress",
      img: "https://randomuser.me/api/portraits/men/32.jpg",
      message: `We’re thrilled to let you know that our most loved "BloomFit Floral Maxi Dress" is finally back in stock!

This breezy beauty is crafted from 100% lightweight organic cotton, featuring delicate hand-printed floral patterns and a flattering A-line silhouette. With its flowy layers, airy feel, and elegant neckline, it's the perfect outfit for brunch dates, beach strolls, garden parties, or even a casual day out with friends.

🌿 Designed with love, BloomFit is more than just a dress – it’s a vibe! Feminine, free, and effortlessly stylish. Pair it with sandals and a sunhat for that perfect summer glow.`,
    },
    {
      id: 2,
      name: "Elora Threads",
      product: "BloomFit Floral Maxi Dress",
      img: "https://randomuser.me/api/portraits/men/45.jpg",
      message: "Another sample notification message...",
    },
    {
      id: 3,
      name: "Elora Threads",
      product: "BloomFit Floral Maxi Dress",
      img: "https://randomuser.me/api/portraits/men/51.jpg",
      message: "Yet another notification message here...",
    },
    {
      id: 1,
      name: "Elora Threads",
      product: "BloomFit Floral Maxi Dress",
      img: "https://randomuser.me/api/portraits/men/32.jpg",
      message: `We’re thrilled to let you know that our most loved "BloomFit Floral Maxi Dress" is finally back in stock!

This breezy beauty is crafted from 100% lightweight organic cotton, featuring delicate hand-printed floral patterns and a flattering A-line silhouette. With its flowy layers, airy feel, and elegant neckline, it's the perfect outfit for brunch dates, beach strolls, garden parties, or even a casual day out with friends.

🌿 Designed with love, BloomFit is more than just a dress – it’s a vibe! Feminine, free, and effortlessly stylish. Pair it with sandals and a sunhat for that perfect summer glow.`,
    },
    {
      id: 2,
      name: "Elora Threads",
      product: "BloomFit Floral Maxi Dress",
      img: "https://randomuser.me/api/portraits/men/45.jpg",
      message: "Another sample notification message...",
    },
    {
      id: 3,
      name: "Elora Threads",
      product: "BloomFit Floral Maxi Dress",
      img: "https://randomuser.me/api/portraits/men/51.jpg",
      message: "Yet another notification message here...",
    },
    {
      id: 2,
      name: "Elora Threads",
      product: "BloomFit Floral Maxi Dress",
      img: "https://randomuser.me/api/portraits/men/45.jpg",
      message: "Another sample notification message...",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar tab={"notification"} />
      <main className="p-6 bg-white mt-5 rounded-2xl max-w-[1400px] ml-8">
        <h2 className="text-xl font-semibold mb-4">Notifications</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="col-span-1 bg-white rounded-2xl shadow p-4">
            <h3 className="font-semibold mb-3">Product Orders</h3>
            <div className="flex flex-col gap-3">
              {notifications.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelected(item)}
                  className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer ${
                    selected?.id === item.id
                      ? "bg-blue-50 border border-blue-400"
                      : "hover:bg-gray-100 border border-transparent"
                  }`}
                >
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-gray-500">{item.product}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="col-span-2 bg-white rounded-2xl shadow p-6 relative">
            {selected ? (
              <>
                <div className="flex justify-between items-start">
                  <div className="flex gap-3">
                    <img
                      src={selected.img}
                      alt={selected.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold">{selected.name}</p>
                      <p className="text-sm text-gray-500">{selected.product}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelected(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X size={20} />
                  </button>
                </div>
                <div className="mt-4 whitespace-pre-line text-gray-700">
                  {selected.message}
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <span className="text-4xl"><svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1.66602 20V16.6667H4.99935V20H1.66602ZM34.9994 20V16.6667H38.3327V20H34.9994ZM1.66602 13.3334V10H4.99935V13.3334H1.66602ZM34.9994 13.3334V10H38.3327V13.3334H34.9994ZM1.66602 6.66671V3.33337H4.99935V6.66671H1.66602ZM8.33268 20V16.6667H11.666V20H8.33268ZM28.3327 20V16.6667H31.666V20H28.3327ZM34.9994 6.66671V3.33337H38.3327V6.66671H34.9994ZM8.33268 6.66671V3.33337H11.666V6.66671H8.33268ZM14.9993 6.66671V3.33337H18.3327V6.66671H14.9993ZM21.666 6.66671V3.33337H24.9993V6.66671H21.666ZM28.3327 6.66671V3.33337H31.666V6.66671H28.3327ZM19.7077 38.3334C19.041 38.3334 18.4021 38.2084 17.791 37.9584C17.1799 37.7084 16.6382 37.3473 16.166 36.875L7.66602 28.3334L9.04102 26.9167C9.4299 26.5278 9.90213 26.2639 10.4577 26.125C11.0132 25.9862 11.5688 25.9862 12.1243 26.125L14.9993 26.9584V13.3334C14.9993 12.8612 15.1591 12.4653 15.4785 12.1459C15.798 11.8264 16.1938 11.6667 16.666 11.6667C17.1382 11.6667 17.5341 11.8264 17.8535 12.1459C18.173 12.4653 18.3327 12.8612 18.3327 13.3334V31.375L14.2493 30.2084L18.541 34.5C18.7077 34.6667 18.8882 34.7917 19.0827 34.875C19.2771 34.9584 19.4855 35 19.7077 35H26.666C27.5827 35 28.3674 34.6737 29.0202 34.0209C29.673 33.3681 29.9993 32.5834 29.9993 31.6667V25C29.9993 24.5278 30.1591 24.132 30.4785 23.8125C30.798 23.4931 31.1938 23.3334 31.666 23.3334C32.1382 23.3334 32.5341 23.4931 32.8535 23.8125C33.173 24.132 33.3327 24.5278 33.3327 25V31.6667C33.3327 33.5 32.6799 35.0695 31.3743 36.375C30.0688 37.6806 28.4993 38.3334 26.666 38.3334H19.7077ZM19.9993 26.6667V20C19.9993 19.5278 20.1591 19.132 20.4785 18.8125C20.798 18.4931 21.1938 18.3334 21.666 18.3334C22.1382 18.3334 22.5341 18.4931 22.8535 18.8125C23.173 19.132 23.3327 19.5278 23.3327 20V26.6667H19.9993ZM24.9993 26.6667V21.6667C24.9993 21.1945 25.1591 20.7987 25.4785 20.4792C25.798 20.1598 26.1938 20 26.666 20C27.1382 20 27.5341 20.1598 27.8535 20.4792C28.173 20.7987 28.3327 21.1945 28.3327 21.6667V26.6667H24.9993Z" fill="#848484"/>
</svg>
</span>
                <p className="mt-2">Click on any notification to read</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
