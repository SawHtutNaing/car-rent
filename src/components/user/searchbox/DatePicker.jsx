import { useEffect } from "react";
import { FaRegCalendarAlt } from "react-icons/fa";
import Datepicker from "flowbite-datepicker/Datepicker";

export default function DatePicker({ onChange, id, label }) {
  useEffect(() => {
    const datePicker = document?.getElementById(id);
    new Datepicker(datePicker);
  }, [id]);
  return (
    <div className="searchbox-input xl:max-w-[10rem] max-w-[8.5rem] flex flex-row items-center">
      <FaRegCalendarAlt />
      <input
        type="text"
        autoComplete="off"
        className="searchbox-input border-r-0 -ml-2 xl:ml-0"
        placeholder={label}
        onSelect={(e) => onChange(e.target.value)}
        id={id}
      />
    </div>
  );
}
