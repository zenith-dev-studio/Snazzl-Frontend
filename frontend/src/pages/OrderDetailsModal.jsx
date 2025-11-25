import { X, ShoppingBag, MapPin, DollarSign, Package, Eye } from "lucide-react";

const OrderDetailsModal = ({ order, onClose }) => {
  if (!order) return null;

  const totalItems = order.items.reduce((sum, item) => sum + item.quantity, 0);

  const formatCurrency = (price) =>
    `₹${price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;

  const totalAmount = order.total || order.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div 
      className="fixed inset-0 bg-transparent backdrop-blur-[2px] flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[75vh] overflow-y-auto transform transition-all duration-300 scale-100"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center z-10">
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <Package className="h-6 w-6 text-[#2A85FF]" />
            Order Details (<span className="text-sm font-medium text-gray-500">Order ID: {order._id}</span>)
          </h2>
          <button 
            onClick={onClose}
            className="p-1 rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-700"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          
          {/* --- Order Summary --- */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div>
                <p className="text-xs font-medium text-gray-500">Status</p>
                <p className={`font-semibold ${order.orderStatus === 'Pending' ? 'text-yellow-600' : 'text-green-600'}`}>{order.orderStatus}</p>
            </div>
            <div>
                <p className="text-xs font-medium text-gray-500">Total Price</p>
                <p className="font-semibold text-xl text-green-700">{formatCurrency(totalAmount)}</p>
            </div>
            <div>
                <p className="text-xs font-medium text-gray-500">Total Items</p>
                <p className="font-semibold">{totalItems}</p>
            </div>
            <div>
                <p className="text-xs font-medium text-gray-500">Customer</p>
                <p className="font-semibold text-gray-700">{order.user?.name || 'N/A'}</p>
            </div>
          </div>
          
          {/* --- Shipping Address --- */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
                <MapPin className="h-5 w-5 text-red-500"/> Shipping Address
            </h3>
            <div className="p-3 border rounded-lg text-sm text-gray-600 bg-white">
                <p className="font-medium text-gray-800">{order.user?.name || 'N/A'}</p>
                <p>{order.address?.street}, {order.address?.city}</p>
                <p>{order.address?.state}, {order.address?.zip} - {order.address?.country}</p>
                <p>Phone: {order.user?.phone || 'N/A'}</p>
            </div>
          </div>

          {/* --- Items List --- */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
                <ShoppingBag className="h-5 w-5 text-blue-500"/> Ordered Products ({order.items.length})
            </h3>
            <div className="border rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Product Name</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Size</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Color</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Qty</th>
                            <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">Price</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {order.items.map((item, idx) => (
                            <tr key={idx} className="hover:bg-blue-50/50">
                                <td className="px-4 py-2 text-sm font-medium text-gray-900">{item.name}</td>
                                <td className="px-4 py-2 text-sm text-gray-700">{item.size || 'N/A'}</td>
                                <td className="px-4 py-2 text-sm text-gray-700">{item.color || 'N/A'}</td>
                                <td className="px-4 py-2 text-sm text-gray-700">{item.quantity}</td>
                                <td className="px-4 py-2 text-sm text-right font-semibold text-gray-800">{formatCurrency(item.price * item.quantity)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
          </div>
          
        </div>

        <div className="p-4 border-t flex justify-end">
            <button 
                onClick={onClose} 
                className="px-4 py-2 text-sm font-medium text-white bg-[#2A85FF] rounded-md hover:bg-[#1f6acd] transition"
            >
                Done
            </button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsModal;