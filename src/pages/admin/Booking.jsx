import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { MdDoneAll, MdOutlineClose } from "react-icons/md";

import { FaFileExport } from "react-icons/fa";

import { db } from "../../firebase";
import { useState } from "react";
import { getCurrentMonth, getCurrentYear } from "../../helpers/datetime";
import { useQuery } from "react-query";
import moment from "moment/moment";
import IconButton from "../../components/shared/IconButton";
import { BsCheckLg } from "react-icons/bs";
import { toast } from "react-toastify";
const Booking = () => {
  const [selectedMonth, setSelectedMonth] = useState(
    `${getCurrentYear()}-${getCurrentMonth()}`
  );

  const [total, setTotal] = useState(0);

  const fetchData = async () => {
    let month = Number(selectedMonth.split("-")[1]);
    let year = Number(selectedMonth.split("-")[0]);
    try {
      const querySnapshot = await getDocs(
        query(
          collection(db, "records"),
          where("month", "==", month),
          where("year", "==", Number(year))
        )
      );

      let fetchedData = [];
      querySnapshot.forEach((doc) => {
        fetchedData.push({ ...doc.data(), id: doc.id });
      });
      let add = fetchedData?.reduce(function (acc, cur) {
        if (cur.status === "accepted") {
          return acc + cur.total;
        }
        return acc;
      }, 0);
      setTotal(add);
      return fetchedData;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const { data, isLoading, isError, refetch, error } = useQuery(
    ["bookings", selectedMonth],
    fetchData
  );

  async function updateBooking(id, status) {
    try {
      await updateDoc(doc(db, "records", id), { status });
      toast.success("Reservation " + status);
      refetch();
    } catch (error) {
      toast.error(error.message);
    }
  }

  function convertArrayOfObjectsToCSV(array) {
    const separator = ",";
    const keys = Object.keys(array[0]);
    const csvContent = [keys.join(separator)];

    array.forEach((item) => {
      const values = keys.map((key) => {
        if (key === "userInfo") return item["userInfo"].name;
        return item[key];
      });
      csvContent.push(values.join(separator));
    });

    return csvContent.join("\n");
  }

  async function exportCSV() {
    const csv = convertArrayOfObjectsToCSV(data);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    let filename = "reservations.csv";
    if (navigator.msSaveBlob) {
      // For Microsoft Internet Explorer/Edge
      navigator.msSaveBlob(blob, filename);
    } else {
      // For other browsers
      const link = document.createElement("a");
      if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", filename);
        link.style.visibility = "hidden";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  }

  return (
    <div>
      <div className="mb-4 flex justify-between items-end">
        <div>
          <p className="text-primary">
            <span className=" font-bold text-lg"> INCOME</span>-{" "}
            <span className=" font-bold text-lg">{total} $ </span>
          </p>
        </div>
        <div className="flex items-center gap-4">
          <IconButton className="bg-green" onClick={exportCSV}>
            <FaFileExport className="text-white" />
          </IconButton>
          <input
            type="month"
            id="month"
            onChange={(e) => setSelectedMonth(e.target.value)}
            value={selectedMonth}
            className="text-primary p-2 ms-3  datepickerbg "
          />
        </div>
      </div>
      <div className="relative overflow-x-auto shadow-md bg-darkGray">
        <table className="w-full text-sm text-left overflow-auto">
          <thead className="text-xs uppercase text-primary">
            <tr>
              <th scope="col" className="px-6 py-3">
                No.
              </th>
              <th scope="col" className="px-6 py-3">
                Customer Name
              </th>
              <th scope="col" className="px-6 py-3">
                Phone
              </th>
              <th scope="col" className="px-6 py-3">
                Total
              </th>
              <th scope="col" className="px-6 py-3">
                Pick Up Date Time
              </th>
              <th scope="col" className="px-6 py-3">
                Pick Up Location
              </th>
              <th scope="col" className="px-6 py-3">
                Drop Off Date Time
              </th>
              <th scope="col" className="px-6 py-3">
                Drop Off Location
              </th>
              <th scope="col" className="px-6 py-3">
                Car ID
              </th>
              <th scope="col" className="px-6 py-3">
                Satus
              </th>
              <th scope="col" className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <th className="text-center text-lg py-4" colSpan={10}>
                  Loading...
                </th>
              </tr>
            ) : isError ? (
              <tr>
                <th
                  className="text-center text-lg py-4 text-red-500"
                  colSpan={10}
                >
                  {error.message}
                </th>
              </tr>
            ) : (
              <>
                {data?.map((el, id) => {
                  return (
                    <tr
                      key={el.id}
                      className="border-b bg-accent border-gray-700 hover:bg-darkGray"
                    >
                      <th className="px-6 py-4">{++id}</th>
                      <td className="px-6 py-4">{el.userInfo.name}</td>
                      <td className="px-6 py-4">{el.phone}</td>
                      <td className="px-6 py-4">{el.carID}</td>
                      <td className="px-6 py-4">{el.total} $</td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        {moment(el.pickupDateTime).format("lll")}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {el.pickupLocation}
                      </td>
                      <td className="x-6 py-4 whitespace-nowrap">
                        {moment(el.pickupDateTime).format("lll")}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {el.dropOffLocation}
                      </td>
                      <td className="x-6 py-4">
                        <p
                          className={`px-4 text-xs py-1 rounded-3xl w-max uppercase bg-opacity-20 ${
                            el.status === "pending"
                              ? "bg-primary text-primary"
                              : el.status === "accepted"
                              ? "bg-green text-green"
                              : el.status === "completed"
                              ? "bg-green text-green"
                              : "bg-red text-red"
                          }`}
                        >
                          {el.status}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        {el?.status === "pending" ? (
                          <div className="flex items-center gap-2">
                            <IconButton
                              onClick={() => updateBooking(el.id, "cancelled")}
                              className="hover:bg-red"
                            >
                              <MdOutlineClose className="text-red" />
                            </IconButton>
                            <IconButton
                              onClick={() => updateBooking(el.id, "accepted")}
                              className="hover:bg-green"
                            >
                              <BsCheckLg className="text-green" />
                            </IconButton>
                          </div>
                        ) : (
                          <IconButton
                            onClick={() => updateBooking(el.id, "completed")}
                            className="hover:bg-green"
                          >
                            <MdDoneAll className="text-green" />
                          </IconButton>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Booking;
