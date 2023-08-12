import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  getCurrentDateTime,
  getCurrentMonth,
  getCurrentYear,
  getTodayDate,
} from "../../../helpers/datetime";
import { auth, db } from "../../../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { toast } from "react-toastify";
import Button from "../../shared/Button";
import Select from "../../shared/Select";
import moment from "moment/moment";

import { toggleAuthModal } from "../../../store/dialogSlice";
import { useMutation } from "react-query";

export default function BookingForm() {
  const { state: car } = useLocation();
  const { authed, name, email } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [hoursCount, setHoursCount] = useState();
  const [datetimes, setDatetimes] = useState({
    pickup: getCurrentDateTime(),
    dropoff: getCurrentDateTime(),
  });
  const [payment, setPayment] = useState("KBZ Pay");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!authed) return dispatch(toggleAuthModal({ show: true }));
    if (hoursCount < 1)
      return toast.error(
        "Drop off time has to be one hour more than pick up time"
      );
    const recordBody = {
      date: getTodayDate(),
      year: getCurrentYear(),
      month: getCurrentMonth(),
      total: hoursCount * car?.price_per_hour,
      pickupDateTime: datetimes.pickup,
      dropOffDateTime: datetimes.dropoff,
      userInfo: {
        name,
        email,
        uid: auth.currentUser?.uid,
      },
      phone: e.target.phone.value,
      pickupLocation: e.target.pickuplocation.value,
      dropOffLocation: e.target.dropofflocation.value,
      status: "pending",
      createdAt: serverTimestamp(),
      payment,
      hoursCount,
      carID: car.id,
    };
    const docRef = await addDoc(collection(db, "records"), recordBody);
    navigate("/thanks", { state: { ...recordBody, id: docRef.id } });
  };

  const { mutate, isLoading } = useMutation({
    mutationFn: handleSubmit,
    onError: (error) => toast(error.message),
  });

  useEffect(() => {
    const dateTimeFormat = "YYYY-MM-DDTHH:mm";
    const pickupDatetime = moment(datetimes.pickup, dateTimeFormat);
    const dropoffDatetime = moment(datetimes.dropoff, dateTimeFormat);
    const totalHours = dropoffDatetime.diff(pickupDatetime, "hours");
    setHoursCount(totalHours);
  }, [datetimes.pickup, datetimes.dropoff]);

  function handleDateTimeChange(value, type) {
    setDatetimes((prev) => {
      return { ...prev, [type]: value };
    });
  }

  return (
    <form onSubmit={mutate} className="w-full bg-darkGray p-6 mt-4">
      <div className="w-full flex justify-center items-center gap-4">
        <div className="w-full">
          <label htmlFor="pickup" className="form-label">
            Pick Up Time
          </label>
          <input
            onChange={(e) => handleDateTimeChange(e.target.value, "pickup")}
            value={datetimes.pickup}
            id="pickup"
            type="datetime-local"
            className="form-input"
          />
        </div>
        <div className="w-full">
          <label htmlFor="dropoff" className="form-label">
            Drop Off Time
          </label>
          <input
            onChange={(e) => handleDateTimeChange(e.target.value, "dropoff")}
            value={datetimes.dropoff}
            id="dropoff"
            type="datetime-local"
            className="form-input"
          />
        </div>
      </div>
      <div className="w-full flex justify-center items-center gap-4 mt-4">
        <div className="w-full">
          <label htmlFor="pickuplocation" className="form-label">
            Pick Up Location
          </label>
          <input
            id="pickuplocation"
            type="text"
            placeholder="No(33), Thiri Street, Hlaing"
            className="form-input"
            required
          />
        </div>
        <div className="w-full">
          <label htmlFor="dropofflocation" className="form-label">
            Drop Off Location
          </label>
          <input
            required
            id="dropofflocation"
            type="text"
            placeholder="No(33), Thiri Street, Hlaing"
            className="form-input"
          />
        </div>
      </div>
      <div className="flex items-center justify-center mt-4 gap-4">
        <div className="w-full">
          <label htmlFor="phone" className="form-label">
            Phone Number
          </label>
          <input
            required
            id="phone"
            type="text"
            placeholder="09973738292"
            className="form-input"
          />
        </div>
        <div className="w-full">
          <label htmlFor="payment_method" className="form-label">
            Payments Method
          </label>
          <div className="mt-2">
            <Select
              options={["KBZ Pay", "Wave Pay", "UAB Pay", "CB Pay", "AYA Pay"]}
              selected={payment}
              onChange={(payment) => setPayment(payment)}
            />
          </div>
        </div>
      </div>
      <h3 className="mt-4 text-primary text-2xl text-center font-bold">
        $ {hoursCount * car?.price_per_hour}
      </h3>
      <Button loadingMsg="Sending..." loading={isLoading}>
        Proceed
      </Button>
    </form>
  );
}
