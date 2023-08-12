import { collection, getDocs, query, limit } from "firebase/firestore";
import CarItem from "./CarItem";
import { db } from "../../../firebase";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import LoadingCarItem from "./LoadingCarItem";

export default function CarsList({ limitCount = 16 }) {
  const { search } = useLocation();

  async function getData() {
    let fetchedData = [];

    const querySnapshot = await getDocs(
      query(collection(db, "car_list"), limit(limitCount))
    );
    querySnapshot.forEach((doc) => {
      fetchedData.push({ ...doc.data(), id: doc.id });
    });
    if (fetchedData.length === 0)
      throw new Error("Sorry, Cars are not available for now");
    return fetchedData;
  }

  const { data, isError, error, isLoading } = useQuery(
    ["cars", search],
    getData
  );
  return (
    <section className="h-full w-full grid lg:grid-cols-2 grid-cols-1 xl:gap-14 gap-8 my-8 xl:p-0 px-4">
      {isLoading ? (
        [1, 2, 3, 4, 5, 6]?.map((num) => <LoadingCarItem key={num} />)
      ) : isError ? (
        <div className="col-span-2 text-center text-xl text-red">
          {error?.message}
        </div>
      ) : (
        data?.map((car) => <CarItem car={car} key={car.id} />)
      )}
    </section>
  );
}
