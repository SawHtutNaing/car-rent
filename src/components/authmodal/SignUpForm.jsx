import { useState } from "react";
import Button from "../shared/Button";
import { useMutation } from "react-query";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";

export default function SignUpForm({ setLogIn = () => {} }) {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const { register } = useAuth();
  const { mutate, isLoading } = useMutation({
    mutationFn: async () => register(values),
    onSuccess: (res) => {
      toast.success(res.message);
      setLogIn(true);
      setValues({
        name: "",
        email: "",
        password: "",
        confirm_password: "",
      });
    },
    onError: (err) => toast.error(err.message),
  });

  function onValueChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    setValues((prev) => {
      return { ...prev, [name]: value };
    });
  }
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        mutate();
      }}
      className="min-w-[20rem] pr-8 py-8"
    >
      <h2 className="font-bold mb-4 text-xl">Sign Up</h2>
      <div className="flex flex-col gap-4 items-start justify-center">
        <input
          type="text"
          className="text-input bg-gray-100 border border-gray-800"
          placeholder="Name"
          required
          name="name"
          onChange={onValueChange}
        />

        <input
          type="email"
          className="text-input bg-gray-100 border border-gray-800"
          placeholder="Email Address"
          required
          name="email"
          onChange={onValueChange}
        />
        <input
          type="password"
          className="text-input bg-gray-100 border border-gray-800"
          placeholder="Password"
          required
          name="password"
          onChange={onValueChange}
        />
        <input
          type="password"
          className="text-input bg-gray-100 border border-gray-800"
          placeholder="Confirm Password"
          required
          name="confirm_password"
          onChange={onValueChange}
        />
      </div>
      <Button loading={isLoading} loadingMsg="REGISTERING...">
        SIGN UP
      </Button>
      <div className="bg-gray-400 w-full h-[1px] my-4"></div>
      <p>
        Already a user?{" "}
        <button
          type="button"
          className="text-primary underline"
          onClick={() => setLogIn(true)}
        >
          Log In
        </button>{" "}
        now
      </p>
    </form>
  );
}
