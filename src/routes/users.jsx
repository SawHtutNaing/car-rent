import { Route, Routes } from "react-router-dom";
import Home from "../pages/user";
import UserLayout from "../components/layouts/user/index.jsx";
import Cars from "../pages/user/Cars";
import Services from "../pages/user/Services";
import UserBooking from "../pages/user/UserBooking";
import ShowResult from "../components/user/searchbox/ShowResult";
import Profile from "../components/user/home/Profile";
import Thanks from "../components/user/Booking/Thanks";

export default function UserRoutes() {
  return (
    <UserLayout>
      <Routes>
        <Route path="/*" element={<Home />} />
        <Route path="/cars" element={<Cars />} />
        <Route path="/services" element={<Services />} />
        <Route path="/booking/:id" element={<UserBooking />} />
        <Route path="/usr-profile" element={<Profile />} />
        <Route path="/thanks" element={<Thanks />} />
        <Route path="/show-result" element={<ShowResult />} />
      </Routes>
    </UserLayout>
  );
}
