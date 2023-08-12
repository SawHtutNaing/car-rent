import axios from "axios";
import { toast } from "react-toastify";

const client = axios.create({
  baseURL: "https://dummyjson.com/products/1",
});

client.interceptors.request.use((config) => {
  const token = localStorage.getItem("acstkn");
  if (token) {
    config.headers.authorization = `Bearer ${token}`;
  }
  console.log('kkkkkkkkkkk')
  return config;
});


export default function useFetcher() {
  function catchError(error) {
    console.log("error >>> ", error);
    const message = error.message
      ? error.message
      : "Unexpected error occurred. Try again later.";
    toast.error(message);
    throw new Error(message);
  }

  async function get(endpoint) {
    try {
      const { data } = await client.get(endpoint);
      if (data.result) {
        return data.result;
      } else {
        throw new Error(data?.message);
      }
    } catch (err) {
      catchError(err);
    }
  }

  async function post(endpoint, body) {
    try {
      const { data } = await client.post(endpoint, body);
      if (data.result) {
        return data.result;
      } else {
        throw new Error(data?.message);
      }
    } catch (err) {
      catchError(err);
    }
  }
  return { get, post };
}
