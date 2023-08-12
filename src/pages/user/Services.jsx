import { useState } from "react";
import { RiOilFill } from "react-icons/ri";
import { GiCarWheel, GiSteeringWheel } from "react-icons/gi";
import { FaCarBattery } from "react-icons/fa";
import { MdCarRepair, MdScreenSearchDesktop } from "react-icons/md";
import { TbAirConditioning, TbEngine } from "react-icons/tb";
import Button from "../../components/shared/Button";
import ServiceForm from "../../components/user/services/ServiceForm";

const services = [
  {
    name: "General Maintenance",
    icon: <MdCarRepair className="w-full h-12" />,
    desc: "Providing routine maintenance services such as filter replacements, fluid checks, battery inspections, and tire rotations",
  },
  {
    name: "Engine Oil Changing",
    icon: <RiOilFill className="w-full h-12" />,
    desc: "Performing regular oil changes to ensure proper lubrication and engine health",
  },
  {
    name: "Diagnostic Scanning",
    icon: <MdScreenSearchDesktop className="w-full h-12" />,
    desc: "Utilizing advanced diagnostic tools to scan and identify electronic and computer system issues in the vehicle",
  },
  {
    name: "Tire Repairing",
    icon: <GiCarWheel className="w-full h-12" />,
    desc: " Offering tire inspections, rotations, replacements, and repairs to ensure safe and properly inflated tires for optimal vehicle performance",
  },
];

const repairingServices = [
  {
    name: "General Maintenance",
    icon: <MdCarRepair className="w-full h-12" />,
    desc: "Providing routine maintenance services such as filter replacements, fluid checks, battery inspections, and tire rotations",
  },
  {
    name: "Engine Oil Changing",
    icon: <RiOilFill className="w-full h-12" />,
    desc: "Performing regular oil changes to ensure proper lubrication and engine health",
  },
  {
    name: "Diagnostic Scanning",
    icon: <MdScreenSearchDesktop className="w-full h-12" />,
    desc: "Utilizing advanced diagnostic tools to scan and identify electronic and computer system issues in the vehicle",
  },
  {
    name: "Tire Repairing",
    icon: <GiCarWheel className="w-full h-12" />,
    desc: " Offering tire inspections, rotations, replacements, and repairs to ensure safe and properly inflated tires for optimal vehicle performance",
  },
  {
    name: "Air Conditioning",
    icon: <TbAirConditioning className="w-full h-12" />,
    desc: "Checking and servicing the air conditioning system, including refrigerant recharge, leak detection, and component repairs",
  },
  {
    name: "Engine Diagnostics",
    icon: <TbEngine className="w-full h-12" />,
    desc: "Utilizing diagnostic tools to identify and resolve engine performance issues, such as misfires, check engine light codes, or fuel system problems",
  },
  {
    name: "Battery Replacement",
    icon: <FaCarBattery className="w-full h-12" />,
    desc: "Offering battery replacement services for worn-out or faulty batteries",
  },
  {
    name: "Steering Repairing",
    icon: <GiSteeringWheel className="w-full h-12" />,
    desc: "Diagnosing and repairing issues related to the power steering system, steering rack, or steering linkage",
  },
];

export default function Services() {
  const [selectedService, setSelectedService] = useState(null);
  const [showModal, setShowModal] = useState(false);
  return (
    <main className="min-h-screen xl:pt-16 pt-8">
      {/* <h3 className="mb-8 text-2xl font-semibold">Repairing Services</h3> */}
      <div className="grid md:grid-cols-2 xl:grid-cols-4 grid-cols-1 gap-6 xl:px-0 px-8">
        {repairingServices?.map((service) => (
          <RepairService
            service={service}
            key={service.name}
            showModal={() => setShowModal(true)}
            selectService={(service) => setSelectedService(service)}
          />
        ))}
      </div>
      <ServiceForm
        show={showModal}
        close={() => setShowModal(false)}
        selected={selectedService}
        onServiceChange={(service) => setSelectedService(service)}
      />
    </main>
  );
}

function RepairService({ service, showModal, selectService }) {
  return (
    <article className="relative group overflow-hidden aspect-[9/9.25] flex flex-col items-center justify-start text-center border p-4 bg-darkGray border-darkGray ease transition-colors hover:border-primarySoft">
      <figure className="h-14 mt-6">{service.icon}</figure>
      <h4 className="my-4 font-semibold text-xl">{service.name}</h4>
      <p>{service.desc}</p>
      <Button
        onClick={() => {
          showModal(true);
          selectService(service.name);
        }}
        className="absolute left-0 bottom-0 translate-y-12 ease text-black transition-transform duration-200 group-hover:translate-y-0"
      >
        BOOK NOW
      </Button>
    </article>
  );
}
