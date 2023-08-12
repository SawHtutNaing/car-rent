import { useState } from "react";
// import TimeSelect from "./TimeSelect";

// import { getTodayDate, timeSlots } from "../../../helpers/datetime";
// import DatePicker from "./DatePicker";
import { FaSearch } from "react-icons/fa";
import { useDispatch } from "react-redux";
// import { changeSearchOjb } from "../../../store/formSlice";
import { Link } from "react-router-dom";

useDispatch;

export default function SearchBox({ wFull = false, withBorder = true }) {
  const [formData, setFormData] = useState({
    location: "",
    people_capacity: "",
    price: "",
    luggage_capacity: "",
    release_year: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className={`w-full max-w-6x ${withBorder ? "bg-primary p-2" : ""}`}>
      <form action="">
        <div className="w-auto min-h-[4rem] flex xl:flex-row flex-col items-center bg-darkGray">
          <div className=" flex  flex-col md:flex-row  lg items-center w-full lg:border-b-0 border-b border-b-gray-500">
            <input
              id="location"
              type="text"
              className="searchbox-input"
              placeholder="Pick up location"
              name="location"
              onChange={handleChange}
              value={formData.location}
            />
            <input
              id="people_capacityCount"
              type="text"
              className="searchbox-input"
              placeholder="People Capacity "
              name="people_capacity"
              onChange={handleChange}
              value={formData.people_capacity}
            />
            <input
              id="luggage_capacityCount"
              type="text"
              className="searchbox-input"
              placeholder="Luggage Capacity "
              name="luggage_capacity"
              onChange={handleChange}
              value={formData.luggage_capacity}
            />
            <input
              type="text"
              id="price"
              className="searchbox-input"
              placeholder="Cost per hour"
              required
              name="price"
              onChange={handleChange}
              value={formData.price}
            />
          </div>
          <Link
            to={{
              pathname: "/show-result",
              search: `?location=${formData.location}&people_capacity=${formData.people_capacity}&price=${formData.price}&release_year=${formData.release_year}&luggage=${formData.luggage_capacity} `,
            }}
            className=" ms-auto  lg:mx-auto me-3"
          >
            <button className="xl:w-16 w-full aspect-square xl:h-16 h-12 grid place-items-center xl:bg-darkGray hover:bg-black bg-primary xl:text-primary text-black ease transition-colors">
              <FaSearch />
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
}
