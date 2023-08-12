import { useMutation } from "react-query";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { FaMapMarkerAlt } from "react-icons/fa";

import Select from "../../shared/Select";
import Button from "../../shared/Button";
import { toast } from "react-toastify";
import { db } from "../../../firebase";

const services = [
  "General Maintenance",
  "Engine Oil Changing",
  "Diagnostic Scanning",
  "Tire Repairing",
  "Air Conditioning",
  "Engine Diagnostics",
  "Battery Replacement",
  "Steering Repairing",
];

export default function ServiceForm({
  show,
  close,
  selected,
  onServiceChange,
}) {
  const [values, setValues] = useState({
    name: "",
    phone: "",
    date: "",
    address: "",
  });

  async function handleRequest(e) {
    e.preventDefault();
    await addDoc(collection(db, "serviceRequests"), {
      ...values,
      service: selected,
      status: "pending",
      created_at: serverTimestamp(),
    });
  }

  function onValueChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    setValues((prev) => {
      return { ...prev, [name]: value };
    });
  }

  const { mutate, isLoading } = useMutation({
    mutationFn: handleRequest,
    onSuccess: () => {
      toast.success("Thanks for booking, we'll get back to you soon!");
      close();
    },
    onError: (error) => toast.error(error.message),
  });

  function getCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;
        setValues({ ...values, address: `${latitude}, ${longitude}` });
      });
    } else {
      toast.error("Geolocation is not supported by this browser.");
      return "";
    }
  }

  return (
    <>
      <Transition appear show={show} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={close}>
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

          <div className="fixed inset-0 overflow-y-auto">
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
                <form
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  onSubmit={mutate}
                  className="relative w-full max-w-md mx-auto bg-darkGray px-10 py-8 shadow-md flex flex-col gap-4"
                >
                  <button
                    type="button"
                    onClick={close}
                    className="absolute top-2 right-2 z-50"
                  >
                    <AiOutlineClose className="text-primary text-2xl" />
                  </button>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Name"
                    name="name"
                    onChange={onValueChange}
                    value={values.name}
                    required
                  />
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Phone Number"
                    name="phone"
                    value={values.phone}
                    onChange={onValueChange}
                    required
                  />
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Date (eg. 27-06-2023)"
                    required
                    value={values.date}
                    onChange={onValueChange}
                    name="date"
                    pattern="(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-2023"
                  />
                  <div className="relative w-full">
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Address"
                      required
                      value={values.address}
                      onChange={onValueChange}
                      name="address"
                    />
                    <button
                      type="button"
                      onClick={getCurrentLocation}
                      title="Click to use your current location"
                      className="h-12 aspect-square grid place-items-center bg-primary text-black hover:bg-primarySoft absolute right-0 bottom-0 z-10"
                    >
                      <FaMapMarkerAlt />
                    </button>
                  </div>
                  <Select
                    className="bg-transparent"
                    options={services}
                    selected={selected}
                    onChange={onServiceChange}
                  />
                  <Button
                    loadingMsg="Submitting..."
                    loading={isLoading}
                    className="mt-0 text-black"
                  >
                    BOOK NOW
                  </Button>
                </form>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
