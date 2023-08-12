import {
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { toast } from "react-toastify";

import { auth, db } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import {
  formatGoogleLoginError,
  formatLoginError,
  formatRegisterError,
} from "../helpers/formatErrors";
import { useDispatch } from "react-redux";
import { setAuthedUser } from "../store/authSlice";
import { toggleAuthModal, toggleLogoutModal } from "../store/dialogSlice";

export default function useAuth() {
  const dispatch = useDispatch();
  async function register(body) {
    try {
      if (body.password !== body.confirm_password) {
        throw new Error("Passwords do not match");
      }
      const methods = await fetchSignInMethodsForEmail(auth, body.email);
      if (methods.length > 0) {
        throw new Error("Email already registered");
      }
      const user = await createUserWithEmailAndPassword(
        auth,
        body.email,
        body.password
      );
      await updateProfile(user.user, {
        displayName: body.name,
      });
      await setDoc(doc(db, "users", user.user.uid), {
        name: body.name,
        email: body.email,
        isAdmin: false,
        phone: "",
      });
      return { success: true, message: "Successfully registered" };
    } catch (error) {
      formatRegisterError(error);
    }
  }

  async function login(body) {
    try {
      console.log("i am running again");
      const authed = await signInWithEmailAndPassword(
        auth,
        body.email,
        body.password
      );
      const res = await getDoc(doc(db, "users", authed.user.uid));
      dispatch(
        setAuthedUser({
          ...res.data(),
          authed: true,
          UserID: authed.user.uid,
        })
      );

      return { success: true, message: "Successfully logged in" };
    } catch (error) {
      formatLoginError(error);
    }
  }

  async function logout() {
    try {
      await signOut(auth);
      console.log("i am running ");

      dispatch(
        setAuthedUser({
          name: null,
          email: null,
          isAdmin: false,
          uid: null,
          authed: false,
          user_id: null,
        })
      );
      toast.success("Logged out");
      dispatch(toggleLogoutModal({ show: false }));
    } catch (error) {
      formatLoginError(error);
    }
  }

  async function getUser(uid) {
    try {
      const res = await getDoc(doc(db, "users", uid));
      if (res.exists()) {
        dispatch(
          setAuthedUser({
            ...res.data(),
            authed: true,
            UserID: uid,
          })
        );
      } else logout();
    } catch (error) {
      toast.error(error.message);
    }
  }

  async function handleGoogleLogin() {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      const userDoc = await getDoc(doc(db, "users", result.user.uid));
      if (!userDoc.exists()) {
        await setDoc(doc(db, "users", result.user.uid), {
          name: result.user.displayName,
          email: result.user.email,
          isAdmin: false,
          phone: "",
        });
      }
      await getUser(result.user.uid);
      dispatch(toggleAuthModal({ show: false }));
    } catch (error) {
      toast.error(formatGoogleLoginError(error));
    }
  }

  return {
    register,
    login,
    logout,
    handleGoogleLogin,
    getUser,
  };
}
