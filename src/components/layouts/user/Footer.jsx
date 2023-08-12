import { Link } from "react-router-dom";
import { BsTelephoneFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import kpay from "../../../assets/images/payments/kpay.png";
import wavepay from "../../../assets/images/payments/wavepay.png";
import ayapay from "../../../assets/images/payments/ayapay.png";
import jcb from "../../../assets/images/payments/jcb.png";
import visa from "../../../assets/images/payments/visa.png";

import {
  FaFacebookSquare,
  FaInstagramSquare,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { getCurrentYear } from "../../../helpers/datetime";

export default function Footer() {
  const payments = [kpay, wavepay, ayapay, jcb, visa];
  return (
    <div className="mt-8">
      <footer className="min-h-[5rem] bg-darkGray">
        <div className="w-full max-w-7xl mx-auto grid lg:grid-cols-4 sm:grid-cols-1 md:grid-cols-2 xl:px-6 px-4 py-6 lg:gap-0 gap-6">
          <div>
            <h3 className="text-lg font-semibold mb-4">Payment Methods</h3>
            <div className="flex items-center gap-4 flex-wrap">
              {payments.map((img, index) => (
                <img key={index} src={img} className="h-10 object-contain" />
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold  mb-4">Company</h3>
            <ul className="gap-2 w-full flex flex-col text-base">
              <Link to="/" className="hover:text-primary w-max">
                Home
              </Link>
              <Link to="/" className="hover:text-primary w-max">
                Terms & Conditions
              </Link>
              <Link to="/" className="hover:text-primary w-max">
                Privacy Policy
              </Link>
              <Link to="/" className="hover:text-primary w-max">
                Refund policy
              </Link>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Get in touch with us</h3>
            <ul className="gap-2 w-full flex flex-col text-base">
              <li className="flex items-center gap-2">
                <BsTelephoneFill />
                <a
                  href="tel:+959958888111"
                  className="hover:text-primary w-max"
                >
                  (+95) 9958888111
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MdEmail />
                <a
                  href="mailto:support@rentor.co"
                  className="hover:text-primary w-max"
                >
                  support@rentor.co
                </a>
              </li>
              <li className="flex items-center gap-2">
                <FaMapMarkerAlt />
                <a
                  href="https://goo.gl/maps/57gDTza5KZbs4nQe8"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-primary w-max"
                >
                  22nd floor, Tower M, Hledan, Yangon
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow our socials</h3>
            <ul className="w-full flex gap-4 text-3xl">
              <li className="hover:text-primary">
                <FaFacebookSquare />
              </li>
              <li className="hover:text-primary">
                <FaInstagramSquare />
              </li>
            </ul>
            <h3 className="text-lg font-semibold my-4">
              Subscribe our newsletter
            </h3>
            <div className="flex items-center">
              <input
                type="text"
                className="h-9 pl-2"
                placeholder="Enter your email"
              />
              <button className="bg-primary hover:bg-primarySoft h-9 px-2 text-sm text-black font-semibold">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </footer>
      <footer className="bg-primary ">
        <p className="w-full max-w-7xl mx-auto py-1 text-sm text-black xl:p-0 px-4">
          &copy; {getCurrentYear()} , Car Rentor
        </p>
      </footer>
    </div>
  );
}
