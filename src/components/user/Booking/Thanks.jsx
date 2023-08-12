import { useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import Button from "../../shared/Button";
import { motion } from "framer-motion"
const Thanks = () => {
  const {
    state: { payment },
  } = useLocation();

  const SoftCopy = useRef();
  const handlePrint = useReactToPrint({
    content: () => SoftCopy.current,
    documentTitle: "record",
  });

  const navigate = useNavigate();
  return (
    <main className="min-h-[60vh] flex flex-col justify-center items-center">
      <div className="hidden">
        <div ref={SoftCopy}>
          <Invoice />
        </div>
      </div>
      <h1 className="text-3xl text-primary mb-5">Reservation Received</h1>
      <h3 className="text-lg">
        Scan this QR below with your {payment} app to complete your reservation.
      </h3>
      <img
        src="/qr.png"
        alt=""
        className="w-32 aspect-square object-contain my-8"
      />
      <div className="flex items-center gap-8">
        <Button className="w-full" onClick={handlePrint}>
          Invoice
        </Button>
        <Button className="w-full" onClick={() => navigate("/")}>
          Home
        </Button>
      </div>
    </main>
  );
};

export default Thanks;

function Invoice() {
  const {
    state: { payment, createdAt, carID, location, total, id, userInfo },
  } = useLocation();
  return (
    <div

      className="h-screen overflow-hidden hidden onprint print:block"
    >
      <div>
        <div className="container rounded-lg bg-balck shadow-2xl ownBorder p-6 grid grid-cols-2 mt-10 w-5/6 mx-auto">
          <div className="h-full flex flex-col justify-center gap-14 rightBorder">
            <div className="header ">
              <p className="text-black font-bold  text-xl text-center ">
                Car Info
              </p>
            </div>
            <div className="text-xl text-start pl-8     h-full   body grid grid-rows-4 gap-4 ">
              <p className="text-black ">location -{location}</p>
              <p className="text-black ">ID -{carID}</p>
              <p className="text-black ">
                Return Date -
                {new Date(
                  createdAt
                ).toLocaleDateString()}
              </p>
              <p className="text-black ">User Name - U {userInfo.name}</p>
            </div>
          </div>

          <div className="h-full flex flex-col justify-center  gap-14 ">
            <div className="header ">
              <p className="text-black text-xl text-center  font-bold">
                Payment Info
              </p>
            </div>
            <div className="text-xl text-start pl-8   body grid grid-rows-4 gap-4 ">
              <p className=" text-black">Agent - {payment}</p>
              <p className=" text-black">Process Id -{id}</p>
              <p className=" text-black">
                Status -{" "}
                <span className="  bg-primary p-2 rounded text-black">
                  Pending
                </span>
              </p>
              <p className=" text-black">Total Cost - {total}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
