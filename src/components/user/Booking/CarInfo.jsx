import { FaMapMarkerAlt, FaUsers } from "react-icons/fa";
import { LuLuggage } from "react-icons/lu";
import { GiCarDoor } from "react-icons/gi";
import { TbManualGearbox } from "react-icons/tb";
import { useLocation } from "react-router-dom";

export default function CarInfo() {
  const { state: car } = useLocation();
  return (
    <div className="bg-darkGray p-6">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-semibold relative sm:w-full w-max mx-auto">
          {car?.car_model}
        </h3>
        <p className="whitespace-nowrap">${car?.price_per_hour} per hour</p>
      </div>
      <div className="mt-2 top-[calc(100%+0.4rem)] sm:w-full w-[calc(100%-1rem)] h-[2px] bg-primary"></div>
      <ul className="\gap-4 mt-6 text-base flex items-center justify-between">
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
        <li className="flex flex-nowrap items-center gap-2">
          <FaMapMarkerAlt className="text-xl" />
          <p>{car?.location}</p>
        </li>
      </ul>
    </div>
  );
}
