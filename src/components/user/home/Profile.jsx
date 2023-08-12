import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db, auth } from "../../../firebase";
// import { cars } from '../../../pages/user/dummy';
const publicURL = window.PUBLIC_URL;
const profile_img = `${publicURL}/admin_profile.jpg`;

const Profile = () => {
  const [cars, setCars] = useState([]);

  let price_arr = cars?.map((el) => el.cost);

  let total = price_arr.reduce(function (accumulator, currentValue) {
    return accumulator + currentValue;
  }, 0);
  const fetchData = async (user_id) => {
    try {
      // Fetch the collection data from Firestore

      // const querySnapshot = await getDocs(collection(db, 'records'));
      const querySnapshot = await getDocs(
        query(collection(db, "records"), where("user_id", "==", user_id))
      );

      // Extract the data from each document in the collection
      let fetchedData = [];
      querySnapshot.forEach((doc) => {
        fetchedData.push({ ...doc.data(), id: doc.id });
      });

      setCars((prevCars) => {
        if (JSON.stringify(prevCars) === JSON.stringify(fetchedData)) {
          return prevCars;
        } else {
          return fetchedData;
        }
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    let user_id = auth?.currentUser?.uid;
    if (user_id) {
      fetchData(user_id);
    }
  }, [auth?.currentUser?.uid]);

  return (
    <div className="">
      <section>
        <div className="heading flex flex-col lg:flex-row items-center lg:justify-center p-6  gap-x-44">
          <div className=" w-48 flex items-center ">
            <img src={profile_img} className="rounded " alt="" />
          </div>
          <div className="details flex flex-col justify-center  h-72">
            <h1 className="  text-primary  text-3xl font-bold ">
              {auth?.currentUser?.displayName}
            </h1>
            <p>Join Date - 17/6/2023</p>
            <p>Address - Yangon</p>
            <p></p>
          </div>
        </div>
        <div className="relative  overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-center  text-gray-400">
            <thead className="text-xs  uppercase  bg-accent  text-primary">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Car id
                </th>
                <th scope="col" className="px-6 py-3">
                  expend
                </th>
                <th scope="col" className="px-6 py-3">
                  drop off date
                </th>
                <th scope="col" className="px-6 py-3">
                  purchase date
                </th>
              </tr>
            </thead>
            <tbody>
              {cars?.map((el) => {
                return (
                  <tr key={el.id} className=" border-b   hover:bg-darkGray">
                    <td className="px-6 py-4">{el.car_id}</td>
                    <td className="px-6 py-4">{el.cost}</td>
                    <td className="px-6 py-4">
                      {new Date(
                        el.drop_off_date["seconds"] * 1000
                      ).toLocaleDateString("en-GB")}
                    </td>

                    <td className="px-6 py-4">
                      {/* {el.purchase_date} */}
                      {new Date(
                        el.purchase_date["seconds"] * 1000
                      ).toLocaleDateString("en-GB")}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <p className=" text-primary mt-11 text-center text-xl">
          Thanks you for believing us . When your cost react{" "}
          <span className="text-white">{total + 100} </span>$ you will get 20%
          promo code .
        </p>
      </section>
    </div>
  );
};

export default Profile;
