import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { FaRegClock } from "react-icons/fa";

export default function TimeSelect({
  selected,
  onChange,
  times = [],
  none = false,
}) {
  function handleSelect(time) {
    onChange(time);
  }
  return (
    <div
      className={`relative searchbox-input w-max pr-5 ${none && "border-r-0"}`}
    >
      <Listbox value={selected} onChange={handleSelect}>
        <Listbox.Button className="searchbox-input pl-0 max-w-[6rem] border-r-0 flex gap-2 items-center">
          <FaRegClock /> {selected}
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute bottom-[calc(100%+0.5rem)] mt-1 max-h-60 w-[7rem] overflow-auto bg-darkGray py-1 text-base sm:text-sm">
            {times.map((time) => (
              <Listbox.Option
                onClick={() => handleSelect(time)}
                className={`relative cursor-pointer select-none py-2 pl-4 pr-4 ${
                  selected === time ? "bg-primary text-black" : "text-white"
                }`}
                key={time}
                value={time}
                disabled={time}
              >
                {time}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </Listbox>
    </div>
  );
}
