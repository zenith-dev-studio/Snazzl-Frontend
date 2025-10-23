import { useUser } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";

export default function Redirecting() {
  const { user, isLoaded } = useUser();

  if (!isLoaded) return null;
  const role = user.publicMetadata?.role || "shop";

  return <Navigate to={role === "admin" ? "/admin" : "/shop"} replace />;
}
