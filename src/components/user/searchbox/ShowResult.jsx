import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { db } from '../../../firebase';
import CarItem from '../cars/CarItem';

const ShowResult = () => {

    const location = useLocation();


    const [cars, setCars] = useState([]);

    const [showCars, setShowCars] = useState([]);


    const fetchData = async () => {

        try {


            const querySnapshot = await getDocs(collection(db, 'car_list'));


            let fetchedData = [];
            querySnapshot.forEach((doc) => {
                // if (doc.data().isReady) {
                fetchedData.push({ ...doc.data(), id: doc.data().id });

                // }
            });

            setCars(fetchedData);

        } catch (error) {
            console.error('Error fetching data:', error);
        }






    };

    const Search = (searchObj) => {

        // let filtered = cars.filter((el) => el.location.toLowerCase().includes(searchObj.Carlocation.toLowerCase()) && el.price_per_hour <= searchObj.price_per_hour && !el.isReady && el.people_capacity >= searchObj.people_capacity && el.luggage_capacity >= searchObj.luggage_capacity && el.release_year >= searchObj.release_year
        let filtered = cars.filter((el) => {

            // console.log(searchObj.Carlocation.toLowerCase())
            return (el.location.toLowerCase().includes(searchObj.Carlocation.toLowerCase()) && el.price_per_hour <= searchObj.price && el.people_capacity >= searchObj.people_capacity && el.luggage_capacity >= searchObj.luggage_capacity && el.release_year >= searchObj.release_year)
        }

            //  {
            // console.log(searchObj.location.toLowerCase(), el.location.toLowerCase(), el.price_per_hour, searchObj.price_per_hour)

            // }
        )

        setShowCars(filtered);

    }
    // useEffect(() => {




    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const Carlocation = searchParams.get('location');
        const price = searchParams.get('price');
        const people_capacity = searchParams.get('people_capacity');
        const luggage_capacity = searchParams.get('luggage');
        const release_year = searchParams.get('release_year');


        const searchObj = {
            Carlocation,
            price,
            people_capacity,
            luggage_capacity,
            release_year
        };

        fetchData();
        Search(searchObj);

    }, [
        Search
    ]
    );


    // useEffect(() => {
    //     Search(searchObj);
    // }, [searchObj]);



    // }

    // );

    return (
        <section className="h-full w-full grid lg:grid-cols-2 grid-cols-1 xl:gap-14 gap-8 my-8 xl:p-0 px-4">
            {showCars?.map((car) => (

                <CarItem car={car} key={car.id} />
            ))}
        </section>
    )
}

export default ShowResult