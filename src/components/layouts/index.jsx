import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";

import "react-toastify/dist/ReactToastify.css";
import ScrollToTop from "../shared/ScrollToTop";
import AuthModal from "../authmodal";
import { auth } from "../../firebase";
import useAuth from "../../hooks/useAuth";
import { setAuthedUser } from "../../store/authSlice";
import LogoutModal from "../authmodal/LogoutModal";

export default function Layout(props) {
  const dispatch = useDispatch();
  const { logout, getUser } = useAuth();

  useEffect(() => {
    const checkExpirationStatus = () => {
      const user = auth.currentUser;
      if (user) {
        const { refreshToken } = user;
        const nowInSeconds = Math.floor(Date.now() / 1000);
        if (refreshToken && user.expirationTime < nowInSeconds) {
          logout();
          window.location.reload();
        } else {
          getUser(user.uid);
        }
      } else {
        dispatch(
          setAuthedUser({
            name: null,
            email: null,
            isAdmin: false,
            uid: null,
            authed: false,
          })
        );
      }
    };
    checkExpirationStatus();
    // Set up an observer to check the expiration status whenever the authentication state changes
    const unsubscribe = onAuthStateChanged(auth, checkExpirationStatus);
    // Clean up the observer when the component unmounts
    return () => unsubscribe();
  }, [auth]);

  return (
    <main>
      <ToastContainer
        position="top-right"
        toastStyle={{
          backgroundColor: "#1e1e1e",
          zIndex: 10000,
          cursor: "pointer",
        }}
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        pauseOnHover
        theme="dark"
      />
      <AuthModal />
      <LogoutModal />
      <ScrollToTop />
      {props?.children}
    </main>
  );
}
