import { FaMapMarkerAlt, FaUsers } from "react-icons/fa";
import { LuLuggage } from "react-icons/lu";
import { GiCarDoor } from "react-icons/gi";
import { TbManualGearbox } from "react-icons/tb";
import CarImage from "../../../assets/images/dummy.png";
import Button from "../../shared/Button";
import { useNavigate } from "react-router-dom";

export default function CarItem({ car }) {
  const nav = useNavigate();
  return (
    <div
      id={car?.id}
      className="relative group flex items-center justify-center sm:flex-row flex-col-reverse bg-darkGray sm:max-h-80"
    >
      <div className="w-full relative h-full sm:p-6 p-3 sm:text-left text-center">
        <div className="flex h-full flex-col justify-between">
          <div>
            <h3 className="text-xl font-semibold relative sm:w-full w-max mx-auto">
              {car?.car_model}
              <div className="absolute left-1/2 -translate-x-1/2 top-[calc(100%+0.4rem)] sm:w-full w-[calc(100%-1rem)] h-[2px] bg-primary"></div>
            </h3>
            <ul className="sm:grid grid-cols-2 gap-4 mt-6 text-base flex items-center justify-around">
              <li className="flex items-center gap-2">
                <FaUsers className="text-xl" />
                <p>
                  {car?.people_capacity}{" "}
                  <span className="sm:inline hidden">Peoples</span>
                </p>
              </li>
              <li className="flex items-center gap-2">
                <LuLuggage className="text-xl" />
                <p>
                  {car?.luggage_capacity}{" "}
                  <span className="sm:inline hidden">Bags</span>
                </p>
              </li>
              <li className="flex items-center gap-2">
                <GiCarDoor className="text-xl" />
                <p>
                  {car?.doors} <span className="sm:inline hidden">Doors</span>
                </p>
              </li>
              {car?.isAutomatic && (
                <li className="flex flex-nowrap items-center gap-2">
                  <TbManualGearbox className="text-xl" />
                  <p>Auto</p>
                </li>
              )}
            </ul>
            <p className="mt-4 flex items-center gap-2 justify-center sm:justify-start">
              <FaMapMarkerAlt className="text-xl" />
              {car?.location}
            </p>
          </div>
          <div>
            <p className="mt-4 ">
              <span className="text-[1.3rem] font-bold">
                ${car?.price_per_hour}
              </span>{" "}
              per hour
            </p>
            <div>
              <Button
                onClick={() =>
                  nav(`/booking/${car.id}`, {
                    state: car,
                  })
                }
              >
                Book Now
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-full flex items-center   bg-primary">
        <div className="w-full max-w-[18rem]   ">
          <div className="sm:p-4 p-10 ">
            <img
              src={CarImage}
              alt=""
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
