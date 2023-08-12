import { useState } from "react";
import { BsTrash3Fill } from "react-icons/bs";
import { AiOutlineEdit } from "react-icons/ai";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const fetchData = async () => {
    try {
      // Fetch the collection data from Firestore

      const querySnapshot = await getDocs(collection(db, "users"));
      let fetchedData = [];

      querySnapshot.forEach((doc) => {
        fetchedData.push({ ...doc.data(), id: doc.id });
      });
      setUsers(fetchedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  fetchData();

  return (
    <div className="relative overflow-x-auto shadow-md bg-darkGray">
      <table className="w-full text-sm text-left overflow-auto">
        <thead className="text-xs uppercase text-primary">
          <tr>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Gmail
            </th>
            <th scope="col" className="px-6 py-3">
              Phone
            </th>
            <th scope="col" className="px-6 py-3"></th>
          </tr>
        </thead>
        <tbody>
          {users?.map((el) => {
            return (
              <tr
                key={el?.id}
                className="border-b bg-accent border-gray-700 hover:bg-darkGray"
              >
                <td className="px-6 py-4">{el?.name}</td>
                <td className="px-6 py-4">{el?.email}</td>
                <td className="px-6 py-4">{el?.phone}</td>
                <td></td>
                {/* <td className=" flex  x-6 py-4 ">
                  <BsTrash3Fill className="hover:text-primary"></BsTrash3Fill>
                </td> */}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
