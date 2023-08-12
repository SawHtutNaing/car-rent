import { Route, Routes } from "react-router-dom";
import Admin from "../pages/admin";

import AdminLayOut from "../components/layouts/admin";
import UserList from "../pages/admin/UserList";
import OrderRequest from "../pages/admin/OrderRequest";
import CarList from "../pages/admin/CarList";

import ProtectedRoute from "../components/authmodal/ProtectedRoute";

import Booking from "../pages/admin/Booking";
import ServiceRequest from "../pages/admin/ServiceReqest";

import { useSelector } from "react-redux";
import EditCar from "../pages/admin/EditCar";
import { useEffect, useState } from "react";
import AadminLogin from "../components/authmodal/AdminLogin";
import Dashboard from "../pages/admin/Dashboard";

export default function AdminRoutes() {
  let { authed, isAdmin } = useSelector((state) => state.auth);
  const [isReady, setIsReady] = useState(false);


  useEffect(() => {


    //  asynchronous operation
    setTimeout(() => {
      setIsReady(true);
    }, 2000);


    return () => {

    };
  }, []);
  if (!isReady) {
    return <div>Loading...</div>;
  }

  return (
    <AdminLayOut>
      <Routes>
        <Route
          path="/profile"
          element={
            <ProtectedRoute
              hasAccess={authed && isAdmin}>
              <Admin />
            </ProtectedRoute>
          }
        />


        <Route
          path="/"
          element={
            <ProtectedRoute
              // hasAccess={authed && isAdmin}
              hasAccess={authed && isAdmin}
            >
              <Dashboard />
            </ProtectedRoute>
          }
        />


        <Route path="/login" element={<AadminLogin />}></Route>

        <Route
          path="/user-list"
          element={
            <ProtectedRoute
              hasAccess={authed && isAdmin}>

              <UserList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/booking-requests"
          element={
            <ProtectedRoute
              hasAccess={authed && isAdmin}>

              <OrderRequest />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cars-list"
          element={
            <ProtectedRoute
              hasAccess={authed && isAdmin}

            >
              <CarList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/bookings"
          element={
            <ProtectedRoute hasAccess={authed && isAdmin}>

              <Booking />
            </ProtectedRoute>
          }
        />
        <Route
          path="/service-requests"
          element={
            <ProtectedRoute hasAccess={authed && isAdmin}>

              <ServiceRequest />
            </ProtectedRoute>
          }
        />

        <Route
          path="/edit/:id"
          element={
            <ProtectedRoute hasAccess={authed && isAdmin}>

              <EditCar />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AdminLayOut>
  );
}
