import { useUser } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";

export default function RoleProtectedRoute({ children, allowedRoles }) {
  const { user, isLoaded } = useUser();

  if (!isLoaded) return null;
  if (!user) return <Navigate to="/signin" replace />;

  const role = user.publicMetadata?.role || "shop";

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/signin" replace />;
  }

  return children;
}
