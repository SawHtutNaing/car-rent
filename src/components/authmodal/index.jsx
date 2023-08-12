import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineClose } from "react-icons/ai";

import { toggleAuthModal } from "../../store/dialogSlice";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";

export default function AuthModal() {
  const [isLogIn, setIsLogIn] = useState(true);
  const { showAuthModal } = useSelector((state) => state.dialogs);
  const dispatch = useDispatch();
  return (
    <>
      <Transition appear show={showAuthModal} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => dispatch(toggleAuthModal({ show: false }))}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div
            className="fixed inset-0 overflow-y-auto"
            // onClick={() => dispatch(toggleAuthModal({ show: false }))}
          >
            <div className="flex min-h-full items-center justify-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <div
                  className="bg-white text-black relative rounded-sm overflow-hidden w-full xl:max-w-[44rem] max-w-[22rem] grid sm:grid-cols-1 xl:grid-cols-2"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    onClick={() => dispatch(toggleAuthModal({ show: false }))}
                    className="absolute top-3 right-3 z-50"
                  >
                    <AiOutlineClose className="text-primary text-2xl" />
                  </button>
                  <div
                    className={`grid grid-cols-[20rem_20rem] gap-8 w-full ease-in transition-transform duration-200 relative z-10 ${
                      isLogIn ? "translate-x-0" : "-translate-x-80"
                    }`}
                  >
                    <LoginForm
                      setLogIn={(boolean) => setIsLogIn(boolean)}
                      close={() => dispatch(toggleAuthModal({ show: false }))}
                    />
                    <SignUpForm setLogIn={(boolean) => setIsLogIn(boolean)} />
                  </div>
                  <div className="hidden xl:block w-full relative z-20 overflow-hidden">
                    <div className="bg-black bg-opacity-20 absolute inset-0 z-40"></div>
                    <div
                      className={`grid grid-cols-[22rem_22rem] w-full relative bg-primary z-10 ease-in transition-transform duration-200 ${
                        isLogIn ? "translate-x-0" : "-translate-x-[22rem]"
                      }`}
                    >
                      <div className="w-full h-full aspect-[3/4]">
                        <img
                          className="w-full h-full object-cover"
                          src="https://images.pexels.com/photos/691595/pexels-photo-691595.jpeg?auto=compress"
                          alt=""
                        />
                      </div>
                      <div className="w-full h-full aspect-[3/4]">
                        <img
                          className="w-full h-full object-cover"
                          src="https://images.pexels.com/photos/5834924/pexels-photo-5834924.jpeg?auto=compress"
                          alt=""
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
