import * as countUpModule from 'countup.js';
import { collection, doc, getCountFromServer, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { useEffect, useRef, useState } from 'react'
import { db } from '../../firebase';
import { MdDoneAll, MdOutlineClose } from "react-icons/md";
import { FaFileExport } from "react-icons/fa";

import IconButton from "../../components/shared/IconButton";
import { getCurrentMonth, getCurrentYear } from "../../helpers/datetime";
import { useQuery } from "react-query";
import moment from "moment/moment";
import { BsCheckLg } from "react-icons/bs";
import { toast } from "react-toastify";
import { Link, useNavigate } from 'react-router-dom';


export default function Dashboard() {
    const nav = useNavigate();

    const [recordCount, setRecordCount] = useState(0);
    const [carListCount, setCarListCont] = useState(0);
    const [UserListCount, setUserListCount] = useState(0);
    const [total, setTotal] = useState(0);//for in range 
    const [Alltotal, setAllTotal] = useState(0); //for total income 




    async function getLength(colName) {
        try {
            const mydb = collection(db, colName);
            const snapshot = await getCountFromServer(mydb);
            const result = snapshot.data().count;
            return result;
        } catch (error) {
            // Handle any errors that might occur during the asynchronous operations
            console.error("Error occurred:", error);
            throw error; // Optional: Rethrow the error to be caught at the higher level if necessary
        }
    }

    async function exampleUsage(colName, mod) {
        try {

            const length = await getLength(colName);
            console.log("Length:", length);
            switch (mod) {
                case 'carlist':
                    setCarListCont(length);
                    break;
                case 'userlist':
                    setUserListCount(length);

                    break;
                case 'recordlist':
                    setRecordCount(length);

                    break;

            }
        } catch (error) {
            // Handle any errors that might occur during the function call
            console.error("Error occurred during getLength:", error);
        }
    }











    useEffect(() => {
        // setRecordCount(exampleUsage('records'));


        setCarListCont(exampleUsage('car_list', 'carlist'));
        setCarListCont(exampleUsage('users', 'userlist'));
        setCarListCont(exampleUsage('records', 'recordlist'));



        // setUserListCount(exampleUsage('users'));

    }, [

    ]);

    const countupRefRecord = useRef(null);
    const countupRefCar = useRef(null);
    const countupRefUser = useRef(null);
    const countupRefTotalIncome = useRef(null);

    async function initCountUp() {

        let countUpAnimRecord = new countUpModule.CountUp(countupRefRecord.current, recordCount);
        let countUpAnimCar = new countUpModule.CountUp(countupRefCar.current, carListCount);
        let countUpAnimUser = new countUpModule.CountUp(countupRefUser.current, UserListCount);
        let countUpAnimTotalIncome = new countUpModule.CountUp(countupRefTotalIncome.current, Alltotal);
        await fetchDataTotal();

        if (!countUpAnimRecord.error) {
            countUpAnimRecord.start();
            countUpAnimCar.start();
            countUpAnimUser.start();
            countUpAnimTotalIncome.start();
        } else {
            // console.error(countUpAnim.error);
        }
    }
    console.log(carListCount);
    console.log(UserListCount);
    console.log(recordCount);

    initCountUp();

    // for record 

    const [selectedMonth, setSelectedMonth] = useState(
        `${getCurrentYear()}-${getCurrentMonth()}`
    );


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


    //get total income 

    async function fetchDataTotal() {
        let fetchedData = [];

        const querySnapshot = await getDocs(
            query(collection(db, "records"))
        );
        querySnapshot.forEach((doc) => {
            fetchedData.push({ ...doc.data(), id: doc.id });
        });
        console.log(fetchedData);
        let add = fetchedData?.reduce(function (acc, cur) {
            if (cur.status === "completed") {
                return acc + cur.total;
            }
            return acc;
        }, 0);
        setAllTotal(add);
        console.log(add);
        return fetchedData;
    }



    //get total income 



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
        <>




            <section>
                <div
                    className=' grid grid-flow-row grid-cols-2 ps-24 pt-7 gap-y-5 justify-end'
                >

                    <div
                    // className='flex justify-end items-center min-w-[30%]'
                    >

                        <div className="  max-w-sm p-6 border   h-64  rounded-lg shadow0 bg-accent border-gray-700 hover:bg-gray-700">
                            <Link to={'bookings'} >
                                <h1 className='mb-2 text-2xl font-bold tracking-tight  text-white '>
                                    Total Income
                                </h1>
                                <div className=' text-center  mt-10'>
                                    <h5
                                        ref={countupRefTotalIncome}
                                        className=" text-8xl font-bold tracking-tight  text-primary">
                                        0
                                    </h5>
                                </div>
                            </Link>
                            {/* {
typeof carListCount == 'number' ? (carListCount) : ("f")
} */}


                        </div>
                    </div>


                    <div
                    // className='flex justify-end items-center min-w-[30%]'
                    >

                        <Link to={'bookings'} className="block  max-w-sm p-6 border   h-64  rounded-lg shadow0 bg-accent border-gray-700 hover:bg-gray-700">
                            <h1 className='mb-2 text-2xl font-bold tracking-tight  text-white '>
                                Cars
                            </h1>
                            <div className=' text-center  mt-10'>
                                <h5
                                    ref={countupRefCar}
                                    className=" text-8xl font-bold tracking-tight  text-primary">
                                    0
                                </h5>
                            </div>
                            {/* {
    typeof carListCount == 'number' ? (carListCount) : ("f")
} */}


                        </Link>
                    </div>



                    <div
                    // className='flex justify-end items-center min-w-[30%]'
                    >

                        <div href="#" className="  max-w-sm p-6 border   h-64  rounded-lg shadow0 bg-accent border-gray-700 hover:bg-gray-700">
                            <Link
                                to={'service-requests'}
                            >
                                <h1 className='mb-2 text-2xl font-bold tracking-tight  text-white '>
                                    Complete Services
                                </h1>
                                <div className=' text-center  mt-10'>
                                    <h5
                                        ref={countupRefRecord}
                                        className=" text-8xl font-bold tracking-tight  text-primary">
                                        0
                                    </h5>
                                </div>
                            </Link>
                            {/* {
typeof carListCount == 'number' ? (carListCount) : ("f")
} */}


                        </div>
                    </div>

                    <div >
                        <div


                        // className='flex justify-end items-center min-w-[30%]'
                        >

                            <div href="#" className="  max-w-sm p-6 border   h-64  rounded-lg shadow0 bg-accent border-gray-700 hover:bg-gray-700">
                                <Link
                                    to={'user-list'}
                                >
                                    <h1 className='mb-2 text-2xl font-bold tracking-tight  text-white '>
                                        Users
                                    </h1>
                                    <div className=' text-center  mt-10'>
                                        <h5
                                            ref={countupRefUser}
                                            className=" text-8xl font-bold tracking-tight  text-primary">
                                            0
                                        </h5>
                                    </div>
                                </Link>
                                {/* {
    typeof carListCount == 'number' ? (carListCount) : ("f")
} */}


                            </div>
                        </div>
                    </div>



                </div>
                <div className=' mt-28'>
                    <div

                        className="mb-4 flex justify-between items-end">


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
                                                            className={`px-4 text-xs py-1 rounded-3xl w-max uppercase bg-opacity-20 ${el.status === "pending"
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
            </section>

        </>
    );
}