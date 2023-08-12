import CarItem from "../../components/user/cars/CarItem";

import { set } from "firebase/database";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import { AiOutlinePlus, AiOutlineClose } from "react-icons/ai";

import { useDispatch, useSelector } from "react-redux";
import { toggleCarFormVisible } from "../../store/dialogSlice";
import { useEffect, useRef, useState } from "react";
import { db, storage } from "../../firebase";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import Button from "../../components/shared/Button";
import { useMutation } from "react-query";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";
// import { cars } from "../user/dummy";

const CarList = () => {
  const dispatch = useDispatch();
  // new car creation
  // let isLoading = useRef(false);
  const [brand, setBrand] = useState("");
  const [people, setPeople] = useState(0);
  const [bags, setBags] = useState(0);
  const [doors, setDoors] = useState(0);
  const [isAutomatic, setIsAutomatic] = useState(false);
  const [location, setLocation] = useState("");

  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  const [cars, setCars] = useState([]);
  const [price_per_hour, setPrice_per_hour] = useState(0);

  const { create } = useAuth();
  const { mutate, isLoading } = useMutation({
    mutationFn: async () => create(),
    // onSuccess: () => window.location.reload(),
    onError: (err) => toast.error(err.message),
  });

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      // set image

      let downloadURL = "";

      // set image
      // Create a new Firestore document
      const docRef = await addDoc(collection(db, "car_list"), {
        brand,
        people,
        bags,
        doors,
        isAutomatic,
        location,
        price_per_hour,
        downloadURL,
      });

      if (image) {
        // console.log(image)
        const storageRef = ref(storage, "images/" + docRef.id);
        await uploadBytes(storageRef, image);
        downloadURL = await getDownloadURL(storageRef);

        // setImageUrl(downloadURL);
      }

      let newData = {
        brand,
        people,
        bags,
        doors,
        isAutomatic,
        location,
        price_per_hour,
        downloadURL,
      };

      await updateDoc(docRef, newData);

      mutate();
      console.log("Document written with ID:", docRef.id);
    } catch (error) {
      console.error("Error adding document:", error);
    }

    dispatch(toggleCarFormVisible({ show: !isFormVisible }));
  }

  // new car creation
  // const isFormVisible = useSelector((state) => state.dialogs.isFormVisible);
  const isFormVisible = useSelector((state) => state.dialogs.isCarFormVisible);


  useEffect(() => {
    // console.log(isFormVisible);
  }, [isFormVisible]);

  // file change
  const handleFileChange = (e) => {
    // console.log(e)
    const file = e.target.files[0];
    setImage(file);
  };
  // fetch data

  const fetchData = async () => {
    try {
      // Fetch the collection data from Firestore
      const querySnapshot = await getDocs(collection(db, "car_list"));

      // Extract the data from each document in the collection
      const fetchedData = [];
      querySnapshot.forEach((doc) => {
        fetchedData.push({ id: doc.id, ...doc.data() });
      });

      // Update the state with the fetched data
      setCars(fetchedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  fetchData();

  return (
    <section className="h-full w-full grid lg:grid-cols-2  grid-cols-1 gap-14 my-8 lg:p-0 p-4">

      {isFormVisible && (
        <div className="fixed inset-0 flex items-center justify-center z-10">
          <div className="bg-accent w-80 rounded-lg p-6">
            <form id="list" onSubmit={handleSubmit} className="w-full  ">
              {/* Form fields */}
              <div>
                <AiOutlineClose
                  onClick={() =>
                    dispatch(toggleCarFormVisible({ show: !isFormVisible }))
                  }
                  className="ms-auto mb-4  w-5 h-5 "
                ></AiOutlineClose>
              </div>
              <input
                className="w-full mb-5 px-3 py-2 border bg-transparent border-none  hover:border-primary    rounded"
                type="text"
                placeholder="Brand"
                onChange={(e) => {
                  setBrand(e.target.value);
                }}
              />

              <div>
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  htmlFor="image"
                >
                  Small file input
                </label>
                <input
                  className="block w-full mb-5 text-xs  border  rounded-lg cursor-pointer  text-gray-400 focus:outline-none bg-gray-700 border-gray-600 placeholder-gray-400"
                  id="image"
                  type="file"
                  onChange={handleFileChange}
                />
              </div>

              <input
                className="w-full mb-5 px-3 py-2 border bg-transparent border-none  hover:border-primary    rounded"
                type="text"
                name="people"
                placeholder="People"
                onChange={(e) => {
                  setPeople(e.target.value);
                }}
              />
              <input
                className="w-full mb-5 px-3 py-2 border bg-transparent border-none  hover:border-primary    rounded"
                type="text"
                name="Bags"
                placeholder="Bags"
                onChange={(e) => {
                  setBags(e.target.value);
                }}
              />
              <input
                className="w-full mb-5 px-3 py-2 border bg-transparent border-none  hover:border-primary    rounded"
                type="text"
                name="doors"
                placeholder="Doors"
                onChange={(e) => {
                  setDoors(e.target.value);
                }}
              />
              <input
                className="w-full mb-5 px-3 py-2 border bg-transparent border-none  hover:border-primary    rounded"
                type="number"
                name="price"
                placeholder="$ per hour"
                onChange={(e) => {
                  setPrice_per_hour(e.target.value);
                }}
              />
              <div className="mb-5">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    value=""
                    className="sr-only peer"
                    onChange={(e) => {
                      setIsAutomatic(!isAutomatic);
                    }}
                  />

                  <div className="w-8 h-4  peer-focus:outline-none peer-focus:ring-4  peer-focus:ring-blue-800 rounded-full peer bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all border-gray-600 peer-checked:bg-blue-600"></div>
                  <span className="ml-3 ">Automatic </span>
                </label>
              </div>
              <input
                className="w-full  mb-5 px-3 py-2 border bg-transparent border-none  hover:border-primary    rounded"
                type="text"
                name="location"
                placeholder="Location"
                onChange={(e) => {
                  setLocation(e.target.value);
                }}
              />
              {/* Submit button */}
              <Button
                loading={isLoading}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:text-primary"
              >
                Submit
              </Button>
            </form>
          </div>
        </div>
      )}

      {cars.map((car) => (
        <CarItem car={car} key={car.id} />
      ))}

      <div className="bg-white flex justify-center items-center fixed z-40  rounded-3xl bottom-5  right-5 w-10 h-10  hover:scale-110 transition ">
        <button
          onClick={() =>
            dispatch(toggleCarFormVisible({ show: !isFormVisible }))
          }
        >
          <AiOutlinePlus className="text-primaryDark"></AiOutlinePlus>
        </button>
      </div>
    </section>
  );
};

export default CarList;
