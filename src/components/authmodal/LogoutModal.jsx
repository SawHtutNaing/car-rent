import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";

import { toggleLogoutModal } from "../../store/dialogSlice";
import Button from "../shared/Button";
import useAuth from "../../hooks/useAuth";

export default function LogoutModal() {
  const { showLogoutModal } = useSelector((state) => state.dialogs);
  const dispatch = useDispatch();
  const { logout } = useAuth();
  return (
    <>
      <Transition appear show={showLogoutModal} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => dispatch(toggleLogoutModal({ show: false }))}
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
            onClick={() => dispatch(toggleLogoutModal({ show: false }))}
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
                  className="bg-darkGray relative rounded-sm overflow-hidden w-full max-w-[22rem] p-6 text-center"
                  onClick={(e) => e.stopPropagation()}
                >
                  <h3 className="text-xl mb-6">
                    Are you sure you want to logout?
                  </h3>
                  <div className="flex items-center justify-between">
                    <Button
                      onClick={() =>
                        dispatch(toggleLogoutModal({ show: false }))
                      }
                      className="bg-transparent max-w-[7rem] text-white hover:bg-transparent"
                    >
                      Cancel
                    </Button>
                    <Button onClick={logout} className="max-w-[7rem]">
                      Log out
                    </Button>
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
