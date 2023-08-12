import {
  collection,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

import { MdDelete, MdOutlineClose } from "react-icons/md";
import { useQuery } from "react-query";
import { db } from "../../firebase";
import IconButton from "../../components/shared/IconButton";
import { BsCheckLg } from "react-icons/bs";
import { toast } from "react-toastify";

export default function ServiceRequest() {
  async function getServiceRequest() {
    let requests = [];
    const docs = await getDocs(collection(db, "serviceRequests"));
    docs.forEach((doc) => requests.push({ ...doc.data(), id: doc.id }));
    return requests;
  }
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["service_requests"],
    queryFn: getServiceRequest,
  });
  async function updateRequest(id, status) {
    try {
      await updateDoc(doc(db, "serviceRequests", id), { status });
      toast.success("Service request " + status);
      refetch();
    } catch (error) {
      toast.error(error.message);
    }
  }
  async function deleteRequest(id) {
    try {
      await deleteDoc(doc(db, "serviceRequests", id));
      toast.success("Service request deleted");
      refetch();
    } catch (error) {
      toast.error(error.message);
    }
  }
  return (
    <div>
      <div className="relative overflow-x-auto shadow-md bg-darkGray">
        <table className="w-full text-sm text-left">
          <thead className="text-xs uppercase text-primary">
            <tr>
              <th scope="col" className="px-6 py-3">
                Service
              </th>
              <th scope="col" className="px-6 py-3">
                Booked Date
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Phone
              </th>
              <th scope="col" className="px-6 py-3">
                Address
              </th>
              <th scope="col" className="px-6 py-3">
                Status
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
                  {error}
                </th>
              </tr>
            ) : (
              <>
                {data?.map((request) => (
                  <tr
                    key={request.id}
                    className="border-b bg-accent border-gray-700 hover:bg-darkGray"
                  >
                    <td className="px-6 py-4">{request.service}</td>
                    <td className="px-6 py-4">{request.date}</td>
                    <td className="px-6 py-4">{request.name}</td>
                    <td className="px-6 py-4">{request.phone}</td>
                    <td className="px-6 py-4">{request.address}</td>
                    <td className="px-6 py-4">
                      <p
                        className={`px-4 text-xs py-1 rounded-3xl w-max uppercase bg-opacity-20 ${
                          request.status === "pending"
                            ? "bg-primary text-primary"
                            : request.status === "accepted"
                            ? "bg-green text-green"
                            : "bg-red text-red"
                        }`}
                      >
                        {request.status}
                      </p>
                    </td>
                    <td className="x-6 py-4">
                      {request?.status === "pending" ? (
                        <div className="flex items-center gap-2">
                          <IconButton
                            onClick={() =>
                              updateRequest(request.id, "cancelled")
                            }
                            className="hover:bg-red"
                          >
                            <MdOutlineClose className="text-red" />
                          </IconButton>
                          <IconButton
                            onClick={() =>
                              updateRequest(request.id, "accepted")
                            }
                            className="hover:bg-green"
                          >
                            <BsCheckLg className="text-green" />
                          </IconButton>
                        </div>
                      ) : (
                        <IconButton
                          onClick={() => deleteRequest(request.id)}
                          className="hover:bg-red"
                        >
                          <MdDelete className="text-red" />
                        </IconButton>
                      )}
                    </td>
                  </tr>
                ))}
              </>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
