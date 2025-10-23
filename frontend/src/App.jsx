import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { SignedIn, SignedOut, SignIn } from "@clerk/clerk-react";
import RoleProtectedRoute from "./components/RoleProtectedRoute";

import ProductDashboard from "./pages/Products";
import ProductAdd from "./pages/ProductAdd";
import OrdersPage from "./pages/Orders";
import CustomersTable from "./pages/Customer";
import EditProfile from "./pages/Profile";
import NotificationsPage from "./pages/Notification";
import AccountPage from "./pages/Account";
import Overview from "./pages/Overview";
import AdminDashboard from "./pages/AdminDashboard";
import AdminOrders from "./pages/AdminOrders";
import AdminCustomers from "./pages/AdminCustomers";
import AdminStore from "./pages/AdminStores";
import AdminProducts from "./pages/AdminProducts";
import AdminDelivery from "./pages/AdminDelivery";
import AdminStoreAdd from "./pages/AdminStoreAdd";
import Redirecting from "./pages/Redirecting";


export default function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/signin"
          element={
            <SignedOut>
              <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="w-full max-w-md p-6">
                  <SignIn redirectUrl="/redirecting" />
                </div>
              </div>
            </SignedOut>
          }
        />
        <Route path="/redirecting" element={<Redirecting />} />
        <Route
          path="/shop/*"
          element={
            <RoleProtectedRoute allowedRoles={["shop"]}>
              <ShopRoutes />
            </RoleProtectedRoute>
          }
        />
        <Route
          path="/admin/*"
          element={
            <RoleProtectedRoute allowedRoles={["admin"]}>
              <AdminRoutes />
            </RoleProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/signin" replace />} />
      </Routes>
    </Router>
  );
}

function ShopRoutes() {
  return (
    <Routes>
      <Route path="products" element={<ProductDashboard />} />
      <Route path="products/add" element={<ProductAdd />} />
      <Route path="orders" element={<OrdersPage />} />
      <Route path="customers" element={<CustomersTable />} />
      <Route path="profile" element={<EditProfile />} />
      <Route path="notifications" element={<NotificationsPage />} />
      <Route path="settings" element={<AccountPage />} />
      <Route path="/" element={<Overview />} />
    </Routes>
  );
}

function AdminRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AdminDashboard />} />
      <Route path="orders" element={<AdminOrders />} />
      <Route path="customers" element={<AdminCustomers />} />
      <Route path="store" element={<AdminStore />} />
      <Route path="products" element={<AdminProducts />} />
      <Route path="delivery" element={<AdminDelivery/>} />
      <Route path="store/add" element={<AdminStoreAdd />} />
    </Routes>
  );
}
