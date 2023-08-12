import { useState } from "react";
import { toast } from "react-toastify";
import { useMutation } from "react-query";
import { FcGoogle } from "react-icons/fc";

import useAuth from "../../hooks/useAuth";
import Button from "../shared/Button";
import { useNavigate } from "react-router-dom";

export default function LoginForm({ setLogIn }) {
  const [isSignedIn, setIsSignedIn] = useState(null);

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const { login, handleGoogleLogin } = useAuth();
  const { mutate, isLoading } = useMutation({
    mutationFn: async () => login(values),
    onSuccess: () => window.location.reload(),
    onError: (err) => toast.error(err.message),
  });

  function onValueChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    setValues((prev) => {
      return { ...prev, [name]: value };
    });
  }
  const nav = useNavigate();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setIsSignedIn(!isSignedIn);
        mutate();
      }}
      className="min-w-[20rem] pl-8 py-8"
    >
      <h2 className="font-bold mb-4 text-xl">LOG IN</h2>
      <div className="flex flex-col gap-4 ">
        <input
          type="email"
          className="text-input border border-gray-800"
          placeholder="Email Address"
          name="email"
          onChange={onValueChange}
          required
        />
        <input
          type="password"
          className="text-input border border-gray-800"
          placeholder="Password"
          name="password"
          onChange={onValueChange}
          required
        />
        <label
          htmlFor="terms"
          className="flex items-center gap-2 accent-primary"
        >
          <input type="checkbox" required />
          <span className="text-sm">I agree to terms and conditions</span>
        </label>
      </div>
      <Button loading={isLoading} loadingMsg="VERIFING...">
        LOG IN
      </Button>
      <p className="mt-2 text-center">or</p>
      <GoogleButton handleLogin={handleGoogleLogin} />
      <div className="bg-gray-400 w-full h-[1px] my-4"></div>
      <p>
        Don&apos;t have an account?{" "}
        <button
          type="button"
          className="text-primary underline"
          onClick={() => setLogIn(false)}
        >
          Sign Up
        </button>{" "}
        now
      </p>
      <p>
        Forget your password ?{" "}
        <button
          type="button"
          className="text-primary underline"
          onClick={() => {
            // setLogIn(false)
            // () => setLogIn(false)
            nav("/reset");

            window.location.reload();
          }}
        >
          Reset
        </button>{" "}
        now
      </p>
    </form>
  );
}

function GoogleButton({ handleLogin }) {
  return (
    <button
      type="button"
      onClick={handleLogin}
      className="h-10 w-10 rounded-full grid place-items-center border border-gray-200 hover:bg-gray-50 ease transition-colors mt-2 mx-auto"
    >
      <FcGoogle className="text-2xl" />
    </button>
  );
}
