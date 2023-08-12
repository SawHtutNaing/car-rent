import { Routes, Route } from "react-router-dom";
import UserRoutes from "./users";
import AdminRoutes from "./admin";
import ResetForm from "../components/authmodal/ResetForm";
import Test from "../../test";




export default function RouterConfig() {
  return (
    <Routes>
      <Route path="/*" element={<UserRoutes />} />
      <Route path="/reset" element={<ResetForm />} />

      <Route path="/admin/*" element={<AdminRoutes />} />
      <Route path="/test/*" element={<Test />} ></Route>

    </Routes>
  );
}
