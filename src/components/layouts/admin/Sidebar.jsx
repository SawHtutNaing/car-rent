import { FiUsers } from "react-icons/fi";

import { AiOutlineFileDone, AiOutlineUser } from "react-icons/ai";
import { IoCarSportOutline } from "react-icons/io5";
import { AiFillDashboard } from 'react-icons/ai';
import { Link } from "react-router-dom/dist";
import { MdOutlineDesignServices } from "react-icons/md";
import { useEffect, useState } from "react";
import { getDocs, collection, where, query } from "firebase/firestore";
import { db } from "../../../firebase";

const routes = [
  {
    to: "/",
    icon: <AiFillDashboard className="w-6 h-6" />,
    name: "dashboard",
  },
  {
    to: "/bookings",
    icon: <AiOutlineFileDone className="w-6 h-6" />,
    name: "Bookings",
  },
  {
    to: "/cars-list",
    icon: <IoCarSportOutline className="w-6 h-6" />,
    name: "Cars",
  },
  {
    to: "/user-list",
    icon: <FiUsers className="w-6 h-6" />,
    name: "Users",
  },
  {
    to: "/profile",
    icon: <AiOutlineUser className="w-6 h-6" />,
    name: "Profile",
  },
];

const Sidebar = () => {
  const [serviceCount, setServiceCount] = useState(0);
  useEffect(() => {
    getServiceRequestCount();
  }, []);
  async function getServiceRequestCount() {
    try {
      const docs = await getDocs(
        query(
          collection(db, "serviceRequests"),
          where("status", "==", "pending")
        )
      );
      setServiceCount(docs.size);
    } catch (error) {
      console.log("service request count error : " + error.message);
    }
  }

  return (
    <aside
      id="default-sidebar"
      className="w-full h-screen bg-darkGray"
      aria-label="Sidebar"
    >
      <div className="h-full overflow-y-auto">
        <ul className="space-y-4 font-medium">
          <li>
            <Link
              to={"/admin/service-requests"}
              className="flex items-center p-3 text-white relative group hover:bg-primary hover:text-black transition-colors"
            >
              <MdOutlineDesignServices className="w-6 h-6" />
              <p className="ml-3">Service Requests</p>
              {serviceCount > 0 && (
                <div className="bg-primary w-5 text-xs text-black group-hover:text-primary group-hover:bg-darkGray pb-[2px] grid place-items-center aspect-square font-semibold rounded-full absolute right-4 top-1/2 -translate-y-1/2">
                  {serviceCount}
                </div>
              )}
            </Link>
          </li>
          {routes.map((route) => (
            <li className="w-full" key={route.to}>
              <Link
                to={`/admin${route.to}`}
                className="flex items-center p-3 text-white relative group hover:bg-primary hover:text-black transition-colors"
              >
                {route.icon}
                <p className="ml-3">{route.name}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
