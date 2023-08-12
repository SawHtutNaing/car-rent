import { FaCar } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import "flowbite/dist/flowbite";
import { HiOutlineMenuAlt3 } from "react-icons/hi";

import { toggleAuthModal, toggleLogoutModal } from "../../../store/dialogSlice";
import { useState } from "react";

const routes = [
  { name: "HOME", to: "/" },
  { name: "CARS", to: "/cars" },
  { name: "SERVICES", to: "/services" },
  { name: 'PROFILE ', to: '/usr-profile' }
];

export default function Header() {
  const dispatch = useDispatch();
  const { authed } = useSelector((state) => state.auth);
  const { pathname } = useLocation();

  const [showMobileNav, setShowMobileNav] = useState(false);
  return (
    <header>
      <nav className="w-full xl:px-0 px-4 max-w-7xl flex items-center justify-between mx-auto h-16">
        <Link to="/">
          <h2>
            <FaCar className="text-primary text-2xl" />
          </h2>
        </Link>
        <button
          type="button"
          className="xl:hidden block"
          onClick={() => setShowMobileNav(!showMobileNav)}
        >
          <HiOutlineMenuAlt3 className="text-3xl text-primary" />
        </button>

        <ul className="xl:flex items-center space-x-12 hidden">
          {routes?.map((route) => (
            <li key={route.name}>
              <Link
                to={route.to}
                className={`hover:text-primary ease transition-colors    ${pathname == route.to ? "text-primary" : " text-white"
                  } `}
              >
                {route.name}
              </Link>
            </li>
          ))}
          {authed ? (
            <button
              onClick={() => dispatch(toggleLogoutModal({ show: true }))}
              className="hover:text-primary ease transition-colors"
            >
              LOG OUT
            </button>
          ) : (
            <button
              onClick={() => dispatch(toggleAuthModal({ show: true }))}
              className="hover:text-primary ease transition-colors"
            >
              LOG IN
            </button>
          )}
        </ul>
      </nav>
      <nav
        className={`bg-darkGray transition-all ease duration-200 flex items-center justify-around overflow-hidden ${showMobileNav ? "h-10" : "h-0"
          }`}
      >
        {routes?.map((route) => (
          <Link
            key={route.name}
            to={route.to}
            className={`hover:text-primary ease transition-colors    ${pathname == route.to ? "text-primary" : " text-white"
              } `}
          >
            {route.name}
          </Link>
        ))}
        {authed ? (
          <button
            onClick={() => dispatch(toggleLogoutModal({ show: true }))}
            className="hover:text-primary ease transition-colors"
          >
            LOG OUT
          </button>
        ) : (
          <button
            onClick={() => dispatch(toggleAuthModal({ show: true }))}
            className="hover:text-primary ease transition-colors"
          >
            LOG IN
          </button>
        )}
      </nav>
    </header>
  );
}
