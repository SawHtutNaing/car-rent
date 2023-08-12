import { useState } from "react";
import { toast } from "react-toastify";
import { useMutation } from "react-query";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../../hooks/useAuth";
import Button from "../shared/Button";
import { useNavigate } from "react-router-dom";


export default function AadminLogin({ setLogIn }) {
    const [isSignedIn, setIsSignedIn] = useState(null)


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
                nav(-1);
            }}
            className="min-w-[20rem] pl-8 py-8 "
        >
            <h2 className="font-bold mb-4 text-center   text-xl"> ADMIN  LOG IN</h2>
            <div className="flex flex-col gap-4 items-center  justify-around gap-y-9 mt-44">
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
                <div>
                    <Button className="text-black " loading={isLoading} loadingMsg="VERIFING...">
                        LOG IN
                    </Button>
                </div>
            </div>

            <p className="mt-2 text-center">or</p>
            <GoogleButton handleLogin={handleGoogleLogin} />


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
