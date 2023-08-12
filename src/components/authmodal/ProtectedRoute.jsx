import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  let { authed, isAdmin } = useSelector((state) => state.auth);
  if (!authed && !isAdmin) {
    return <Navigate to="/admin/login/" />;
  }
  return children;
};

export default ProtectedRoute;
