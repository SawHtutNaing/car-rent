import CarInfo from "../../components/user/Booking/CarInfo";
import BookingForm from "../../components/user/Booking/BookingForm";
import CarImage from "../../assets/images/dummy.png";

const UserBooking = () => {
  return (
    <div className="flex flex-col justify-around items-center min-h-[85vh] lg:flex-row">
      <figure className="w-full">
        <img
          src={CarImage}
          alt=""
          className="w-full max-w-md aspect-square object-contain"
        />
      </figure>
      <div className="w-full">
        <CarInfo />
        <BookingForm />
      </div>
    </div>
  );
};

export default UserBooking;
