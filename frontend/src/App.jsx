import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";

import ProductDashboard from "./pages/Products";
import ProductAdd from "./pages/ProductAdd";
import OrdersPage from "./pages/Orders";
import CustomersTable from "./pages/Customer";
import EditProfile from "./pages/Profile";
import NotificationsPage from "./pages/Notification";
import AccountPage from "./pages/Account";
import Overview from "./pages/Overview";
import AdminDashboard from "./pages/AdminDashboard";
import AdminOrder from "./pages/AdminOrders";
import AdminOrderPage from "./pages/AdminOrder";
import AdminStore from "./pages/AdminStores";
import AdminCustomers from "./pages/AdminCustomers";
import AdminDelivery from "./pages/AdminDelivery";
import AdminProducts from "./pages/AdminProducts";
import AdminStoreAdd from "./pages/AdminStoreAdd";


export default function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/shop/products"
          element={
              <ProductDashboard />
          }
        />

        <Route
  path="/shop/orders"
  element={
       <OrdersPage/>
  }
/>
      <Route
  path="/shop/customers"
  element={
        <CustomersTable/>
  }
/>
<Route
  path="/shop/profile"
  element={
    <EditProfile/>
  }
/>
<Route
  path="/shop/notifications"
  element={
    <NotificationsPage/>
  }
/>
<Route
  path="/shop/settings"
  element={
    <AccountPage/>
  }
/>
<Route
  path="/shop/"
  element={
    <Overview/>
  }
/>
<Route
  path="/shop/products/add"
  element={
    <ProductAdd/>
  }
/>
<Route
  path="/admin/"
  element={
    <AdminDashboard/>
  }
/>
<Route
  path="/admin/orders"
  element={
    <AdminOrder/>
  }
/>
<Route
  path="/admin/order"
  element={
    <AdminOrderPage/>
  }
/>
<Route
  path="/admin/store"
  element={
    <AdminStore/>
  }
/>
<Route
  path="/admin/customers"
  element={
    <AdminCustomers/>
  }
/>
<Route
  path="/admin/delivery"
  element={
    <AdminDelivery/>
  }
/>
<Route
  path="/admin/products"
  element={
    <AdminProducts/>
  }
/>
       <Route
  path="/shop/products"
  element={<ProductDashboard/>}
/>
<Route
  path="/admin/store/add"
  element={
    <AdminStoreAdd/>
  }
/>
      </Routes>
    </Router>
  );
}
