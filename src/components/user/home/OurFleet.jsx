import CarsList from "../cars/CarsList";
// import { cars } from "../../../pages/user/dummy";
import { Link } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa";

export default function OurFleet() {
  return (
    <section>
      <div className="xl:mb-16 mb-8 w-full flex justify-between items-center xl:p-0 px-4">
        <h2 className="text-2xl font-semibold">OUR FLEET</h2>
        <Link
          to={"/cars"}
          className="text-sm text-primary flex items-center gap-2 group border border-primary py-1 px-2 pr-4"
        >
          View all{" "}
          <FaChevronRight className="group-hover:translate-x-3 transition-transform ease duration-200" />
        </Link>
      </div>
      <CarsList limitCount={6} />
    </section>
  );
}
