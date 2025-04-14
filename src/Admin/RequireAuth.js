import { Redirect } from "react-router-dom";

export default function RequireAuth({ children }) {
  const isLoggedIn = localStorage.getItem("admin_token");

  if (!isLoggedIn) {
    return <Redirect to="/admin/login" />;
  }

  return children;
}
