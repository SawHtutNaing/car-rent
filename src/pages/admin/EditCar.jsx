import { useEffect, useRef, useState } from 'react'
import { AiOutlinePlus, AiOutlineClose } from "react-icons/ai";
import { useDispatch, useSelector } from 'react-redux';
import { db, storage } from '../../firebase';
import { useLocation } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import Button from '../../components/shared/Button';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import useAuth from '../../hooks/useAuth';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';





const EditCar = () => {

    // toast 

    const { update } = useAuth();
    const { mutate, isLoading } = useMutation({
        mutationFn: async () => update(),
        // onSuccess: () => window.location.reload(),
        onError: (err) => toast.error(err.message),
    });

    // toast 

    const { state: car } = useLocation();


    const [isUpdating, setIsUpdating] = useState(false);



    const [isAutomatic, setIsAutomatic] = useState(null);
    // const [location, setLocation] = useState("");

    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState('');



    async function handleUpdateDocument(e) {
        e.preventDefault();

        setIsUpdating(true);
        const collection = 'car_list';
        let downloadURL = "";
        // binding -----------------





        // binding -----------------


        const newData = {
            brand: e.target.brand.value,
            people: e.target.people.value,
            bags: e.target.Bags.value,
            doors: e.target.doors.value,
            isAutomatic: e.target.isAutomatic.checked,
            location: e.target.location.value,
            price_per_hour: e.target.price.value
        };

        try {

            const documentRef = doc(db, collection, car.id);





            if (image) {
                await new Promise(async (resolve) => {
                    const storageRef = ref(storage, 'images/' + documentRef.id);
                    await uploadBytes(storageRef, image);
                    const aa = await getDownloadURL(storageRef);
                    console.log(aa);
                    newData['downloadURL'] = aa;
                    resolve();
                });
            }




            console.log(newData)

            await updateDoc(documentRef, newData);
            mutate();
            setIsUpdating(false);


        } catch (error) {
            console.error('Error updating document:', error);
        }


    }









    // handle file change 
    const handleFileChange = (e) => {

        const file = e.target.files[0];
        setImage(file);

    }
    // handle file change 
    // edit 

    useEffect(() => {
        setIsAutomatic(car?.isAutomatic)

    },
        [
            car
        ]
    )

    return (

        <div className="fixed inset-0 flex items-center justify-center z-10">
            <div className="bg-accent w-80 rounded-lg p-6">

                <form

                    onSubmit={
                        handleUpdateDocument

                    } className="w-full  "
                >


                    <input
                        className="w-full mb-5 px-3 py-2 border bg-transparent border-none  hover:border-primary    rounded"
                        type="text"
                        name="brand"
                        defaultValue={car?.brand}
                        placeholder="Brand"

                    // ref={brandRef}

                    />

                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="image">Small file input</label>
                        <input
                            // defaultValue={}
                            className="block w-full mb-5 text-xs  border  rounded-lg cursor-pointer  text-gray-400 focus:outline-none bg-gray-700 border-gray-600 placeholder-gray-400" id="image" type="file" onChange={handleFileChange} />

                    </div>

                    <input
                        className="w-full mb-5 px-3 py-2 border bg-transparent border-none  hover:border-primary    rounded"
                        type="text"
                        name="people"
                        placeholder="People"

                        defaultValue={car?.people_capacity}
                    // ref={peopleRef}
                    />
                    <input
                        className="w-full mb-5 px-3 py-2 border bg-transparent border-none  hover:border-primary    rounded"
                        type="text"
                        name="Bags"
                        placeholder="Bags"

                        defaultValue={car?.luggage_capacity}
                    // ref={bagsRef}

                    />
                    <input
                        className="w-full mb-5 px-3 py-2 border bg-transparent border-none  hover:border-primary    rounded"
                        type="text"
                        name="doors"
                        placeholder="Doors"
                        // onChange={
                        //     (e) => {
                        //         setDoors(e.target.value)
                        //     }
                        // }
                        defaultValue={car?.doors}
                    // ref={doorsRef}


                    />
                    <input
                        className="w-full mb-5 px-3 py-2 border bg-transparent border-none  hover:border-primary    rounded"
                        type="number"
                        name="price"
                        placeholder="$ per hour"
                        // onChange={
                        //     (e) => {
                        //         setPrice_per_hour(e.target.value)
                        //     }
                        // }
                        defaultValue={car?.price_per_hour}
                    // ref={price_per_hourRef}


                    />
                    <div className="mb-5">


                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" checked={isAutomatic} className="sr-only peer" name="isAutomatic"
                                onChange={
                                    (e) => {
                                        setIsAutomatic(e.target.checked)
                                    }
                                }
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
                        // onChange={
                        //     (e) => {
                        //         setLocation(e.target.value)
                        //     }
                        // }
                        defaultValue={car?.location}
                    // ref={locationRef}

                    />
                    {/* Submit button */}

                    <Button loading={isUpdating}>
                        Update
                    </Button>
                </form>
            </div>
        </div>

    )
}

export default EditCar