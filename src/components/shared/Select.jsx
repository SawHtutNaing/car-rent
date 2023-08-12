import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { LuChevronsUpDown } from "react-icons/lu";

export default function Select({ selected, onChange, options = [] }) {
  function handleSelect(time) {
    onChange(time);
  }
  return (
    <div className="relative w-full">
      <Listbox value={selected} onChange={handleSelect}>
        <Listbox.Button
          type="button"
          className="text-input text-black w-full max-w-md flex items-center justify-between pr-1 bg-white"
        >
          <p>{selected}</p>
          <LuChevronsUpDown className="text-xl" />
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute z-20 bottom-[calc(100%+0.5rem)] mt-1 max-h-60 w-full overflow-auto bg-black py-1 text-base sm:text-sm">
            {options.map((value) => (
              <Listbox.Option
                onClick={() => handleSelect(value)}
                className={`relative cursor-pointer select-none py-2 pl-4 pr-4 ${
                  selected === value ? "bg-primary text-black" : "text-white"
                }`}
                key={value}
                value={value}
                disabled={value}
              >
                {value}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </Listbox>
    </div>
  );
}
